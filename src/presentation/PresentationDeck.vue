<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { usePresentation } from './usePresentation.js'
import { usePlatformStore } from '../stores/index.js'

const p = usePresentation()
const store = usePlatformStore()

// The cards on the chooser slide: the 7 roles, the estafette, and the pitch.
// Each role card resolves the person's name so it reads "Sanne Visser ·
// Backend developer". A chain-route (the estafette) gets its own accented card.
const chooserCards = computed(() => {
  const roleCards = p.routes
    .filter((r) => !r.chain)
    .map((r) => ({
      id: r.id,
      name: store.personById(r.persona)?.name || r.role,
      role: r.role,
      icon: r.icon,
      lead: r.lead,
    }))
  const chainCards = p.routes
    .filter((r) => r.chain)
    .map((r) => ({ id: r.id, name: r.role, role: 'Eén wet, vijf brillen', icon: r.icon, lead: r.lead, chain: true }))
  return [
    ...roleCards,
    ...chainCards,
    { id: 'pitch', name: 'Het podiumverhaal', role: 'De pitch', icon: 'presentation', lead: 'Waarom de overheid het grootste softwarebedrijf van Nederland is.' },
  ]
})

// On a hand-over slide ("kind: handover"), resolve the two people so the deck
// can show "van <naam> · <rol>  →  naar <naam> · <rol>".
const handover = computed(() => {
  const s = current.value
  if (!s || s.kind !== 'handover' || !s.handover) return null
  const from = store.personById(s.handover.from)
  const to = store.personById(s.handover.to)
  return {
    from: { name: from?.name || s.handover.from, role: from?.role || '' },
    to: { name: to?.name || s.handover.to, role: to?.role || '' },
  }
})

// Whether the viewport is large enough to run the deck.
const wideEnough = ref(true)

const current = computed(() => p.current.value)
const index = computed(() => p.index.value)
const total = computed(() => p.total.value)

// Today's date, formatted in Dutch, for the title slide. Read once when the deck
// mounts so the date is correct wherever and whenever the talk is given.
const todayLabel = ref('')
onMounted(() => {
  try {
    todayLabel.value = new Intl.DateTimeFormat('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date())
  } catch {
    todayLabel.value = ''
  }
})

// On the last slide of a route/pitch, "next" loops back to the chooser. Show a
// labelled button there instead of a bare arrow ("terug naar het begin").
const isLastSlide = computed(() => index.value === total.value - 1)
const loopsToStart = computed(() => isLastSlide.value && !p.onChooser.value)

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
    case 'o':
    case 'O':
      // Skip optional slides during navigation (for a tighter time slot).
      p.toggleSkipOptional()
      e.preventDefault()
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
  <div class="deck" :class="{ full: p.isFull.value }" role="region" aria-label="Presentatie">
    <!-- Too narrow: cannot run the deck here. -->
    <div v-if="!wideEnough" class="too-small">
      <div class="too-small-card">
        <p class="too-small-text">
          Presentatiemodus werkt op een groot scherm of projector
        </p>
        <button type="button" class="close-btn" @click="p.stop()">Sluiten</button>
      </div>
    </div>

    <!-- Chooser slide: "wie ben je vandaag?" — its own layout, the first time a
         slide is interactive. Picking a card becomes that persona + plays the route. -->
    <template v-else-if="current && current.kind === 'choice'">
      <div class="chooser">
        <div class="chooser-head">
          <h1 class="chooser-title">Kies een rol</h1>
          <p class="chooser-sub">Je wordt die persoon, en het platform kleurt mee.</p>
        </div>
        <div class="chooser-grid">
          <button
            v-for="c in chooserCards"
            :key="c.id"
            type="button"
            class="chooser-card"
            :class="{ 'chooser-card-pitch': c.id === 'pitch', 'chooser-card-chain': c.chain }"
            @click="p.chooseRoute(c.id)"
          >
            <nldd-icon :name="c.icon" aria-hidden="true"></nldd-icon>
            <span class="chooser-card-name">{{ c.name }}</span>
            <span class="chooser-card-role">{{ c.role }}</span>
            <span class="chooser-card-lead">{{ c.lead }}</span>
          </button>
        </div>
        <button type="button" class="chooser-close" @click="p.stop()">Sluiten · Esc</button>
      </div>
    </template>

    <!-- Hand-over slide: the estafette passes the subject to the next role. -->
    <template v-else-if="current && current.kind === 'handover'">
      <div class="handover">
        <h1 class="handover-title">{{ current.title }}</h1>
        <p v-if="current.lead" class="handover-lead">{{ current.lead }}</p>
        <div v-if="handover" class="handover-people">
          <span class="handover-person">
            <span class="handover-person-name">{{ handover.from.name }}</span>
            <span class="handover-person-role">{{ handover.from.role }}</span>
          </span>
          <svg class="handover-arrow" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
            <path
              d="M5 12h14m-6-6 6 6-6 6"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="handover-person handover-person-next">
            <span class="handover-person-name">{{ handover.to.name }}</span>
            <span class="handover-person-role">{{ handover.to.role }}</span>
          </span>
        </div>
        <button v-if="handover" type="button" class="handover-btn" @click="p.next()">
          Verder als {{ handover.to.name }} →
        </button>
      </div>
    </template>

    <!-- The actual slide panel. -->
    <template v-else>
      <div class="content">
        <!-- Main story block, vertically centered in the available space. -->
        <div class="content-main">
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

          <!-- Title-slide meta: speaker, affiliation, today's date. -->
          <div
            v-if="current && (current.speaker || current.affiliation || current.showDate)"
            class="title-meta"
          >
            <span v-if="current.speaker" class="title-speaker">{{ current.speaker }}</span>
            <span v-if="current.affiliation" class="title-affiliation">{{ current.affiliation }}</span>
            <span v-if="current.showDate && todayLabel" class="title-date">{{ todayLabel }}</span>
          </div>

          <!-- Closing link, e.g. on the wrap-up slide. -->
          <a
            v-if="current && current.link"
            class="slide-link"
            :href="current.link.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ current.link.label }}
          </a>
        </div>

        <!-- Government callout, and/or a footnote aside, sit at the foot. -->
        <div
          v-if="current && ((current.gov && typeof current.gov === 'string') || current.aside)"
          class="content-foot"
        >
          <p v-if="current.gov && typeof current.gov === 'string'" class="gov-explain">
            {{ current.gov }}
          </p>
          <p v-if="current.aside" class="aside-note"><span class="aside-mark">*</span> {{ current.aside }}</p>
        </div>
      </div>

      <div class="footer">
        <div class="footer-row">
          <span class="counter-wrap">
            <span class="counter" :aria-label="`Slide ${index + 1} van ${total}`">{{ counter }}</span>
            <button
              v-if="!p.onChooser.value"
              type="button"
              class="chooser-back"
              @click="p.backToChooser()"
            >← Naar de keuze</button>
            <span
              v-if="current && current.skippable"
              class="optional-chip"
              :class="{ 'optional-chip-active': p.skipOptional.value }"
            >{{ p.skipOptional.value ? 'wordt overgeslagen' : 'optioneel' }}</span>
          </span>
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
              v-if="loopsToStart"
              type="button"
              class="restart-btn"
              @click="p.next()"
            >Terug naar het begin</button>
            <button
              v-else
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
          <span class="hint">Esc sluit</span>
          <span class="hint">f volledig scherm</span>
          <span class="hint">a autoplay</span>
          <span class="hint">o sla optionele over</span>
          <!-- Compact animation controls, inline in the hint row while a wizard auto-runs. -->
          <span v-if="p.driving.value" class="drive-inline" :class="{ 'drive-inline-paused': p.drivePaused.value }">
            <span class="drive-dot" aria-hidden="true"></span>
            <button
              type="button"
              class="drive-mini"
              :aria-label="p.drivePaused.value ? 'Hervat animatie' : 'Pauzeer animatie'"
              @click="p.toggleDrive()"
            >
              <svg v-if="p.drivePaused.value" viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
              <svg v-else viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
                <path d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor" />
              </svg>
            </button>
            <button type="button" class="drive-mini" aria-label="Sla animatie over" @click="p.skipDrive()">
              <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
                <path d="M5 5l9 7-9 7zM16 5h3v14h-3z" fill="currentColor" />
              </svg>
            </button>
          </span>
          <span v-if="p.autoplay.value" class="hint hint-autoplay">autoplay aan</span>
          <span v-if="p.skipOptional.value" class="hint hint-autoplay">optionele overgeslagen</span>
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
/* Chooser slide ("wie ben je vandaag?") — full-screen, its own look. */
.chooser {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 4vh 5vw;
  color: #fff;
  overflow-y: auto;
}
.chooser-head { text-align: center; max-width: 46rem; }
.chooser-title {
  font-family: 'RijksoverheidSerif', Georgia, serif;
  font-size: clamp(2rem, 4vw, 3.4rem);
  margin: 0 0 0.6rem;
  font-weight: 700;
}
.chooser-sub { font-size: clamp(0.95rem, 1.4vw, 1.2rem); opacity: 0.8; margin: 0; line-height: 1.5; }
.chooser-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 64rem;
}
.chooser-card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  text-align: left;
  padding: 1.25rem;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  cursor: pointer;
  font: inherit;
  transition: border-color 0.15s, background 0.15s, transform 0.1s;
}
.chooser-card:hover {
  border-color: #fff;
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
}
.chooser-card nldd-icon { width: 1.6rem; height: 1.6rem; opacity: 0.9; margin-bottom: 0.2rem; }
.chooser-card-name { font-weight: 700; font-size: 1.05rem; }
.chooser-card-role { font-size: 0.85rem; font-weight: 600; color: #8fb8e8; }
.chooser-card-lead { font-size: 0.85rem; opacity: 0.75; line-height: 1.4; }
.chooser-card-pitch { border-style: dashed; }
.chooser-card-chain {
  border-color: #ffb612;
  background: rgba(255, 182, 18, 0.08);
}
.chooser-card-chain:hover {
  background: rgba(255, 182, 18, 0.16);
  border-color: #ffb612;
}
.chooser-card-chain .chooser-card-role { color: #ffb612; }
.chooser-close {
  background: none;
  border: none;
  color: #fff;
  opacity: 0.6;
  cursor: pointer;
  font: inherit;
  font-size: 0.85rem;
}
.chooser-close:hover { opacity: 1; }

/* Hand-over slide: the estafette moment where the subject changes hands. */
.handover {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
  text-align: center;
  font-family: 'RijksSans', system-ui, sans-serif;
}
.handover-title {
  font-family: 'RijksSerif', Georgia, serif;
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 700;
  line-height: 1.15;
  margin: 0;
  max-width: 24ch;
}
.handover-lead {
  font-size: clamp(1.05rem, 1.6vw, 1.35rem);
  line-height: 1.5;
  opacity: 0.9;
  margin: 0;
  max-width: 52ch;
}
.handover-people {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-top: 0.5rem;
}
.handover-person {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.9rem 1.4rem;
  border-radius: 12px;
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.06);
  min-width: 13rem;
}
.handover-person-next {
  border-color: #ffb612;
  background: rgba(255, 182, 18, 0.1);
}
.handover-person-name { font-weight: 700; font-size: 1.1rem; }
.handover-person-role { font-size: 0.85rem; color: #8fb8e8; }
.handover-person-next .handover-person-role { color: #ffb612; }
.handover-arrow { opacity: 0.8; flex: 0 0 auto; }
.handover-btn {
  margin-top: 1rem;
  display: inline-flex;
  align-items: center;
  height: 2.9rem;
  padding: 0 1.6rem;
  border-radius: 999px;
  border: 1.5px solid #ffb612;
  background: #ffb612;
  color: #154273;
  cursor: pointer;
  font: inherit;
  font-size: 1rem;
  font-weight: 700;
  transition: background 0.15s ease, transform 0.15s ease;
}
.handover-btn:hover {
  background: #ffc845;
  transform: translateY(-1px);
}

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
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.25);
  /* Animate the move between full-width intro and the left rail. */
  transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    padding 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Intro slides: the deck spans the screen; content sits in a centered column
   so the full-width text does not stretch uncomfortably wide. */
.deck.full {
  width: 100vw;
  padding: 4rem clamp(3rem, 12vw, 14rem) 2rem;
}

/* The content area is the only scroll region, so the footer (counter, nav) and
   progress bar stay visible even when a slide's text is taller than the panel. */
.content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: auto;
}

/* The story block grows to fill the panel and centers its content vertically,
   so a slide never clings to the top with a blue void beneath it. */
.content-main {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.4rem;
}

/* Government callout and speaker note are pinned at the foot, away from the
   story, with a hairline divider so they read as secondary. */
.content-foot {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1.25rem;
  margin-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.18);
}

.gov-pill {
  align-self: flex-start;
  font-family: 'RijksSans', system-ui, sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
}

.title {
  font-family: 'RijksoverheidSerif', Georgia, serif;
  font-weight: 700;
  font-size: clamp(2.6rem, 4.2vw, 4.2rem);
  line-height: 1.08;
  margin: 0;
  color: #fff;
}

.lead {
  font-family: 'RijksSans', system-ui, sans-serif;
  font-size: clamp(1.3rem, 1.8vw, 1.7rem);
  line-height: 1.4;
  margin: 0;
  color: #fff;
  font-weight: 500;
}

.bullets {
  font-family: 'RijksSans', system-ui, sans-serif;
  font-size: clamp(1.2rem, 1.6vw, 1.5rem);
  line-height: 1.45;
  margin: 0;
  padding-left: 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  color: rgba(255, 255, 255, 0.96);
}

.bullets li::marker {
  color: rgba(255, 255, 255, 0.7);
}

.bullets li {
  padding-left: 0.25rem;
}

/* Title-slide meta: speaker and affiliation on one line, date on its own. */
.title-meta {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-top: 0.6rem;
  font-family: 'RijksSans', system-ui, sans-serif;
  font-size: clamp(1rem, 1.3vw, 1.2rem);
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);
}

.title-speaker {
  font-weight: 600;
  color: #fff;
}

.title-affiliation {
  color: rgba(255, 255, 255, 0.85);
}

.title-date {
  color: rgba(255, 255, 255, 0.7);
}

/* Closing link, e.g. the wrap-up slide. */
.slide-link {
  align-self: flex-start;
  margin-top: 0.8rem;
  font-family: 'RijksSans', system-ui, sans-serif;
  font-size: clamp(1.2rem, 1.6vw, 1.5rem);
  font-weight: 600;
  color: #fff;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.slide-link:hover {
  color: rgba(255, 255, 255, 0.85);
}

.slide-link:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
}

.gov-explain {
  font-family: 'RijksSans', system-ui, sans-serif;
  font-size: 1.05rem;
  line-height: 1.45;
  margin: 0;
  color: rgba(255, 255, 255, 0.82);
}

/* Footnote-style aside (the asterisk from the blog): smaller and dimmer than
   the gov callout, a quiet self-correction at the foot of the slide. */
.aside-note {
  font-family: 'RijksSans', system-ui, sans-serif;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0.6rem 0 0;
  max-width: 60ch;
  color: rgba(255, 255, 255, 0.55);
}
.aside-mark {
  color: rgba(255, 255, 255, 0.75);
  font-weight: 600;
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

.counter-wrap {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}

.counter {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.85);
}

.chooser-back {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  font: inherit;
  font-size: 0.85rem;
  padding: 0;
}
.chooser-back:hover { color: #fff; }

/* Presenter cue: this slide can be cut when the talk runs short. */
.optional-chip {
  font-family: 'RijksSans', system-ui, sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: rgba(255, 255, 255, 0.8);
}

/* When skip mode is on, the chip warns this slide will be jumped over. */
.optional-chip-active {
  border-color: rgba(240, 196, 25, 0.8);
  color: #f0c419;
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

.restart-btn {
  display: inline-flex;
  align-items: center;
  height: 2.5rem;
  padding: 0 1.1rem;
  border-radius: 999px;
  border: 1.5px solid rgba(255, 255, 255, 0.7);
  background: transparent;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 0.9rem;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.restart-btn:hover {
  background: rgba(255, 255, 255, 0.18);
  border-color: #fff;
}

.round-btn:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}

.hints {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-family: 'RijksSans', system-ui, sans-serif;
  font-size: 0.78rem;
  /* 0.7 clears WCAG AA over the Rijksblauw panel. */
  color: rgba(255, 255, 255, 0.7);
}

.hint-autoplay {
  color: rgba(255, 255, 255, 0.8);
}

/* Live animation indicator + its pause/skip controls. */
/* Compact animation controls, inline in the hint row (dot + pause + skip). */
.drive-inline {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.drive-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #8fd19e;
  flex: 0 0 auto;
  animation: drive-blink 1s ease-in-out infinite;
}

.drive-inline-paused .drive-dot {
  background: #f0c419;
  animation: none;
}

@keyframes drive-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.25; }
}

/* Reduced-motion: the running/paused color already conveys state, drop the blink. */
@media (prefers-reduced-motion: reduce) {
  .drive-dot {
    animation: none;
  }
}

.drive-mini {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: transparent;
  color: #fff;
  cursor: pointer;
  transition: background 0.15s ease;
}

.drive-mini:hover {
  background: rgba(255, 255, 255, 0.2);
}

.drive-mini:focus-visible {
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
