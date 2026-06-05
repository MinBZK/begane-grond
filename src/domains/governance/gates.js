// Pure evaluation of the four Rijksbrede beleids-gates against a single app.
// Extracted from Gates.vue so the NeRDS scorecard can reuse the exact same
// verdict logic instead of forking a second, drifting copy. `store` is passed
// in (rather than imported) to keep this a pure function of its inputs.
//
// Returns one of:
//  'pass'   - meets the policy
//  'fail'   - violates the policy and must be remediated
//  'exempt' - not applicable to this app (e.g. WCAG on a backend service)
// The reasoning string explains the verdict and powers the tooltip cell.
export function evalGate(app, gateId, store) {
  const repo = app.repo ? store.repoById(app.repo) : null;
  const isFrontend =
    app.type === 'website' || app.stack?.includes('Vue') || app.stack?.includes('NLDD');
  const vulns = store.vulnerabilities.filter((v) => v.app === app.id);
  const openCritical = vulns.filter(
    (v) => (v.severity === 'critical' || v.severity === 'high') && v.status !== 'opgelost'
  );

  switch (gateId) {
    case 'gate-open': {
      // Open-source-tenzij: repo is open, or an internal repo needs a motivation.
      if (!repo) return { verdict: 'exempt', why: 'Geen repository gekoppeld' };
      if (repo.visibility === 'open') return { verdict: 'pass', why: 'Repository is openbaar' };
      return { verdict: 'fail', why: 'Interne repo zonder gemotiveerde uitzondering' };
    }
    case 'gate-eupl': {
      if (!repo) return { verdict: 'exempt', why: 'Geen repository gekoppeld' };
      if (repo.license === 'EUPL-1.2') return { verdict: 'pass', why: `Licentie ${repo.license}` };
      return { verdict: 'fail', why: `Licentie ${repo.license || 'ontbreekt'} is niet EUPL-1.2` };
    }
    case 'gate-wcag': {
      if (!isFrontend) return { verdict: 'exempt', why: 'Geen publieke frontend' };
      if (app.maturity === 'goud') return { verdict: 'pass', why: 'WCAG 2.2 AA getoetst (goud)' };
      return { verdict: 'fail', why: 'WCAG-toets nog niet afgerond' };
    }
    case 'gate-bio': {
      if (openCritical.length) {
        return { verdict: 'fail', why: `${openCritical.length} open kwetsbaarheid(en) (BIO)` };
      }
      if (app.health === 'warn')
        return { verdict: 'fail', why: 'Operationele BIO-controls op warn' };
      return { verdict: 'pass', why: 'BIO-baseline groen' };
    }
    default:
      return { verdict: 'exempt', why: '' };
  }
}
