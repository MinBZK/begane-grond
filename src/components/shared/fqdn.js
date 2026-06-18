// Shared helper for rendering fully-qualified domain names that wrap nicely.
//
// Long fqdns must wrap only on their dot/hyphen boundaries, never mid-label
// (studiefinanciering.duo.gov.nl -> studiefinanciering / .duo.gov.nl, never
// ...gov.n / l). Split an fqdn into label-with-separator chunks so a template
// can place a <wbr/> after each chunk; combine with the CSS
// `.rp-mono { word-break: keep-all; overflow-wrap: normal; hyphens: none; }`.
export function fqdnParts(fqdn) {
  return (fqdn || '').match(/[^.-]+[.-]?/g) || [fqdn || ''];
}
