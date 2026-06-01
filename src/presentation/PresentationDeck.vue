<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { usePresentation } from './usePresentation.js'

const p = usePresentation()

// Whether the viewport is large enough to run the deck.
const wideEnough = ref(true)

const current = computed(() => p.current.value)
const index = computed(() => p.index.value)
const total = computed(() => p.total.value)

// Format helpers for the footer counter.
const counter = computed(
  () =>
    `${String(index.value + 1).padStart(2, '0')} / ${String(total.value).padStart(2, '0')}`,
)
const progressWidth = computed(() =>
  total.value > 0 ? `${((index.value + 1) / total.value) * 100}%` : '0%',
)

function isEditableTarget(target) {
  if (!target) return false
  const tag = target.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
  if (target.isContentEditable) return true
  return false
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen?.()
  } else {
    document.documentElement.requestFullscreen?.()
  }
}

function onKey(e) {
  // Only react while the presentation is active.
  if (!p.active.value) return
  // Do not hijack typing inside form fields or editable regions.
  if (isEditableTarget(e.target)) return

  switch (e.key) {
    case ' ':
      // Spacebar pauses/resumes a running animation; otherwise advances.
      if (p.driving.value) p.toggleDrive()
      else p.next()
      e.preventDefault()
      break
    case 'ArrowRight':
    case 'PageDown':
      p.next()
      e.preventDefault()
      break
    case 'ArrowLeft':
    case 'PageUp':
      p.prev()
      e.preventDefault()
      break
    case 'Escape':
      p.stop()
      break
    case 'a':
    case 'A':
      // Autoplay toggle. Not 'p', so the Shift+P start chord cannot trigger it.
      p.toggleAutoplay()
      break
    case 'f':
      toggleFullscreen()
      break
    default:
      break
  }
}

function onResize() {
  wideEnough.value = window.innerWidth >= 1024
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
  window.addEventListener('resize', onResize)
  // Initialize on mount.
  onResize()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <div class="deck" role="region" aria-label="Presentatie">
    <!-- Too narrow: cannot run the deck here. -->
    <div v-if="!wideEnough" class="too-small">
      <div class="too-small-card">
        <p class="too-small-text">
          Presentatiemodus werkt op een groot scherm of projector
        </p>
        <button type="button" class="close-btn" @click="p.stop()">Sluiten</button>
      </div>
    </div>

    <!-- The actual slide panel. -->
    <template v-else>
      <div class="content">
        <span v-if="current && current.gov" class="gov-pill">
          Specifiek voor de overheid
        </span>

        <h1 v-if="current" class="title">{{ current.title }}</h1>

        <p v-if="current && current.lead" class="lead">{{ current.lead }}</p>

        <ul
          v-if="current && current.bullets && current.bullets.length"
          class="bullets"
        >
          <li v-for="(b, i) in current.bullets" :key="i">{{ b }}</li>
        </ul>

        <p
          v-if="current && current.gov && typeof current.gov === 'string'"
          class="gov-explain"
        >
          {{ current.gov }}
        </p>

        <p v-if="current && current.note" class="note">{{ current.note }}</p>
      </div>

      <!-- Live animation indicator + controls, shown while a wizard auto-runs. -->
      <div v-if="p.driving.value" class="drive" :class="{ 'drive-paused': p.drivePaused.value }">
        <span class="drive-dot" aria-hidden="true"></span>
        <span class="drive-label">{{ p.drivePaused.value ? 'Animatie gepauzeerd' : 'Animatie loopt' }}</span>
        <div class="drive-controls">
          <button
            type="button"
            class="drive-btn"
            :aria-label="p.drivePaused.value ? 'Hervat animatie' : 'Pauzeer animatie'"
            @click="p.toggleDrive()"
          >
            <svg v-if="p.drivePaused.value" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
            <svg v-else viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor" />
            </svg>
          </button>
          <button type="button" class="drive-btn" aria-label="Sla animatie over" @click="p.skipDrive()">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M5 5l9 7-9 7zM16 5h3v14h-3z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      <div class="footer">
        <div class="footer-row">
          <span class="counter">{{ counter }}</span>
          <div class="nav-buttons">
            <button
              type="button"
              class="round-btn"
              aria-label="Vorige slide"
              @click="p.prev()"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  d="M15 5l-7 7 7 7"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              class="round-btn"
              aria-label="Volgende slide"
              @click="p.next()"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  d="M9 5l7 7-7 7"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="hints">
          <span class="hint">Esc om te sluiten</span>
          <span v-if="p.driving.value" class="hint hint-autoplay">spatie = pauze</span>
          <span v-if="p.autoplay.value" class="hint hint-autoplay">autoplay aan</span>
        </div>
      </div>

      <!-- Thin progress bar pinned to the bottom edge. -->
      <div class="progress" aria-hidden="true">
        <div class="progress-fill" :style="{ width: progressWidth }"></div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.deck {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 40vw;
  height: 100vh;
  z-index: 80;
  background: #154273;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 3rem 2.75rem 1.5rem;
  overflow: auto;
  box-sizing: border-box;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.25);
}

.content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-height: 0;
}

.gov-pill {
  align-self: flex-start;
  font-family: 'RijksSans', system-ui, sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
}

.title {
  font-family: 'RijksoverheidSerif', Georgia, serif;
  font-weight: 700;
  font-size: clamp(2rem, 3.2vw, 3.2rem);
  line-height: 1.1;
  margin: 0;
  color: #fff;
}

.lead {
  font-family: 'RijksSans', system-ui, sans-serif;
  font-size: clamp(1.05rem, 1.4vw, 1.35rem);
  line-height: 1.45;
  margin: 0;
  color: rgba(255, 255, 255, 0.92);
}

.bullets {
  font-family: 'RijksSans', system-ui, sans-serif;
  font-size: clamp(1rem, 1.25vw, 1.2rem);
  line-height: 1.5;
  margin: 0;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  color: rgba(255, 255, 255, 0.95);
}

.bullets li::marker {
  color: rgba(255, 255, 255, 0.6);
}

.gov-explain {
  font-family: 'RijksSans', system-ui, sans-serif;
  font-size: 0.95rem;
  line-height: 1.45;
  margin: 0;
  color: rgba(255, 255, 255, 0.66);
}

.note {
  font-family: 'RijksSans', system-ui, sans-serif;
  font-size: 0.85rem;
  line-height: 1.4;
  margin: 0;
  color: rgba(255, 255, 255, 0.55);
}

.footer {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding-top: 1.25rem;
}

.footer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.counter {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.85);
}

.nav-buttons {
  display: flex;
  gap: 0.6rem;
}

.round-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  border: 1.5px solid rgba(255, 255, 255, 0.7);
  background: transparent;
  color: #fff;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.round-btn:hover {
  background: rgba(255, 255, 255, 0.18);
  border-color: #fff;
}

.round-btn:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}

.hints {
  display: flex;
  gap: 1rem;
  font-family: 'RijksSans', system-ui, sans-serif;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.55);
}

.hint-autoplay {
  color: rgba(255, 255, 255, 0.8);
}

/* Live animation indicator + its pause/skip controls. */
.drive {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0 0 0.9rem;
  padding: 0.55rem 0.8rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.22);
  font-family: 'RijksSans', system-ui, sans-serif;
}

.drive-dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: #8fd19e;
  flex: 0 0 auto;
  animation: drive-blink 1s ease-in-out infinite;
}

.drive-paused .drive-dot {
  background: #f0c419;
  animation: none;
}

@keyframes drive-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.25; }
}

.drive-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  flex: 1 1 auto;
}

.drive-controls {
  display: flex;
  gap: 0.35rem;
}

.drive-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.9rem;
  height: 1.9rem;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: transparent;
  color: #fff;
  cursor: pointer;
  transition: background 0.15s ease;
}

.drive-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.drive-btn:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}

.progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.14);
}

.progress-fill {
  height: 100%;
  background: rgba(255, 255, 255, 0.85);
  transition: width 0.3s ease;
}

.too-small {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.too-small-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  text-align: center;
  max-width: 24rem;
}

.too-small-text {
  font-family: 'RijksSans', system-ui, sans-serif;
  font-size: 1.1rem;
  line-height: 1.45;
  margin: 0;
  color: #fff;
}

.close-btn {
  font-family: 'RijksSans', system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.6rem 1.5rem;
  border-radius: 6px;
  border: 1.5px solid rgba(255, 255, 255, 0.7);
  background: transparent;
  color: #fff;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.18);
  border-color: #fff;
}

.close-btn:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}
</style>
