<script setup>
// "Draait op Haven+" provenance banner. Reused on the domains that are, in fact,
// Haven+ platform services (observability, inloggen, certificaten, secrets).
// The point it makes: these screens are the usage side; Haven+ is where the
// service comes from. Because it is a Haven+ building block and not an
// Azure/AWS-specific one, the app on top stays portable between Haven
// environments. The `service` prop names what this particular screen delivers.
import HavenLogo from './HavenLogo.vue';

defineProps({
  service: { type: String, required: true }, // e.g. 'Certificaten', 'Secrets'
});
</script>

<template>
  <a class="rp-haven-badge" href="https://haven.commonground.nl/" target="_blank" rel="noopener">
    <span class="rp-haven-icon">
      <HavenLogo />
    </span>
    <span class="rp-haven-text">
      <strong>{{ service }} draait op Haven+</strong>
      <span class="rp-haven-sub">
        Een platformdienst, geen cloud-specifieke {{ service.toLowerCase() }}. Daardoor verhuist
        een app hierheen zonder herschrijven.
      </span>
    </span>
    <nldd-icon name="external-link" aria-hidden="true" class="rp-haven-out"></nldd-icon>
  </a>
</template>

<style scoped>
.rp-haven-badge {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.95rem;
  border-radius: 12px;
  border: 1px solid var(--semantics-dividers-color, #d6dbe1);
  background: var(--semantics-surfaces-tinted-background-color, #f4f6f9);
  text-decoration: none;
  color: inherit;
}
.rp-haven-badge:hover {
  border-color: var(--semantics-actions-primary-default-background-color, #154273);
}
.rp-haven-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 10px;
  /* Haven brand accent (geel #FFBC2C op zwart) zodat het oog "Haven" leest,
     zonder hun logo na te maken. */
  background: #ffbc2c;
  color: #000;
  flex: 0 0 auto;
}
.rp-haven-icon :deep(.rp-haven-logo) {
  width: 1.35rem;
  height: 1.35rem;
}
.rp-haven-text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  flex: 1 1 auto;
}
.rp-haven-sub {
  font-size: 0.85rem;
  opacity: 0.7;
}
.rp-haven-out {
  width: 1rem;
  height: 1rem;
  opacity: 0.5;
  flex: 0 0 auto;
}
</style>
