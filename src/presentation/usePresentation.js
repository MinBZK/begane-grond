// Singleton composable that drives the presentation overlay.
// State is shared via module-level refs (no Pinia involved).
import { ref, computed, nextTick } from 'vue';
import { tours, tourById } from './tours.js';
import { routes, routeById } from './routes.js';
import { runScript } from './drive.js';
import { wizardScripts } from './wizard-scripts.js';

// The chooser deck: a single full-screen "wie ben je vandaag?" slide that opens
// when the presentation starts (Shift+P). Its `kind: 'choice'` tells the deck to
// render the role cards instead of the usual title/lead/bullets. Picking a card
// calls chooseRoute(), which becomes that persona and swaps to the route's deck.
const CHOOSER_TOUR = {
  id: 'chooser',
  slides: [{ id: 'chooser', kind: 'choice', full: true }],
};

// Module-level singleton state shared across every usePresentation() call.
const active = ref(false);
const index = ref(0);
const autoplay = ref(false);
// The tour currently playing. Defaults to the pitch deck so existing entry
// points (Shift+P, ?present=1) behave exactly as before. `slides` below always
// reads from this tour, so the whole engine is tour-agnostic.
const activeTour = ref(tourById('pitch'));
const slides = computed(() => activeTour.value.slides);
// When a route (role) is playing instead of a tour, its id is held here so the
// deeplink encodes ?route= and a reload can restore both the deck and persona.
const activeRouteId = ref(null);
// When on, next()/prev() jump over slides marked `skippable`, so a tight time
// slot can run the core spine without manually clicking through the optional
// slides. The presenter toggles this with the 'o' key.
const skipOptional = ref(false);

// Drive state for the on-screen "animation running" indicator and its controls.
const driving = ref(false); // a wizard flow is auto-running on the right
const drivePaused = ref(false); // the running flow is paused by the presenter

let _router = null;
let _store = null;
const _wizards = new Map();
let _autoTimer = null;

// A control token shared with the active drive run. Bumping the id aborts the
// previous run (e.g. when the presenter moves to another slide mid-animation).
let _driveControl = { id: 0, aborted: false, isPaused: () => drivePaused.value };

const current = computed(() => slides.value[index.value]);
const total = computed(() => slides.value.length);
// Intro slides render the deck full-width; once a demo is relevant the deck
// animates to the left rail and the app slides in on the right.
const isFull = computed(() => active.value && !!slides.value[index.value]?.full);

// Small promise-based delay helper. setTimeout is allowed; no clock/random API.
function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Store router and store references. Idempotent: safe to call multiple times.
function init(router, store) {
  if (router) _router = router;
  if (store) _store = store;
}

// Build the query for slide i, preserving any existing query keys. The active
// tour is encoded too (except for the default pitch deck, to keep its URLs
// unchanged) so a tour is shareable and deep-linkable.
function presentQuery(i) {
  const currentQuery = _router ? _router.currentRoute.value.query : {};
  const q = { ...currentQuery, present: '1', slide: String(i + 1) };
  // A role-route encodes ?route=; a tour encodes ?tour= (except the default
  // pitch deck, whose URLs stay clean). They are mutually exclusive.
  if (activeRouteId.value) {
    q.route = activeRouteId.value;
    delete q.tour;
  } else if (activeTour.value.id !== 'pitch') {
    q.tour = activeTour.value.id;
    delete q.route;
  } else {
    delete q.tour;
    delete q.route;
  }
  return q;
}

// Apply a CSS pulse highlight to all elements matching the selector.
// The class is removed again after 1200ms. Failures are swallowed.
function applyHighlight(selector) {
  try {
    const nodes = document.querySelectorAll(selector);
    nodes.forEach((node) => node.classList.add('rp-present-pulse'));
    setTimeout(() => {
      try {
        nodes.forEach((node) => node.classList.remove('rp-present-pulse'));
      } catch {
        // Ignore: nodes may have been removed from the DOM by now.
      }
    }, 1200);
  } catch {
    // Ignore: invalid selector or no document.
  }
}

// Abort any drive currently running and reset the indicator.
function cancelDrive() {
  _driveControl.aborted = true;
  driving.value = false;
  drivePaused.value = false;
}

// Wait for a registered wizard, then auto-run its scripted flow.
async function driveWizard(name) {
  // Start a fresh control token; the previous run (if any) sees aborted=true.
  _driveControl.aborted = true;
  const control = { id: _driveControl.id + 1, aborted: false, isPaused: () => drivePaused.value };
  _driveControl = control;
  drivePaused.value = false;
  try {
    // Poll until the wizard registers itself (max ~40 attempts).
    let attempts = 0;
    while (!_wizards.has(name) && attempts < 40 && !control.aborted) {
      attempts += 1;
      await delay(50);
      await nextTick();
    }
    if (control.aborted || !_wizards.has(name)) return;
    const script = wizardScripts[name];
    if (!script) return;
    driving.value = true;
    await runScript(_wizards.get(name), script, control);
  } catch {
    // Ignore: a failed drive should never break the presentation.
  } finally {
    // Only clear the indicator if we are still the active run.
    if (_driveControl === control) {
      driving.value = false;
      drivePaused.value = false;
    }
  }
}

// Presenter controls for the running animation.
function pauseDrive() {
  if (driving.value) drivePaused.value = true;
}
function resumeDrive() {
  drivePaused.value = false;
}
function toggleDrive() {
  if (!driving.value) return;
  drivePaused.value = !drivePaused.value;
}
// Skip the rest of the running animation (abort it immediately).
function skipDrive() {
  cancelDrive();
}

// Run everything attached to slide i: navigate, emit, highlight and drive.
async function runSlide(i) {
  const s = slides.value[i];
  if (!s) return;

  // Moving to a new slide aborts any animation still running on the old one.
  cancelDrive();

  // Full-width intro vs. left-rail demo mode. Toggling the class drives a CSS
  // width transition on the deck and the app's left padding.
  document.documentElement.classList.toggle('rp-presenting-full', !!s.full);

  // Navigate to the slide's demo route, or just update the query in place.
  // Await the navigation so the route component is resolved before we emit or
  // drive. Without awaiting, fast slide changes can leave a half-loaded view
  // (the lazy route chunk not yet mounted), which reads as an empty panel.
  try {
    if (s.route && _router.currentRoute.value.path !== s.route) {
      await _router.push({ path: s.route, query: presentQuery(i) });
    } else {
      await _router.replace({ query: presentQuery(i) });
    }
  } catch {
    // Ignore redundant/aborted navigations (e.g. clicking through quickly).
  }

  await nextTick();

  // Reset the demo's scroll to the top so a shorter page after a longer one is
  // not left scrolled past its content (which looks like an empty panel).
  try {
    window.scrollTo({ top: 0, left: 0 });
  } catch {
    // Ignore: no window (e.g. tests).
  }

  // Optionally emit a store event so the live app reacts.
  if (s.emit) {
    _store.emit(s.emit.type, { title: s.emit.title, severity: s.emit.severity });
  }

  // Optionally pulse-highlight a part of the app.
  if (s.highlight) {
    applyHighlight(s.highlight);
  }

  // Optionally auto-drive a wizard flow. Do not await: it runs in the background.
  if (s.drive) {
    driveWizard(s.drive.wizard);
  }
}

// Go to slide i, clamped to the valid range.
async function goto(i) {
  const clamped = Math.max(0, Math.min(slides.value.length - 1, i));
  index.value = clamped;
  await runSlide(clamped);
}

// Find the next/previous slide index, skipping `skippable` slides when the
// skip-optional mode is on. Returns the same index if there is no further slide
// in that direction (so we never wrap or land out of range).
function nextIndex(from, step) {
  let i = from + step;
  while (i >= 0 && i < total.value) {
    if (!skipOptional.value || !slides.value[i]?.skippable) return i;
    i += step;
  }
  // Everything ahead is optional: fall back to the last/first non-optional we
  // can reach, otherwise stay put. For "next" that means the final slide; for
  // "prev" the first. The wrap-up and title are never skippable, so this is safe.
  return from;
}

// Advance to the next slide. On the last slide of a route or the pitch, loop
// back to the chooser ("terug naar het begin"), so a deck never dead-ends and
// you can hand the next person a fresh choice.
async function next() {
  const target = nextIndex(index.value, 1);
  if (target !== index.value) {
    await goto(target);
  } else if (activeTour.value.id !== 'chooser') {
    await start();
  }
}

// Go back to the previous slide if there is one.
async function prev() {
  const target = nextIndex(index.value, -1);
  if (target !== index.value) await goto(target);
}

// Toggle skipping of optional slides during navigation.
function toggleSkipOptional() {
  skipOptional.value = !skipOptional.value;
}

// Enter presentation mode. Shift+P opens the chooser slide ("wie ben je
// vandaag?"); picking a role there starts that route's deck. The chooser IS the
// first slide — the choice lives in the presentation, not the app UI.
async function start() {
  activeTour.value = CHOOSER_TOUR;
  activeRouteId.value = null;
  active.value = true;
  document.documentElement.classList.add('rp-presenting');
  await goto(0);
}

// Start the pitch deck directly (the 56-slide stage talk), bypassing the chooser.
async function startPitch(fromIndex = 0) {
  activeTour.value = tourById('pitch');
  activeRouteId.value = null;
  active.value = true;
  document.documentElement.classList.add('rp-presenting');
  await goto(fromIndex);
}

// Whether the chooser slide is currently showing (so the deck can hide the
// "naar de keuze" button on the chooser itself).
const onChooser = computed(() => activeTour.value.id === 'chooser');

// Go back to the chooser slide from within a route/the pitch.
async function backToChooser() {
  await start();
}

// Pick a role from the chooser slide: become that persona (via the injected
// store, so the store stays the single owner of identity) and play its route
// from slide 0. The 'pitch' id is a special choice → the stage talk.
async function chooseRoute(id) {
  if (id === 'pitch') {
    await startPitch(0);
    return;
  }
  const route = routeById(id);
  if (_store) _store.setPersona(route.persona);
  await startRoute(route.id, 0);
}

// Start a specific tour by id. The tour launcher and ?tour= deep links use this.
async function startTour(tourId, fromIndex = 0) {
  activeTour.value = tourById(tourId);
  activeRouteId.value = null;
  index.value = 0;
  active.value = true;
  document.documentElement.classList.add('rp-presenting');
  await goto(fromIndex);
}

// Start a role-route by id. The route launcher and ?route= deep links use this.
// A route object is a drop-in for activeTour (the engine only reads `.slides`);
// the persona switch is the caller's job, so the store stays the owner of
// identity. activeRouteId drives the ?route= deeplink.
async function startRoute(routeId, fromIndex = 0) {
  const route = routeById(routeId);
  activeTour.value = route;
  activeRouteId.value = route.id;
  index.value = 0;
  active.value = true;
  document.documentElement.classList.add('rp-presenting');
  await goto(fromIndex);
}

// Leave presentation mode and strip the present/slide query keys.
function stop() {
  active.value = false;
  autoplay.value = false;
  cancelDrive();
  if (_autoTimer) {
    clearInterval(_autoTimer);
    _autoTimer = null;
  }
  document.documentElement.classList.remove('rp-presenting');
  document.documentElement.classList.remove('rp-presenting-full');
  activeRouteId.value = null;
  if (_router) {
    const query = { ...(_router.currentRoute.value.query || {}) };
    delete query.present;
    delete query.slide;
    delete query.tour;
    delete query.route;
    _router.replace({ query });
  }
}

// Register a wizard's exposed API so slides can auto-drive it.
function registerWizard(name, exposed) {
  _wizards.set(name, exposed);
}

// Unregister a wizard when its component unmounts.
function unregisterWizard(name) {
  _wizards.delete(name);
}

// Toggle automatic slide advancement (every 6 seconds).
function toggleAutoplay() {
  autoplay.value = !autoplay.value;
  if (autoplay.value) {
    _autoTimer = setInterval(() => {
      if (index.value < total.value - 1) {
        next();
      } else {
        clearInterval(_autoTimer);
        _autoTimer = null;
        autoplay.value = false;
      }
    }, 6000);
  } else if (_autoTimer) {
    clearInterval(_autoTimer);
    _autoTimer = null;
  }
}

export function usePresentation() {
  return {
    active,
    index,
    current,
    total,
    isFull,
    autoplay,
    skipOptional,
    driving,
    drivePaused,
    activeTour,
    tours,
    routes,
    onChooser,
    init,
    start,
    startPitch,
    startTour,
    startRoute,
    chooseRoute,
    backToChooser,
    stop,
    next,
    prev,
    goto,
    toggleAutoplay,
    toggleSkipOptional,
    pauseDrive,
    resumeDrive,
    toggleDrive,
    skipDrive,
    registerWizard,
    unregisterWizard,
  };
}
