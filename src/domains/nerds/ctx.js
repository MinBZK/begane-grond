// Builds the pure context the NeRDS scorecard reads from. Shared by the hub
// (NerdsOverview) and the per-app scorecard (NerdsScorecards) so both compute
// from the exact same inputs. `store` is carried through so the delegated gate
// evaluation can resolve repos and vulnerabilities.
export function buildNerdsCtx(store) {
  return {
    store,
    richtlijnen: store.richtlijnen,
    apps: store.apps,
    teams: store.teams,
    repos: store.repos,
    oncall: store.oncall,
    slos: store.slos,
    instances: store.instances,
    vulnerabilities: store.vulnerabilities,
    secrets: store.secrets,
    standards: store.standards,
    apis: store.apis,
    datasets: store.datasets,
    datacontracten: store.datacontracten,
    algoritmes: store.algoritmes,
    verwerkingen: store.verwerkingen,
    componenten: store.componenten,
    softwareInkoop: store.softwareInkoop,
    personName: (id) => store.personById(id)?.name || id,
  };
}
