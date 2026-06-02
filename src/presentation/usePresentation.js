// Singleton composable that drives the presentation overlay.
// State is shared via module-level refs (no Pinia involved).
import { ref, computed, nextTick } from 'vue'
import { slides } from './slides.js'
import { runScript } from './drive.js'
import { wizardScripts } from './wizard-scripts.js'

// Module-level singleton state shared across every usePresentation() call.
const active = ref(false)
const index = ref(0)
const autoplay = ref(false)

// Drive state for the on-screen "animation running" indicator and its controls.
const driving = ref(false) // a wizard flow is auto-running on the right
const drivePaused = ref(false) // the running flow is paused by the presenter

let _router = null
let _store = null
const _wizards = new Map()
let _autoTimer = null

// A control token shared with the active drive run. Bumping the id aborts the
// previous run (e.g. when the presenter moves to another slide mid-animation).
let _driveControl = { id: 0, aborted: false, isPaused: () => drivePaused.value }

const current = computed(() => slides[index.value])
const total = computed(() => slides.length)
// Intro slides render the deck full-width; once a demo is relevant the deck
// animates to the left rail and the app slides in on the right.
const isFull = computed(() => active.value && !!slides[index.value]?.full)

// Small promise-based delay helper. setTimeout is allowed; no clock/random API.
function delay(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

// Store router and store references. Idempotent: safe to call multiple times.
function init(router, store) {
  if (router) _router = router
  if (store) _store = store
}

// Build the query for slide i, preserving any existing query keys.
function presentQuery(i) {
  const currentQuery = _router ? _router.currentRoute.value.query : {}
  return { ...currentQuery, present: '1', slide: String(i + 1) }
}

// Apply a CSS pulse highlight to all elements matching the selector.
// The class is removed again after 1200ms. Failures are swallowed.
function applyHighlight(selector) {
  try {
    const nodes = document.querySelectorAll(selector)
    nodes.forEach((node) => node.classList.add('rp-present-pulse'))
    setTimeout(() => {
      try {
        nodes.forEach((node) => node.classList.remove('rp-present-pulse'))
      } catch (e) {
        // Ignore: nodes may have been removed from the DOM by now.
      }
    }, 1200)
  } catch (e) {
    // Ignore: invalid selector or no document.
  }
}

// Abort any drive currently running and reset the indicator.
function cancelDrive() {
  _driveControl.aborted = true
  driving.value = false
  drivePaused.value = false
}

// Wait for a registered wizard, then auto-run its scripted flow.
async function driveWizard(name) {
  // Start a fresh control token; the previous run (if any) sees aborted=true.
  _driveControl.aborted = true
  const control = { id: _driveControl.id + 1, aborted: false, isPaused: () => drivePaused.value }
  _driveControl = control
  drivePaused.value = false
  try {
    // Poll until the wizard registers itself (max ~40 attempts).
    let attempts = 0
    while (!_wizards.has(name) && attempts < 40 && !control.aborted) {
      attempts += 1
      await delay(50)
      await nextTick()
    }
    if (control.aborted || !_wizards.has(name)) return
    const script = wizardScripts[name]
    if (!script) return
    driving.value = true
    await runScript(_wizards.get(name), script, control)
  } catch (e) {
    // Ignore: a failed drive should never break the presentation.
  } finally {
    // Only clear the indicator if we are still the active run.
    if (_driveControl === control) {
      driving.value = false
      drivePaused.value = false
    }
  }
}

// Presenter controls for the running animation.
function pauseDrive() {
  if (driving.value) drivePaused.value = true
}
function resumeDrive() {
  drivePaused.value = false
}
function toggleDrive() {
  if (!driving.value) return
  drivePaused.value = !drivePaused.value
}
// Skip the rest of the running animation (abort it immediately).
function skipDrive() {
  cancelDrive()
}

// Run everything attached to slide i: navigate, emit, highlight and drive.
async function runSlide(i) {
  const s = slides[i]
  if (!s) return

  // Moving to a new slide aborts any animation still running on the old one.
  cancelDrive()

  // Full-width intro vs. left-rail demo mode. Toggling the class drives a CSS
  // width transition on the deck and the app's left padding.
  document.documentElement.classList.toggle('rp-presenting-full', !!s.full)

  // Navigate to the slide's demo route, or just update the query in place.
  // Await the navigation so the route component is resolved before we emit or
  // drive. Without awaiting, fast slide changes can leave a half-loaded view
  // (the lazy route chunk not yet mounted), which reads as an empty panel.
  try {
    if (s.route && _router.currentRoute.value.path !== s.route) {
      await _router.push({ path: s.route, query: presentQuery(i) })
    } else {
      await _router.replace({ query: presentQuery(i) })
    }
  } catch (e) {
    // Ignore redundant/aborted navigations (e.g. clicking through quickly).
  }

  await nextTick()

  // Reset the demo's scroll to the top so a shorter page after a longer one is
  // not left scrolled past its content (which looks like an empty panel).
  try {
    window.scrollTo({ top: 0, left: 0 })
  } catch (e) {
    // Ignore: no window (e.g. tests).
  }

  // Optionally emit a store event so the live app reacts.
  if (s.emit) {
    _store.emit(s.emit.type, { title: s.emit.title, severity: s.emit.severity })
  }

  // Optionally pulse-highlight a part of the app.
  if (s.highlight) {
    applyHighlight(s.highlight)
  }

  // Optionally auto-drive a wizard flow. Do not await: it runs in the background.
  if (s.drive) {
    driveWizard(s.drive.wizard)
  }
}

// Go to slide i, clamped to the valid range.
async function goto(i) {
  const clamped = Math.max(0, Math.min(slides.length - 1, i))
  index.value = clamped
  await runSlide(clamped)
}

// Advance to the next slide if there is one.
async function next() {
  if (index.value < total.value - 1) {
    await goto(index.value + 1)
  }
}

// Go back to the previous slide if there is one.
async function prev() {
  if (index.value > 0) {
    await goto(index.value - 1)
  }
}

// Enter presentation mode and show the first (or given) slide.
async function start(fromIndex = 0) {
  active.value = true
  document.documentElement.classList.add('rp-presenting')
  await goto(fromIndex)
}

// Leave presentation mode and strip the present/slide query keys.
function stop() {
  active.value = false
  autoplay.value = false
  cancelDrive()
  if (_autoTimer) {
    clearInterval(_autoTimer)
    _autoTimer = null
  }
  document.documentElement.classList.remove('rp-presenting')
  document.documentElement.classList.remove('rp-presenting-full')
  if (_router) {
    const query = { ...(_router.currentRoute.value.query || {}) }
    delete query.present
    delete query.slide
    _router.replace({ query })
  }
}

// Register a wizard's exposed API so slides can auto-drive it.
function registerWizard(name, exposed) {
  _wizards.set(name, exposed)
}

// Unregister a wizard when its component unmounts.
function unregisterWizard(name) {
  _wizards.delete(name)
}

// Toggle automatic slide advancement (every 6 seconds).
function toggleAutoplay() {
  autoplay.value = !autoplay.value
  if (autoplay.value) {
    _autoTimer = setInterval(() => {
      if (index.value < total.value - 1) {
        next()
      } else {
        clearInterval(_autoTimer)
        _autoTimer = null
        autoplay.value = false
      }
    }, 6000)
  } else if (_autoTimer) {
    clearInterval(_autoTimer)
    _autoTimer = null
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
    driving,
    drivePaused,
    init,
    start,
    stop,
    next,
    prev,
    goto,
    toggleAutoplay,
    pauseDrive,
    resumeDrive,
    toggleDrive,
    skipDrive,
    registerWizard,
    unregisterWizard,
  }
}
