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

// Read a nested value by dot/array path, returning undefined if missing.
function getPath(target, path) {
  if (!target || typeof path !== 'string') return undefined;
  return path.split('.').reduce((cursor, key) => (cursor == null ? cursor : cursor[key]), target);
}

// Type a string into a path character by character so it reads as live typing.
async function typeInto(target, path, value) {
  // Clear the field first, then grow it one character at a time.
  setPath(target, path, '');
  let current = '';
  for (const ch of String(value)) {
    current += ch;
    setPath(target, path, current);
    await delay(TYPE_CHAR_DELAY_MS);
  }
  await delay(TYPE_SETTLE_MS);
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
// logged and swallowed so the presentation cannot crash.
export async function runScript(exposed, script) {
  // Silently bail if the wizard is not (yet) wired up.
  if (!exposed?.wizardRef || !exposed?.form) return;
  if (!Array.isArray(script)) return;

  for (const step of script) {
    try {
      if (!step || typeof step !== 'object') continue;

      // Pure pause: no extra standard delay afterwards.
      if (typeof step.wait === 'number') {
        await delay(step.wait);
        continue;
      }

      let advancing = false;

      if (typeof step.set === 'string') {
        // A string going into a string field is typed out so it looks live.
        const existing = getPath(exposed.form, step.set);
        const typeable =
          typeof step.value === 'string' && (typeof existing === 'string' || existing === undefined);
        if (typeable && step.value.length) {
          await typeInto(exposed.form, step.set, step.value);
        } else {
          setPath(exposed.form, step.set, step.value);
        }
      } else if (typeof step.toggle === 'string') {
        // Idempotent push into an array field.
        const field = exposed.form[step.toggle];
        if (Array.isArray(field) && !field.includes(step.value)) {
          field.push(step.value);
        }
      } else if (typeof step.call === 'string') {
        const helper = exposed[step.call];
        if (typeof helper === 'function') {
          const args = Array.isArray(step.args) ? step.args : [];
          await helper(...args);
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

      // Pause between steps so mutations are visible; linger longer on a step
      // change so the audience can register the new screen before edits start.
      await delay(advancing ? STEP_ADVANCE_DELAY_MS : DEFAULT_STEP_DELAY_MS);
    } catch (error) {
      console.warn('[presentation/drive] step failed', step, error);
    }
  }
}
