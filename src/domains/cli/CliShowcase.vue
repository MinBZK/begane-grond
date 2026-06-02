<script setup>
// CLI showcase: the `bg` command-line tree, presented as a documented set of
// real, copy-pasteable command blocks per platform domain. Every example is
// derived from the live store data so the commands reference entities that
// actually exist elsewhere in the demo (instances, apps, racks, teams).
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import CliHint from '../../components/shared/CliHint.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';

const store = usePlatformStore();
const router = useRouter();

const me = computed(() => store.currentPerson);
const myTeam = computed(() => store.teamOfPerson(store.currentUser));

// --- Install / auth block (top of the page) ---------------------------------
const installCmd = `# Installeer de Begane Grond-CLI (one-liner, geverifieerd via PKIoverheid)
curl -fsSL https://cli.bg.rijks.app/install.sh | sh

# Of via de pakketbeheerder van je autonome werkplek
sudo dnf install bg-cli      # Fedora Silverblue
brew install nldd/tap/bg # macOS (privé-laptops)

bg --version
# bg 1.8.2 (build 2026-04-18, fsc-aware)`;

const authCmd = `# Log in via SSO Rijk. Opent de browser.
bg auth login
#  → Browser geopend op https://login.rijks.app/device
#  → Ingelogd als ${me.value?.name || 'Anne Schuth'} (${me.value?.matrix || '@anne:rijk.chat'})
#  → Actief team: ${myTeam.value?.name || 'Platform Engineering'}

bg auth status
bg auth switch-team ${store.teams.map((t) => t.id).slice(0, 2).join(' | ')}
bg config set default-dc dc-denhaag`;

// --- Command tree per domain ------------------------------------------------
// Each group renders as a card with a short lede and one bash block. The
// examples reference live seed entities (looked up below) so they stay honest.
const firstInst = computed(() => store.instances[0]);
const firstApp = computed(() => store.apps[0]);
const firstRepo = computed(() => store.repos[0]);
const firstRack = computed(() => store.racks.find((r) => r.units.length) || store.racks[0]);
const activeCampaign = computed(
  () => store.campaigns.find((c) => c.status === 'actief') || store.campaigns[0],
);

const groups = computed(() => [
  {
    id: 'infra',
    title: 'bg infra',
    icon: 'rectangle-stack',
    lede: 'Neem managed infrastructuur af uit de servicecatalogus en beheer instances.',
    to: '/infra/order/postgres',
    toText: 'Open de infra-catalogus',
    code: `# Bestel een managed PostgreSQL voor een app (provisioning loopt async)
bg infra order postgres \\
  --name pg-burgerzaken-staging \\
  --team ${myTeam.value?.id || 'team-platform'} \\
  --app ${firstApp.value?.id || 'app-paspoort'} \\
  --env acc --size M --dc dc-denhaag

# Volg de status-overgangen requested → provisioning → ready
bg infra watch pg-burgerzaken-staging

# Lijst, schaal en ruim op
bg infra list --team ${myTeam.value?.id || 'team-platform'}
bg infra scale ${firstInst.value?.id || 'pg-burgerzaken-prod'} --size L
bg infra show ${firstInst.value?.id || 'pg-burgerzaken-prod'} --output json
bg infra delete pg-burgerzaken-staging --yes`,
  },
  {
    id: 'app',
    title: 'bg app',
    icon: 'rectangle-stack',
    lede: 'Het gebaande pad: nieuwe applicatie met repo, CI en optioneel infra in één commando.',
    to: '/apps/nieuw',
    toText: 'Open het gebaande pad',
    code: `# Zet een nieuwe service op vanuit een steiger (maakt repo + CI + infra)
bg app new "Inkomstenmonitor" \\
  --team ${myTeam.value?.id || 'team-platform'} \\
  --template tpl-rust-api \\
  --with-infra postgres,redis \\
  --visibility open

# Bekijk en promoot tussen omgevingen
bg app list --team ${myTeam.value?.id || 'team-platform'}
bg app show ${firstApp.value?.id || 'app-paspoort'}
bg app promote ${firstApp.value?.id || 'app-paspoort'} --from acc --to prod`,
  },
  {
    id: 'werkplek',
    title: 'bg werkplek',
    icon: 'person',
    lede: 'Rol een autonome Linux-werkplek uit en beheer je vloot van laptops.',
    to: '/werkplekken/nieuw',
    toText: 'Bestel een werkplek',
    code: `# Rol een autonome werkplek uit voor een collega
bg werkplek provision \\
  --person ${me.value?.id || 'ans'} \\
  --model rijkslaptop-linux-14 \\
  --image autonoom-13

# Status en compliance van je vloot
bg werkplek list --person ${me.value?.id || 'ans'}
bg werkplek show wp-0001          # encryptie, MDM, laatst gezien
bg werkplek lock wp-0003          # op afstand vergrendelen`,
  },
  {
    id: 'fleet',
    title: 'bg fleet',
    icon: 'ship-wheel',
    lede: 'Fleet-shift, native in bg: één wijziging als PR over al je repositories tegelijk.',
    to: '/fleet/' + (activeCampaign.value?.id || 'camp-securitytxt'),
    toText: 'Open de campagne',
    code: `# Maak een campagne aan en rol hem uit over meerdere repos
bg fleet campaign new "Voeg security.txt toe (RFC 9116)" \\
  --type file-creation \\
  --repos repo-paspoort,repo-toeslagen,repo-platformportaal

bg fleet campaign run ${activeCampaign.value?.id || 'camp-securitytxt'}
bg fleet campaign status ${activeCampaign.value?.id || 'camp-securitytxt'}
# open: 1   merged: 2   failing: 1
bg fleet campaign retry ${activeCampaign.value?.id || 'camp-securitytxt'} --only-failing`,
  },
  {
    id: 'oncall',
    title: 'bg oncall',
    icon: 'heart',
    lede: 'Wie heeft piket, escaleer en bevestig incidenten zonder de portal te openen.',
    to: '/teams/on-call',
    toText: 'Bekijk piketrooster',
    code: `# Wie is er nu piket?
bg oncall who --team ${myTeam.value?.id || 'team-platform'}
#  → ${store.oncall[0]?.person || 'fatima'} (tot ${store.oncall[0]?.until || 'ma 9:00'})

bg oncall who --all              # alle teams in één overzicht
bg incident list --open
bg incident ack inc-2024-017     # incident bevestigen / overnemen
bg oncall escalate inc-2024-017`,
  },
  {
    id: 'ai',
    title: 'bg ai',
    icon: 'sparkles',
    lede: 'Soevereine LLM-gateway: keys aanmaken, modellen kiezen en prompten vanaf de CLI.',
    to: '/ai/llm',
    toText: 'Bekijk LLM-modellen',
    code: `# Maak een API-key aan voor de overheids-LLM-gateway
bg ai key create --model overheids-llm-l --team ${myTeam.value?.id || 'team-platform'} --name ci-summarizer
#  → llm_sk_live_••••••••••••••••5f3a  (kopieer nu, wordt niet opnieuw getoond)

bg ai models                     # overheids-llm-l, overheids-llm-s, overheids-llm-eu
bg ai chat --model overheids-llm-l "Vat dit changelog samen" < CHANGELOG.md

# Skills-marketplace: geef je assistent kennis van de overheidsstandaarden
bg ai skill search digikoppeling
bg ai skill install standaarden --team ${myTeam.value?.id || 'team-platform'}
bg ai skill list --team ${myTeam.value?.id || 'team-platform'}`,
  },
  {
    id: 'code',
    title: 'bg code',
    icon: 'chevron-left-forward-slash-chevron-right',
    lede: 'Start opencode, kant-en-klaar voor de overheid: soevereine LLM, SSO Rijk en de platform-MCP-tools al ingesteld. Plus de repo-commando’s.',
    to: '/ai',
    toText: 'Bekijk AI-assisted coding',
    code: `# Start opencode, geconfigureerd voor de overheid
bg code
#  → opencode opent in deze repo
#  → model: overheids-llm-l (soevereine gateway), ingelogd via SSO Rijk
#  → MCP-tools van het platform beschikbaar (infra, on-call, deploy, fleet)

# Of expliciet een ander soeverein model kiezen
bg code --model overheids-llm-s

# Werk met repositories op code.overheid.nl
bg code clone ${firstRepo.value?.name || 'minbzk/paspoort'}
bg code review --staged           # AI-review tegen de standaarden, voor je pusht`,
  },
  {
    id: 'rack',
    title: 'bg rack',
    icon: 'cylinder-split',
    lede: 'Tot in de fysieke laag: bekijk rack-indeling, plaats en verwijder apparatuur.',
    to: '/fysiek/racks/' + (firstRack.value?.id || 'r-dh-a1'),
    toText: 'Open de rack-view',
    code: `# Toon de unit-indeling van een rack (bottom = U1)
bg rack show ${firstRack.value?.id || 'r-dh-a1'}
#  U20-23  storage-01     [team-platform]  600W  ok
#  U10-11  pg-primary-01  [team-data]      380W  warn
#  U06-07  k8s-node-01    [team-platform]  420W  ok

bg rack place ${firstRack.value?.id || 'r-dh-a1'} --u 14 --height 2 \\
  --type server --label k8s-node-04 --team ${myTeam.value?.id || 'team-platform'}
bg rack remove ${firstRack.value?.id || 'r-dh-a1'} --u 14
bg dc show dc-denhaag --capacity`,
  },
  {
    id: 'wet',
    title: 'bg wet',
    icon: 'certificate',
    lede: 'Van wettekst naar een draaiende, machine-leesbare dienst.',
    to: '/wetten',
    toText: 'Open het wetten-corpus',
    code: `# Harvest een wet uit BWB en maak hem machine-leesbaar
bg wet harvest BWBR0008659 --name "Wet op de huurtoeslag"
bg wet edit huurtoeslagwet

# Koppel invoer aan een basisregister
bg wet input add huurtoeslagwet --field toetsingsinkomen --from register:inkomen

# Test, publiceer en rol uit als dienst
bg wet scenario run huurtoeslagwet
bg wet publish huurtoeslagwet
bg wet deploy huurtoeslagwet --template rust-api`,
  },
  {
    id: 'register',
    title: 'bg register',
    icon: 'cylinder-split',
    lede: 'Sluit diensten en wetten aan op de basisregistraties.',
    to: '/registers',
    toText: 'Open de basisregistraties',
    code: `bg register list
bg register show brp
bg register connect inkomen --field toetsingsinkomen --app app-toeslagen`,
  },
  {
    id: 'data',
    title: 'bg data',
    icon: 'chart-x-y-axis-line',
    lede: 'Datasetcatalogus met kwaliteitslabels en lineage van wet tot dienst.',
    to: '/data',
    toText: 'Open de datasetcatalogus',
    code: `# Datasets met hun kwaliteitslabel (goud/zilver/brons)
bg data list --label goud
bg data show ds-toetsingsinkomen-2026

# Volg de herkomst en zie of de bron achterloopt
bg data lineage ds-toetsingsinkomen-2026
bg data refresh-log ds-vergunningen-historie   # loopt 60 dagen achter

# Publiceer als open data (open tenzij)
bg data publish ds-statline-demografie --open`,
  },
  {
    id: 'datacontract',
    title: 'bg datacontract',
    icon: 'pencil-on-square',
    lede: 'De afspraak tussen bron en afnemer: schema, SLA, doelbinding en bewaartermijn.',
    to: '/datacontracten',
    toText: 'Open de datacontracten',
    code: `bg datacontract list --status actief
bg datacontract show dc-inkomen-toeslagen
bg datacontract new --dataset ds-adressen-bag --consumer app-vergunningchecker \\
  --doelbinding "Adrescontrole" --sla 99.9% --bewaartermijn "10 jaar"`,
  },
  {
    id: 'algoritme',
    title: 'bg algoritme',
    icon: 'sparkles',
    lede: 'Het algoritmeregister: AI in productie met impact- en discriminatietoets.',
    to: '/algoritmes',
    toText: 'Open het algoritmeregister',
    code: `bg algoritme list --type llm
bg algoritme show alg-toeslagen-risico
bg algoritme register "Risico-indicatie" --app app-toeslagen \\
  --type ml --human-in-the-loop --impacttoets uitgevoerd`,
  },
  {
    id: 'privacy',
    title: 'bg verwerking',
    icon: 'lock-closed',
    lede: 'Het verwerkingenregister (AVG art. 30) en de DPIA-status per verwerking.',
    to: '/verwerkingen',
    toText: 'Open het verwerkingenregister',
    code: `bg verwerking list --dpia vereist
bg verwerking show vwk-toeslagen-vaststelling
bg verwerking dpia start vwk-vergunningverlening`,
  },
  {
    id: 'dns',
    title: 'bg dns',
    icon: 'globe',
    lede: 'Domeinen en DNS: records beheren, DNSSEC aanzetten, internet.nl-score zien.',
    to: '/dns',
    toText: 'Open Domeinen & DNS',
    code: `# Domein registreren en records beheren
bg dns add nieuwedienst.overheid.nl --app app-omgevingsloket
bg dns record add dom-toeslagen --type A --name @ --value 145.21.0.10
bg dns record list dom-toeslagen

# DNSSEC aanzetten en valideren
bg dns dnssec enable dom-studie
bg dns verify dom-toeslagen          # internet.nl-score`,
  },
  {
    id: 'cert',
    title: 'bg cert',
    icon: 'certificate',
    lede: 'PKIoverheid-certificaten als self-service, met automatische vernieuwing.',
    to: '/secrets/certificaten',
    toText: 'Open de certificaten',
    code: `# Certificaat aanvragen (CSR + TSP + installatie, in één commando)
bg cert request --cn *.nieuwedienst.overheid.nl \\
  --tsp KPN --oin 00000001823288444000 --auto-renew

bg cert list --ca pkioverheid --expiring 30
bg cert renew cert-2                  # nu vernieuwen
bg cert auto-renew on cert-verlopen-1`,
  },
  {
    id: 'artefact',
    title: 'bg artefact',
    icon: 'folder-stack',
    lede: 'Het artefactregister: images en packages met SBOM en provenance.',
    to: '/artefacten',
    toText: 'Open het artefactregister',
    code: `bg artefact list --signed
bg artefact verify art-toeslagenmotor-3.4.1   # handtekening en SLSA-niveau
bg sbom show art-toeslagenmotor-3.4.1          # CycloneDX, componenten en CVE's`,
  },
  {
    id: 'component',
    title: 'bg component',
    icon: 'puzzle-piece',
    lede: 'Common Ground: herbruikbare componenten overnemen in plaats van zelf bouwen.',
    to: '/componenten',
    toText: 'Open de componenten',
    code: `bg component search bsn
bg component show comp-brp-bevraging          # 22x hergebruikt
bg component add comp-nldd-formulier --team ${myTeam.value?.id || 'team-platform'}`,
  },
  {
    id: 'flag',
    title: 'bg flag',
    icon: 'flag',
    lede: 'Feature flags: geleidelijke uitrol, experimenten en kill-switches.',
    to: '/flags',
    toText: 'Open de feature flags',
    code: `bg flag list --app app-toeslagen
bg flag rollout nieuwe-inkomenstoets --percent 50
bg flag off killswitch-betalen        # noodschakelaar`,
  },
  {
    id: 'inloggen',
    title: 'bg login',
    icon: 'person-circle',
    lede: 'Inlogmethoden koppelen: DigiD, eHerkenning, eIDAS en machtigen.',
    to: '/inloggen',
    toText: 'Open de inlogmethoden',
    code: `bg login list
bg login show login-digid             # betrouwbaarheidsniveaus, gekoppelde diensten
bg login connect login-digid --app app-omgevingsloket --niveau Substantieel`,
  },
  {
    id: 'inkoop',
    title: 'bg inkoop',
    icon: 'tag',
    lede: 'Software- en SaaS-inkoop onder ARBIT/ARVODI, met lock-in en exit-strategie.',
    to: '/software-inkoop',
    toText: 'Open de software-inkoop',
    code: `bg inkoop list --lockin hoog
bg inkoop show sw-2026-002            # contract, exit-strategie
bg inkoop exit-plan sw-2026-004`,
  },
  {
    id: 'toegankelijkheid',
    title: 'bg toegankelijkheid',
    icon: 'eyeglasses',
    lede: 'Toegankelijkheidsverklaringen (DigiToegankelijk) met WCAG-status.',
    to: '/toegankelijkheid',
    toText: 'Open toegankelijkheid',
    code: `bg toegankelijkheid list --status "voldoet gedeeltelijk"
bg toegankelijkheid show tv-toeslagen
bg toegankelijkheid scan app-vergunningchecker   # WCAG 2.2 AA`,
  },
]);

// --- Quick reference: global flags ------------------------------------------
const globalFlags = [
  { flag: '--output json|table|yaml', desc: 'Machineleesbare uitvoer voor scripts en CI.' },
  { flag: '--team <id>', desc: 'Override het actieve team voor dit commando.' },
  { flag: '--dc <id>', desc: 'Kies het datacenter (standaard dc-denhaag).' },
  { flag: '--yes', desc: 'Sla de bevestiging over bij destructieve acties.' },
  { flag: '--profile <naam>', desc: 'Wissel tussen opgeslagen auth-profielen.' },
];

// --- Native commando's ------------------------------------------------------
// Geen losse tools om los te installeren of apart in te loggen: deze
// functionaliteit zit native in bg. Fleet-transformaties zijn `bg fleet`,
// FSC-tokens zijn `bg koppelvlak token` — zelfde binary, zelfde auth, zelfde
// config als al het andere.
const subTools = [
  {
    name: 'bg fleet',
    icon: 'folder-stack',
    desc: 'Fleet-shift, native in bg: één wijziging als PR over honderden repos tegelijk, met regex- of file-templates. Geen aparte tool nodig.',
    cmd: 'bg fleet run --campaign security-txt --dry-run',
  },
  {
    name: 'bg koppelvlak token',
    icon: 'shield-check-mark',
    desc: 'OIN-tokens voor FSC-koppelvlakken, native in bg en met dezelfde auth als de rest. Geen losse login, geen los te beheren credential.',
    cmd: 'bg koppelvlak token --oin 00000001823288444000 --service "Paspoort API"',
  },
];

const completionCmd = `# Shell-completion installeren
bg completion zsh > ~/.zsh/completions/_bg
bg completion bash | sudo tee /etc/bash_completion.d/bg

# Niet-interactief in CI (service-account token via env)
export BG_TOKEN=$RIJKSPLATFORM_TOKEN
bg infra list --output json --no-input | jq '.[] | .name'`;

const tab = ref('domeinen');

function copy(text) {
  navigator.clipboard?.writeText(text);
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="bg — de Begane Grond-CLI"
      lede="Alles in dit portaal kan ook vanaf de terminal. Eén binary, SSO Rijk-login met je Rijkspas, en een commando per platformlaag. Gemaakt om in scripts en CI te gebruiken."
      :crumbs="[
        { text: 'Home', href: '/' },
        { text: 'CLI & API', href: '/cli' },
      ]"
    >
      <template #actions>
        <nldd-button
          variant="secondary"
          text="API-explorer"
          start-icon="link"
          @click="router.push('/cli/api')"
        ></nldd-button>
        <nldd-button
          variant="primary"
          text="Installeer bg"
          start-icon="terminal"
          @click="copy('curl -fsSL https://cli.bg.rijks.app/install.sh | sh')"
        ></nldd-button>
      </template>
    </PageHeader>

    <!-- Install + auth ------------------------------------------------------ -->
    <nldd-container layout="grid" column-count="2" gap="16">
      <nldd-card accessible-label="Installatie">
        <nldd-container padding="20">
          <nldd-title size="4"><h2>1. Installeren</h2></nldd-title>
          <nldd-rich-text>
            <p>Eén binary zonder runtime-afhankelijkheden. Werkt op de autonome Linux-werkplek en op privé-laptops.</p>
          </nldd-rich-text>
          <nldd-spacer size="12" />
          <nldd-code-viewer language="bash">{{ installCmd }}</nldd-code-viewer>
        </nldd-container>
      </nldd-card>

      <nldd-card accessible-label="Authenticatie">
        <nldd-container padding="20">
          <div class="rp-auth-head">
            <nldd-title size="4"><h2>2. Inloggen</h2></nldd-title>
            <nldd-tag color="accent" size="md">SSO Rijk</nldd-tag>
          </div>
          <nldd-rich-text>
            <p>Geen wachtwoorden of langlevende tokens. <code>bg auth login</code> opent je browser en gebruikt de Rijkspas.</p>
          </nldd-rich-text>
          <nldd-spacer size="12" />
          <nldd-code-viewer language="bash">{{ authCmd }}</nldd-code-viewer>
        </nldd-container>
      </nldd-card>
    </nldd-container>

    <nldd-spacer size="32" />

    <!-- Command tree -------------------------------------------------------- -->
    <nldd-tab-bar>
      <nldd-tab-bar-item
        text="Commando's per domein"
        :selected="tab === 'domeinen'"
        @select="tab = 'domeinen'"
      ></nldd-tab-bar-item>
      <nldd-tab-bar-item
        text="Snelreferentie"
        :selected="tab === 'referentie'"
        @select="tab = 'referentie'"
      ></nldd-tab-bar-item>
    </nldd-tab-bar>
    <nldd-spacer size="20" />

    <template v-if="tab === 'domeinen'">
      <nldd-collection layout="grid" item-width="440px">
        <nldd-card v-for="g in groups" :key="g.id" :accessible-label="g.title">
          <nldd-container padding="20">
            <div class="rp-group-head">
              <nldd-icon :name="g.icon" aria-hidden="true" class="rp-group-icon"></nldd-icon>
              <div>
                <code class="rp-group-cmd">{{ g.title }}</code>
                <p class="rp-group-lede">{{ g.lede }}</p>
              </div>
            </div>
            <nldd-spacer size="12" />
            <nldd-code-viewer language="bash">{{ g.code }}</nldd-code-viewer>
            <nldd-spacer size="12" />
            <router-link :to="g.to" class="rp-group-link">
              <nldd-icon name="arrow-right" aria-hidden="true"></nldd-icon>
              <span>{{ g.toText }}</span>
            </router-link>
          </nldd-container>
        </nldd-card>
      </nldd-collection>
    </template>

    <template v-else>
      <nldd-container layout="grid" column-count="2" gap="16">
        <nldd-card accessible-label="Globale vlaggen">
          <nldd-container padding="20">
            <nldd-title size="4"><h2>Globale vlaggen</h2></nldd-title>
            <nldd-rich-text>
              <p>Deze vlaggen werken op elk <code>bg</code>-subcommando.</p>
            </nldd-rich-text>
            <nldd-spacer size="12" />
            <nldd-list>
              <nldd-list-item v-for="f in globalFlags" :key="f.flag">
                <nldd-title-cell :overline="f.flag" :text="f.desc"></nldd-title-cell>
              </nldd-list-item>
            </nldd-list>
          </nldd-container>
        </nldd-card>

        <nldd-card accessible-label="Shell-completion en CI">
          <nldd-container padding="20">
            <nldd-title size="4"><h2>Completion &amp; CI</h2></nldd-title>
            <nldd-rich-text>
              <p>Autocompletion voor je shell en een niet-interactieve modus voor pipelines.</p>
            </nldd-rich-text>
            <nldd-spacer size="12" />
            <nldd-code-viewer language="bash">{{ completionCmd }}</nldd-code-viewer>
          </nldd-container>
        </nldd-card>
      </nldd-container>
    </template>

    <nldd-spacer size="32" />

    <!-- Native commando's --------------------------------------------------- -->
    <nldd-title size="3"><h2>Alles native in <code>bg</code></h2></nldd-title>
    <nldd-rich-text>
      <p>Geen losse tools om apart te installeren of in te loggen. Functionaliteit die elders een eigen CLI zou zijn, zit hier gewoon als subcommando van <code>bg</code> — zelfde binary, zelfde auth, zelfde config.</p>
    </nldd-rich-text>
    <nldd-spacer size="16" />
    <nldd-collection layout="grid" item-width="420px">
      <nldd-card v-for="t in subTools" :key="t.name" :accessible-label="t.name">
        <nldd-container padding="20">
          <div class="rp-group-head">
            <nldd-icon :name="t.icon" aria-hidden="true" class="rp-group-icon"></nldd-icon>
            <div>
              <code class="rp-group-cmd">{{ t.name }}</code>
              <p class="rp-group-lede">{{ t.desc }}</p>
            </div>
          </div>
          <nldd-spacer size="12" />
          <nldd-code-viewer language="bash">{{ t.cmd }}</nldd-code-viewer>
        </nldd-container>
      </nldd-card>
    </nldd-collection>

    <nldd-spacer size="32" />

    <RelationLinks
      title="Verder klikken"
      :links="[
        { text: 'API-explorer (zelfde acties, als REST)', to: '/cli/api', icon: 'link' },
        { text: 'Infra-catalogus', to: '/infra/order/postgres', icon: 'rectangle-stack' },
        { text: 'Gebaand pad: nieuwe app', to: '/apps/nieuw', icon: 'plus' },
        { text: 'Piketrooster', to: '/teams/on-call', icon: 'heart' },
        { text: 'LLM-gateway', to: '/ai/llm', icon: 'sparkles' },
      ]"
    />

    <nldd-spacer size="24" />
    <CliHint
      command="bg auth login && bg infra list --output table"
      label="Begin hier — log in en bekijk je infrastructuur:"
    />
  </div>
</template>

<style scoped>
.rp-page {
  padding-bottom: 3rem;
}
.rp-auth-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}
.rp-group-head {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}
.rp-group-icon {
  width: 1.6rem;
  height: 1.6rem;
  flex-shrink: 0;
  opacity: 0.75;
  margin-top: 0.1rem;
}
.rp-group-cmd {
  font-size: 1.05rem;
  font-weight: 700;
  font-family: var(--font-mono, ui-monospace, monospace);
}
.rp-group-lede {
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
  opacity: 0.75;
  line-height: 1.4;
}
.rp-group-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  color: var(--semantics-actions-primary-default-background-color, #154273);
  font-size: 0.9rem;
  font-weight: 600;
}
.rp-group-link:hover {
  text-decoration: underline;
}
.rp-group-link nldd-icon {
  width: 1rem;
  height: 1rem;
}
code {
  font-family: var(--font-mono, ui-monospace, monospace);
}
</style>
