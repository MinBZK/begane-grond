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
  // Key sub-pages that have no own sidebar entry, so Cmd-K can still reach the
  // daily-driver screens (on-call, alerts, releases, status, changes, RFCs).
  items.push(
    { label: 'On-call rooster', to: '/teams/on-call', icon: 'clock', hint: 'Pagina' },
    { label: 'Organisatie', to: '/teams/organisatie', icon: 'person-2', hint: 'Pagina' },
    { label: 'Alerts & SLO', to: '/observability/alerts', icon: 'exclamation-triangle', hint: 'Pagina' },
    { label: 'Logs', to: '/observability/logs', icon: 'file-text', hint: 'Pagina' },
    { label: 'Traces', to: '/observability/traces', icon: 'chart-x-y-axis-line', hint: 'Pagina' },
    { label: 'Releases', to: '/environments/releases', icon: 'arrow-up-arrow-down', hint: 'Pagina' },
    { label: 'Statuspagina', to: '/incidenten/status', icon: 'check-mark-circle', hint: 'Pagina' },
    { label: 'Changes', to: '/incidenten/changes', icon: 'calendar-event', hint: 'Pagina' },
    { label: "RFC's", to: '/governance/rfcs', icon: 'file-text', hint: 'Pagina' },
    { label: 'Audit-log', to: '/governance/audit', icon: 'list-decreasing-lines', hint: 'Pagina' },
    { label: 'Gebaande paden', to: '/apps/templates', icon: 'rectangle-stack', hint: 'Pagina' },
    { label: 'Hardware-catalogus', to: '/werkplekken/hardware', icon: 'business-suitcase', hint: 'Pagina' },
    { label: 'Digikoppeling / FSC', to: '/koppelvlakken/fsc', icon: 'link', hint: 'Pagina' },
    { label: 'Budgetten', to: '/kosten/budgetten', icon: 'euro-sign', hint: 'Pagina' },
    { label: "LLM-API's", to: '/ai/llm', icon: 'sparkles', hint: 'Pagina' },
    { label: 'Skills-marketplace', to: '/ai/skills', icon: 'puzzle-piece', hint: 'Pagina' },
    { label: 'API-explorer', to: '/cli/api', icon: 'terminal', hint: 'Pagina' },
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
