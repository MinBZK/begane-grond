// Generic wizard-flow driver for presentation mode.
//
// A "drive script" auto-walks a wizard by mutating the form/refs that a
// wizard component exposes via defineExpose({ exposed: { ... } }). Each step
// is applied with a visible delay so the audience can follow the changes.
//
// Expected shape of `exposed`:
//   {
//     form,        // reactive form object backing the wizard inputs
//     wizardRef,   // the <Wizard> child: .next(), .goTo(i), .current, .isLast
//     finish,      // function that completes the wizard
//     ...helpers   // e.g. addInput, addOutput, pickTemplate, toggleInfra
//   }

// Pacing is deliberately calm so an audience can follow every change on stage.
const DEFAULT_STEP_DELAY_MS = 1100; // pause after a value is set / a field changes
const STEP_ADVANCE_DELAY_MS = 1500; // longer pause after moving to the next step
const TYPE_CHAR_DELAY_MS = 55; // per-character delay so text fields look typed
const TYPE_SETTLE_MS = 500; // brief pause once a field is fully typed

// Promise-based sleep. setTimeout is allowed; Date/now/random are not.
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// A no-op control used when a script is run without a presenter control token.
const NO_CONTROL = { aborted: false, isPaused: () => false };

// Sleep in small slices so we can react to abort/pause mid-delay. While paused,
// it holds (without counting down) until resumed or aborted. Returns false when
// the run was aborted, true otherwise. Exported so wizard helpers driven via
// { call } can share the same pause/abort-aware pacing.
export async function controlledDelay(ms, control) {
  const SLICE = 80;
  let remaining = ms;
  // First, drain any time while honoring pause/abort.
  while (remaining > 0) {
    if (control.aborted) return false;
    if (control.isPaused()) {
      await delay(SLICE);
      continue; // paused time does not count down
    }
    const slice = Math.min(SLICE, remaining);
    await delay(slice);
    remaining -= slice;
  }
  // If we became paused exactly at the boundary, hold here too.
  while (control.isPaused() && !control.aborted) {
    await delay(SLICE);
  }
  return !control.aborted;
}

// Read a nested value by dot/array path, returning undefined if missing.
function getPath(target, path) {
  if (!target || typeof path !== 'string') return undefined;
  return path.split('.').reduce((cursor, key) => (cursor == null ? cursor : cursor[key]), target);
}

// Type a string into a path character by character so it reads as live typing.
// Honors the control token so typing pauses/aborts with the presenter.
async function typeInto(target, path, value, control) {
  // Clear the field first, then grow it one character at a time.
  setPath(target, path, '');
  let current = '';
  for (const ch of String(value)) {
    if (control.aborted) return;
    current += ch;
    setPath(target, path, current);
    if (!(await controlledDelay(TYPE_CHAR_DELAY_MS, control))) return;
  }
  await controlledDelay(TYPE_SETTLE_MS, control);
}

// Set a value on a nested path inside `target`. Supports dot paths and numeric
// array indexes, e.g. 'inputs.0.register' or 'config.name'. Intermediate
// containers are created on demand (object or array, based on the next key).
function setPath(target, path, value) {
  if (!target || typeof path !== 'string') return;
  const keys = path.split('.');
  let cursor = target;
  for (let i = 0; i < keys.length - 1; i += 1) {
    const key = keys[i];
    const nextKey = keys[i + 1];
    if (cursor[key] === undefined || cursor[key] === null) {
      // Create an array when the next key looks like a numeric index.
      cursor[key] = /^\d+$/.test(nextKey) ? [] : {};
    }
    cursor = cursor[key];
  }
  cursor[keys[keys.length - 1]] = value;
}

// Run a drive script against an exposed wizard. Never throws: any failure is
// logged and swallowed so the presentation cannot crash. The optional control
// token lets the presenter pause, resume or abort the run mid-flight.
export async function runScript(exposed, script, control = NO_CONTROL) {
  // Silently bail if the wizard is not (yet) wired up.
  if (!exposed?.wizardRef || !exposed?.form) return;
  if (!Array.isArray(script)) return;

  // Some wizards keep their form in a ref; mutate the inner object in that case.
  const form = exposed.form && exposed.form.value !== undefined && typeof exposed.form.value === 'object'
    ? exposed.form.value
    : exposed.form;

  for (const step of script) {
    if (control.aborted) return;
    try {
      if (!step || typeof step !== 'object') continue;

      // Pure pause: no extra standard delay afterwards.
      if (typeof step.wait === 'number') {
        await controlledDelay(step.wait, control);
        continue;
      }

      let advancing = false;

      if (typeof step.set === 'string') {
        // Only free-text fields are typed character by character. Values bound
        // to a <select> or a choice grid are set instantly to avoid a flash of
        // an unmatched option; mark those with { type: false } (the default for
        // anything not opted in). Opt a text field in with { type: true }.
        const isString = typeof step.value === 'string';
        if (step.type === true && isString && step.value.length) {
          await typeInto(form, step.set, step.value, control);
        } else {
          setPath(form, step.set, step.value);
        }
      } else if (typeof step.toggle === 'string') {
        // Idempotent push into an array field.
        const field = form[step.toggle];
        if (Array.isArray(field) && !field.includes(step.value)) {
          field.push(step.value);
        }
      } else if (typeof step.call === 'string') {
        const helper = exposed[step.call];
        if (typeof helper === 'function') {
          const args = Array.isArray(step.args) ? step.args : [];
          // Pass the control token as the first argument so long-running async
          // helpers (e.g. a deploy pipeline) can honor pause/abort. Helpers that
          // do not need it simply ignore the extra leading argument.
          await helper(control, ...args);
        }
      } else if (step.next === true) {
        await exposed.wizardRef.next?.();
        advancing = true;
      } else if (typeof step.go === 'number') {
        await exposed.wizardRef.goTo?.(step.go);
        advancing = true;
      } else if (step.finish === true) {
        await exposed.finish?.();
        advancing = true;
      }

      if (control.aborted) return;

      // Pause between steps so mutations are visible; linger longer on a step
      // change so the audience can register the new screen before edits start.
      await controlledDelay(advancing ? STEP_ADVANCE_DELAY_MS : DEFAULT_STEP_DELAY_MS, control);
    } catch (error) {
      console.warn('[presentation/drive] step failed', step, error);
    }
  }
}
