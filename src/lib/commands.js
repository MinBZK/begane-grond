// Command-palette items: the omni-search index. Static domain entry points and
// common actions, plus a broad sweep of entity shortcuts pulled from the store
// so Cmd-K can jump straight to a specific app, koppelvlak, wet, register,
// incident, person — anything with a detail page. Each entity item carries a
// `keywords` string (its searchable text) so matching works on more than the
// label, and a `subtitle` for context (team, status) in the results list.
import { domains } from '../nav.js';
import { routes } from '../presentation/routes.js';
import { usePlatformStore } from '../stores/index.js';

export function commandItems() {
  const items = [];
  // Domain landing pages.
  for (const d of domains) {
    items.push({ label: d.label, to: d.path, icon: d.icon, hint: 'Domein', keywords: d.label });
  }
  // Routes, as a searchable action ("Word de jurist…"). The `route` field is
  // handled by the palette's go() — it switches persona and starts the deck.
  for (const r of routes) {
    items.push({ label: `Word ${r.role}`, route: r.id, icon: r.icon, hint: 'Rol', keywords: `rol route ${r.role} ${r.id} presentatie verhaal` });
  }
  // Common actions.
  items.push(
    { label: 'Nieuwe applicatie', to: '/apps/nieuw', icon: 'plus', hint: 'Actie', keywords: 'nieuwe applicatie app aanmaken gebaand pad' },
    { label: 'Nieuw koppelvlak', to: '/koppelvlakken/nieuw', icon: 'plus', hint: 'Actie', keywords: 'nieuw koppelvlak api aanmaken' },
    { label: 'Dienst afnemen', to: '/infra', icon: 'plus', hint: 'Actie', keywords: 'dienst afnemen infra bestellen' },
    { label: 'Werkplek uitrollen', to: '/werkplekken/nieuw', icon: 'plus', hint: 'Actie', keywords: 'werkplek uitrollen laptop' },
    { label: 'Fleet-campagne starten', to: '/fleet/nieuw', icon: 'plus', hint: 'Actie', keywords: 'fleet campagne starten' },
  );
  // Key sub-pages that have no own sidebar entry, so Cmd-K can still reach the
  // daily-driver screens (on-call, alerts, releases, status, changes, RFCs).
  items.push(
    { label: 'On-call rooster', to: '/teams/on-call', icon: 'clock', hint: 'Pagina', keywords: 'on-call piket rooster' },
    { label: 'Organisatie', to: '/teams/organisatie', icon: 'person-2', hint: 'Pagina', keywords: 'organisatie' },
    { label: 'Alerts & SLO', to: '/observability/alerts', icon: 'exclamation-triangle', hint: 'Pagina', keywords: 'alerts slo' },
    { label: 'Logs', to: '/observability/logs', icon: 'file-text', hint: 'Pagina', keywords: 'logs logging' },
    { label: 'Traces', to: '/observability/traces', icon: 'chart-x-y-axis-line', hint: 'Pagina', keywords: 'traces tracing' },
    { label: 'Releases', to: '/environments/releases', icon: 'arrow-up-arrow-down', hint: 'Pagina', keywords: 'releases uitrol' },
    { label: 'Statuspagina', to: '/incidenten/status', icon: 'check-mark-circle', hint: 'Pagina', keywords: 'status statuspagina' },
    { label: 'Changes', to: '/incidenten/changes', icon: 'calendar-event', hint: 'Pagina', keywords: 'changes wijzigingen' },
    { label: "RFC's", to: '/governance/rfcs', icon: 'file-text', hint: 'Pagina', keywords: 'rfc request for change' },
    { label: 'Audit-log', to: '/governance/audit', icon: 'list-decreasing-lines', hint: 'Pagina', keywords: 'audit log' },
    { label: 'Bevoegdheidsketen', to: '/governance/bevoegdheid', icon: 'certificate', hint: 'Pagina', keywords: 'bevoegdheid grondslag legaliteit keten wetsartikel regelrecht juriconnect' },
    { label: 'Gebaande paden', to: '/apps/templates', icon: 'rectangle-stack', hint: 'Pagina', keywords: 'gebaande paden templates golden path' },
    { label: 'Hardware-catalogus', to: '/werkplekken/hardware', icon: 'business-suitcase', hint: 'Pagina', keywords: 'hardware catalogus' },
    { label: 'Digikoppeling / FSC', to: '/koppelvlakken/fsc', icon: 'link', hint: 'Pagina', keywords: 'digikoppeling fsc' },
    { label: 'API-compliance', to: '/koppelvlakken/compliance', icon: 'shield-check-mark', hint: 'Pagina', keywords: 'api compliance scorecard' },
    { label: 'Budgetten', to: '/kosten/budgetten', icon: 'euro-sign', hint: 'Pagina', keywords: 'budgetten kosten' },
    { label: "LLM-API's", to: '/ai/llm', icon: 'sparkles', hint: 'Pagina', keywords: 'llm api ai' },
    { label: 'Skills-marketplace', to: '/ai/skills', icon: 'puzzle-piece', hint: 'Pagina', keywords: 'skills marketplace plugins' },
    { label: 'API-explorer', to: '/cli/api', icon: 'terminal', hint: 'Pagina', keywords: 'api explorer cli' },
  );

  // Entity shortcuts from the store. Guarded — the store may be partially seeded
  // when this is first called (e.g. before Pinia install).
  try {
    const s = usePlatformStore();
    const teamName = (id) => s.teamById?.(id)?.name || id;

    for (const t of s.teams || [])
      items.push({ label: t.name, to: `/teams/${t.id}`, icon: 'person-2', hint: 'Team', subtitle: s.orgById?.(t.org)?.short || t.org, keywords: `${t.name} ${t.org} ${t.matrix || ''}` });

    for (const p of s.people || [])
      items.push({ label: p.name, to: `/teams/mensen/${p.id}`, icon: 'person', hint: 'Persoon', subtitle: `${p.role} · ${teamName(p.team)}`, keywords: `${p.name} ${p.role} ${teamName(p.team)} ${p.matrix || ''}` });

    for (const a of s.apps || [])
      items.push({ label: a.name, to: `/apps/${a.id}`, icon: 'rectangle-stack', hint: 'Applicatie', subtitle: teamName(a.team), keywords: `${a.name} ${teamName(a.team)} ${(a.stack || []).join(' ')} ${a.type || ''} ${a.maturity || ''}` });

    for (const dc of s.datacenters || [])
      items.push({ label: dc.name, to: `/fysiek/datacenters/${dc.id}`, icon: 'apartment-building', hint: 'Datacenter', subtitle: dc.region, keywords: `${dc.name} ${dc.region || ''}` });

    for (const i of s.instances || [])
      items.push({ label: i.name, to: `/infra/instances/${i.id}`, icon: 'cylinder-split', hint: 'Instance', subtitle: `${i.kind} · ${teamName(i.team)}`, keywords: `${i.name} ${i.kind || ''} ${teamName(i.team)} ${i.env || ''} ${i.status || ''}` });

    for (const api of s.apis || [])
      items.push({ label: `${api.name} ${api.version}`, to: '/koppelvlakken', icon: 'link', hint: 'Koppelvlak', subtitle: `${teamName(api.owner)} · ${api.status}`, keywords: `${api.name} ${api.version} ${teamName(api.owner)} ${api.status || ''} ${api.exposure || ''}` });

    for (const ds of s.datasets || [])
      items.push({ label: ds.name, to: `/data/${ds.id}`, icon: 'database', hint: 'Dataset', subtitle: `${teamName(ds.team)}${ds.qualityLabel ? ' · ' + ds.qualityLabel : ''}`, keywords: `${ds.name} ${teamName(ds.team)} ${ds.register || ''} ${ds.qualityLabel || ''} ${ds.description || ''}` });

    for (const c of s.datacontracten || []) {
      const dsName = s.datasetById?.(c.dataset)?.name || c.dataset;
      const appName = s.appById?.(c.consumer)?.name || c.consumer;
      items.push({ label: `${dsName} → ${appName}`, to: `/datacontracten/${c.id}`, icon: 'file-text', hint: 'Datacontract', subtitle: `${teamName(c.provider)} · ${c.status}`, keywords: `${dsName} ${appName} ${teamName(c.provider)} ${c.status || ''}` });
    }

    for (const r of s.registers || [])
      items.push({ label: r.name, to: `/registers/${r.id}`, icon: 'building-columns', hint: 'Basisregistratie', subtitle: r.authority, keywords: `${r.name} ${r.authority || ''} ${r.kind || ''} ${r.classification || ''}` });

    for (const dom of s.domeinen || [])
      items.push({ label: dom.fqdn, to: `/dns/${dom.id}`, icon: 'globe', hint: 'Domein', subtitle: teamName(dom.team), keywords: `${dom.fqdn} ${teamName(dom.team)} ${dom.registrar || ''} ${dom.status || ''}` });

    for (const inc of s.incidents || [])
      items.push({ label: inc.title, to: `/incidenten/${inc.id}`, icon: 'exclamation-triangle', hint: 'Incident', subtitle: `${inc.severity} · ${inc.status}`, keywords: `${inc.title} ${inc.severity || ''} ${inc.status || ''} ${teamName(inc.team)}` });

    for (const w of s.wetten || [])
      items.push({ label: w.name, to: `/wetten/${w.id}`, icon: 'clipboard', hint: 'Wet', subtitle: w.status, keywords: `${w.name} ${w.bwbId || ''} ${w.status || ''} ${teamName(w.owner)}` });

    for (const alg of s.algoritmes || [])
      items.push({ label: alg.name, to: `/algoritmes/${alg.id}`, icon: 'sparkles', hint: 'Algoritme', subtitle: teamName(alg.team), keywords: `${alg.name} ${teamName(alg.team)} ${alg.type || ''} ${alg.doel || ''} ${alg.status || ''}` });

    for (const v of s.verwerkingen || [])
      items.push({ label: v.name, to: `/verwerkingen/${v.id}`, icon: 'list-decreasing-lines', hint: 'Verwerking', subtitle: teamName(v.team), keywords: `${v.name} ${teamName(v.team)} ${v.doel || ''} ${v.grondslag || ''} ${v.wet || ''}` });

    for (const comp of s.componenten || [])
      items.push({ label: comp.name, to: `/componenten/${comp.id}`, icon: 'puzzle-piece', hint: 'Component', subtitle: `${comp.kind} · ${teamName(comp.owner)}`, keywords: `${comp.name} ${comp.kind || ''} ${comp.language || ''} ${teamName(comp.owner)} ${comp.description || ''}` });

    for (const repo of s.repos || [])
      items.push({ label: repo.name, to: `/code/${repo.id}`, icon: 'chevron-left-forward-slash-chevron-right', hint: 'Repository', subtitle: repo.lang, keywords: `${repo.name} ${repo.lang || ''} ${repo.visibility || ''}` });

    for (const camp of s.campaigns || [])
      items.push({ label: camp.title, to: `/fleet/${camp.id}`, icon: 'rocket', hint: 'Campagne', subtitle: `${teamName(camp.owner)} · ${camp.status}`, keywords: `${camp.title} ${teamName(camp.owner)} ${camp.status || ''}` });
  } catch (e) {
    // Store not ready — domain items still work.
  }
  return items;
}
