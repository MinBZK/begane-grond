// Command-palette items. Static domain entry points plus (lazily) entity
// shortcuts pulled from the store, so Cmd-K can jump to a specific datacenter,
// service, team, etc. Domain agents can extend this by pushing entity items.
import { domains } from '../nav.js';
import { usePlatformStore } from '../stores/index.js';

export function commandItems() {
  const items = [];
  // Domain landing pages.
  for (const d of domains) {
    items.push({ label: d.label, to: d.path, icon: d.icon, hint: 'Domein' });
  }
  // Common actions.
  items.push(
    { label: 'Nieuwe applicatie', to: '/apps/nieuw', icon: 'plus', hint: 'Actie' },
    { label: 'Dienst afnemen', to: '/infra', icon: 'plus', hint: 'Actie' },
    { label: 'Werkplek uitrollen', to: '/werkplekken/nieuw', icon: 'plus', hint: 'Actie' },
    { label: 'Fleet-campagne starten', to: '/fleet/nieuw', icon: 'plus', hint: 'Actie' },
  );
  // Entity shortcuts from the store (guarded — store may be partially seeded).
  try {
    const s = usePlatformStore();
    for (const t of s.teams || []) items.push({ label: t.name, to: `/teams/${t.id}`, icon: 'person-2', hint: 'Team' });
    for (const p of s.people || []) items.push({ label: p.name, to: `/teams/mensen/${p.id}`, icon: 'person', hint: 'Persoon' });
    for (const a of s.apps || []) items.push({ label: a.name, to: `/apps/${a.id}`, icon: 'rectangle-stack', hint: 'Applicatie' });
    for (const dc of s.datacenters || []) items.push({ label: dc.name, to: `/fysiek/datacenters/${dc.id}`, icon: 'apartment-building', hint: 'Datacenter' });
  } catch (e) {
    // Store not ready (e.g. called before Pinia install) — domain items still work.
  }
  return items;
}
