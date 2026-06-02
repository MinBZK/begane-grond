<script setup>
// The cross-cutting "ook via de CLI" pattern: shows the equivalent
// `bg` command for whatever the user just did, in an NLDD code block with a
// copy button. Drop this under any action/wizard end screen.
defineProps({
  command: { type: String, required: true },
  label: { type: String, default: 'Dit kan ook via de CLI:' },
});
</script>

<template>
  <div class="rp-cli-hint">
    <p class="rp-cli-label">
      <nldd-icon name="terminal" aria-hidden="true"></nldd-icon>
      {{ label }}
    </p>
    <nldd-code-viewer language="bash" wrap>{{ command }}</nldd-code-viewer>
  </div>
</template>

<style scoped>
.rp-cli-hint {
  margin-top: 1rem;
}
.rp-cli-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  opacity: 0.7;
  margin: 0 0 0.35rem;
}
.rp-cli-label nldd-icon {
  width: 1rem;
  height: 1rem;
}
</style>
