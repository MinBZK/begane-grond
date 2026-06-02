<script setup>
// The personal notification inbox, fed by the store's event bus. Used in the
// top-nav bell popover and on the "Mijn overzicht" dashboard. Shows the current
// user's relevant events (their team + critical platform-wide), with severity
// dots, deep links, mark-as-read and a severity filter.
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';

const props = defineProps({
  // 'compact' for the bell popover (limited height), 'full' for the dashboard.
  variant: { type: String, default: 'compact' },
  limit: { type: Number, default: 0 }, // 0 = no limit
});
const emit = defineEmits(['navigate']);

const store = usePlatformStore();
const router = useRouter();

const filter = ref('all'); // all | unread | critical
const SEV_COLOR = { critical: 'critical', warning: 'warning', success: 'success', info: 'neutral' };

const events = computed(() => {
  let list = store.inboxEvents;
  if (filter.value === 'unread') list = list.filter((e) => !e.read);
  else if (filter.value === 'critical') list = list.filter((e) => e.severity === 'critical');
  return props.limit ? list.slice(0, props.limit) : list;
});

function open(ev) {
  store.markRead(ev.id);
  if (ev.target) {
    router.push(ev.target);
    emit('navigate');
  }
}
function actorName(id) {
  return store.personById(id)?.name || id;
}
</script>

<template>
  <div class="rp-inbox" :class="`rp-inbox-${variant}`">
    <div class="rp-inbox-head">
      <nldd-segmented-control>
        <button type="button" :aria-pressed="filter === 'all'" @click="filter = 'all'">Alles</button>
        <button type="button" :aria-pressed="filter === 'unread'" @click="filter = 'unread'">
          Ongelezen<span v-if="store.unreadCount"> ({{ store.unreadCount }})</span>
        </button>
        <button type="button" :aria-pressed="filter === 'critical'" @click="filter = 'critical'">Kritiek</button>
      </nldd-segmented-control>
      <nldd-button
        v-if="store.unreadCount"
        variant="secondary"
        size="sm"
        text="Alles gelezen"
        start-icon="check-mark"
        @click="store.markAllRead()"
      ></nldd-button>
    </div>

    <ul class="rp-inbox-list">
      <li
        v-for="ev in events"
        :key="ev.id"
        class="rp-inbox-item"
        :class="{ 'rp-unread': !ev.read }"
        @click="open(ev)"
      >
        <span class="rp-dot" :style="{ '--rp-dot-color': `var(--semantics-${SEV_COLOR[ev.severity] === 'neutral' ? 'dividers' : 'feedback-' + SEV_COLOR[ev.severity]}-color, currentColor)` }"></span>
        <span class="rp-inbox-icon"><nldd-icon :name="ev.icon" aria-hidden="true"></nldd-icon></span>
        <span class="rp-inbox-main">
          <span class="rp-inbox-title">{{ ev.title }}</span>
          <span class="rp-inbox-meta">
            <nldd-tag :color="SEV_COLOR[ev.severity]" size="md">{{ ev.label }}</nldd-tag>
            <span class="rp-inbox-by">{{ actorName(ev.actor) }} · {{ ev.at }}</span>
          </span>
        </span>
        <nldd-icon v-if="ev.target" name="chevron-right" aria-hidden="true" class="rp-inbox-chev"></nldd-icon>
      </li>
      <li v-if="!events.length" class="rp-inbox-empty">Geen notificaties.</li>
    </ul>
  </div>
</template>

<style scoped>
.rp-inbox-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}
.rp-inbox-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.rp-inbox-compact .rp-inbox-list {
  max-height: 24rem;
  overflow-y: auto;
}
.rp-inbox-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.7rem 0.5rem;
  border-bottom: 1px solid var(--semantics-dividers-color);
  cursor: pointer;
}
.rp-inbox-item:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-inbox-item.rp-unread {
  background: color-mix(in srgb, var(--semantics-surfaces-tinted-background-color) 70%, transparent);
}
.rp-inbox-item .rp-dot {
  margin-top: 0.45rem;
  flex: 0 0 auto;
}
.rp-inbox-icon {
  flex: 0 0 auto;
  margin-top: 0.1rem;
}
.rp-inbox-icon nldd-icon {
  width: 1.1rem;
  height: 1.1rem;
  opacity: 0.75;
}
.rp-inbox-main {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.rp-inbox-title {
  font-weight: 600;
  line-height: 1.3;
}
.rp-unread .rp-inbox-title {
  font-weight: 700;
}
.rp-inbox-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.rp-inbox-by {
  font-size: 0.8rem;
  opacity: 0.6;
}
.rp-inbox-chev {
  width: 1rem;
  height: 1rem;
  opacity: 0.4;
  margin-top: 0.2rem;
  flex: 0 0 auto;
}
.rp-inbox-empty {
  padding: 1.5rem;
  text-align: center;
  opacity: 0.6;
}
</style>
