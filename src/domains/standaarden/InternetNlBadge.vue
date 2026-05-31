<script setup>
// An internet.nl-style badge for a public-facing service: the familiar dark
// panel with a verdict ring and the four measured categories (web, mail, ...),
// rendered as an SVG so it scales crisply. Clicking the badge opens the app.
import { computed } from 'vue';

const props = defineProps({
  app: { type: Object, required: true },
  domain: { type: String, required: true },
  score: { type: Number, default: 100 },
  passed: { type: Boolean, default: true },
});

// Per-category dots. When the badge does not fully pass, the weakest category
// (mail/IPv6) is shown as a partial.
const categories = computed(() => [
  { label: 'IPv6', ok: props.passed },
  { label: 'DNSSEC', ok: true },
  { label: 'HTTPS / TLS', ok: true },
  { label: 'DMARC / DKIM', ok: props.passed },
]);

const ringColor = computed(() => (props.passed ? '#3bb273' : '#e0a128'));
const circumference = 2 * Math.PI * 26;
const dash = computed(() => (props.score / 100) * circumference);
</script>

<template>
  <router-link :to="`/apps/${app.id}`" class="rp-badge-link">
    <nldd-card :accessible-label="`Internet.nl-badge voor ${app.name}`">
      <nldd-container padding="0">
        <div class="rp-inl-badge">
          <div class="rp-inl-top">
            <div class="rp-inl-mark">
              <svg viewBox="0 0 64 64" width="60" height="60" aria-hidden="true">
                <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="6" />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  :stroke="ringColor"
                  stroke-width="6"
                  stroke-linecap="round"
                  :stroke-dasharray="`${dash} ${circumference}`"
                  transform="rotate(-90 32 32)"
                />
                <text x="32" y="37" text-anchor="middle" class="rp-inl-score">{{ score }}</text>
              </svg>
            </div>
            <div class="rp-inl-id">
              <span class="rp-inl-brand">internet.nl</span>
              <span class="rp-inl-domain">{{ domain }}</span>
              <span class="rp-inl-verdict" :class="passed ? 'rp-pass' : 'rp-warn'">
                {{ passed ? 'Voldoet aan de standaarden' : 'Bijna volledig' }}
              </span>
            </div>
          </div>
          <div class="rp-inl-cats">
            <div v-for="c in categories" :key="c.label" class="rp-inl-cat">
              <span class="rp-inl-dot" :class="c.ok ? 'rp-dot-ok' : 'rp-dot-warn'"></span>
              <span>{{ c.label }}</span>
            </div>
          </div>
        </div>
      </nldd-container>
    </nldd-card>
  </router-link>
</template>

<style scoped>
.rp-badge-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
.rp-inl-badge {
  background: linear-gradient(160deg, #15233b 0%, #1d3050 100%);
  color: #fff;
  border-radius: 12px;
  padding: 1rem 1.1rem;
}
.rp-inl-top {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}
.rp-inl-score {
  fill: #fff;
  font-size: 18px;
  font-weight: 700;
}
.rp-inl-id {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
}
.rp-inl-brand {
  font-weight: 700;
  letter-spacing: 0.02em;
}
.rp-inl-domain {
  font-size: 0.82rem;
  opacity: 0.7;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
.rp-inl-verdict {
  font-size: 0.78rem;
  font-weight: 600;
  margin-top: 0.15rem;
}
.rp-pass { color: #6fe0a0; }
.rp-warn { color: #f0c569; }
.rp-inl-cats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.4rem 0.8rem;
  margin-top: 0.9rem;
  padding-top: 0.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 0.8rem;
}
.rp-inl-cat {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}
.rp-inl-dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  flex: 0 0 auto;
}
.rp-dot-ok { background: #3bb273; }
.rp-dot-warn { background: #e0a128; }
</style>
