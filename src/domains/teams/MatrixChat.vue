<script setup>
// A faked Matrix chat panel rendered inside an nldd-modal-dialog. It seeds a
// short scripted conversation and lets the demo user "send" a message, which
// gets echoed locally and answered with a canned reply. Nothing leaves memory.
import { nextTick, ref, watch } from 'vue';
import { usePlatformStore } from '../../stores/index.js';

const props = defineProps({
  open: { type: Boolean, default: false },
  // The counterpart: either a person { name, matrix } or a room { name, matrix }.
  title: { type: String, required: true },
  handle: { type: String, required: true },
  // 'direct' shows a 1:1 thread, 'room' shows a group room with seeded chatter.
  kind: { type: String, default: 'direct' },
  // Optional seed messages [{ from, text, mine }].
  seed: { type: Array, default: () => [] },
});
const emit = defineEmits(['close']);

const store = usePlatformStore();
const draft = ref('');
const scroller = ref(null);

const me = () => store.currentPerson?.name || 'Anne Schuth';

const defaultSeed = () => {
  if (props.kind === 'room') {
    return [
      { from: 'Fatima El Amrani', text: 'Piket is overgedragen, alerts staan groen.', mine: false },
      { from: 'Anne Schuth', text: 'Top. Ik pak de NLDD-bump in het portaal vandaag op.', mine: true },
      { from: 'Pieter Jansen', text: 'Koppelvlak-certificaat verloopt over 30 dagen, staat op de planning.', mine: false },
    ];
  }
  return [
    { from: props.title, text: `Hoi ${me().split(' ')[0]}, waar kan ik mee helpen?`, mine: false },
  ];
};

const messages = ref([]);

watch(
  () => props.open,
  (v) => {
    if (v) {
      messages.value = props.seed.length ? [...props.seed] : defaultSeed();
      nextTick(scrollToEnd);
    }
  },
  { immediate: true },
);

function scrollToEnd() {
  if (scroller.value) scroller.value.scrollTop = scroller.value.scrollHeight;
}

function send() {
  const text = draft.value.trim();
  if (!text) return;
  messages.value.push({ from: me(), text, mine: true });
  draft.value = '';
  store.audit('Matrix-bericht verzonden', props.handle);
  nextTick(scrollToEnd);
  // Canned reply so the panel feels alive.
  const reply =
    props.kind === 'room'
      ? 'Genoteerd, ik kijk ernaar.'
      : `Bedankt, ik pak het op. (gefaket antwoord van ${props.title})`;
  setTimeout(() => {
    messages.value.push({
      from: props.kind === 'room' ? 'Fatima El Amrani' : props.title,
      text: reply,
      mine: false,
    });
    nextTick(scrollToEnd);
  }, 900);
}
</script>

<template>
  <nldd-modal-dialog
    :open="open || undefined"
    :heading="`Gesprek · ${title}`"
    @close="emit('close')"
  >
    <div class="rp-chat">
      <div class="rp-chat-head">
        <span class="rp-chat-net" aria-hidden="true"></span>
        <div>
          <strong>{{ title }}</strong>
          <div class="rp-chat-handle rp-mono">{{ handle }}</div>
        </div>
        <nldd-tag color="accent" size="md">{{ kind === 'room' ? 'Matrix-room' : 'Direct' }}</nldd-tag>
      </div>

      <div ref="scroller" class="rp-chat-log">
        <div
          v-for="(m, i) in messages"
          :key="i"
          class="rp-chat-msg"
          :class="{ 'rp-chat-mine': m.mine }"
        >
          <div v-if="kind === 'room' && !m.mine" class="rp-chat-from">{{ m.from }}</div>
          <div class="rp-chat-bubble">{{ m.text }}</div>
        </div>
      </div>

      <form class="rp-chat-compose" @submit.prevent="send">
        <nldd-text-field
          label="Bericht"
          hide-label
          placeholder="Typ een bericht…"
          :value="draft"
          @input="(e) => (draft = e.target.value)"
        ></nldd-text-field>
        <nldd-button variant="primary" text="Versturen" end-icon="arrow-right" @click="send" />
      </form>
      <p class="rp-chat-foot">Gefaket Matrix-paneel. Berichten blijven lokaal in deze demo.</p>
    </div>
  </nldd-modal-dialog>
</template>

<style scoped>
.rp-chat {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: min(440px, 80vw);
}
.rp-chat-head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.rp-chat-net {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: #1a7f37;
  box-shadow: 0 0 0 3px rgba(26, 127, 55, 0.18);
}
.rp-chat-head > div {
  margin-right: auto;
}
.rp-chat-handle {
  font-size: 0.78rem;
  opacity: 0.6;
}
.rp-chat-log {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 320px;
  overflow-y: auto;
  padding: 0.75rem;
  border-radius: 10px;
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-chat-msg {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 85%;
}
.rp-chat-mine {
  align-self: flex-end;
  align-items: flex-end;
}
.rp-chat-from {
  font-size: 0.72rem;
  opacity: 0.6;
  margin: 0 0 0.15rem 0.2rem;
}
.rp-chat-bubble {
  padding: 0.5rem 0.75rem;
  border-radius: 14px;
  background: var(--semantics-surfaces-background-color);
  border: 1px solid var(--semantics-dividers-color);
  font-size: 0.9rem;
  line-height: 1.35;
}
.rp-chat-mine .rp-chat-bubble {
  background: var(--semantics-action-primary-background-color);
  color: #fff;
  border-color: transparent;
}
.rp-chat-compose {
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
}
.rp-chat-compose nldd-text-field {
  flex: 1;
}
.rp-chat-foot {
  margin: 0;
  font-size: 0.75rem;
  opacity: 0.55;
}
.rp-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
</style>
