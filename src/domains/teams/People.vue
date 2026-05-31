<script setup>
// People directory: searchable list of everyone on the platform with avatar,
// role, organisation, team and Matrix handle. Cards click through to a profile.
import { computed, ref } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';

const store = usePlatformStore();
const query = ref('');
const orgFilter = ref('');

const rows = computed(() =>
  store.people
    .map((p) => ({
      ...p,
      teamName: store.teamById(p.team)?.name || '—',
      orgName: store.orgById(p.org)?.short || p.org,
      isOncall: store.oncall.some((o) => o.person === p.id),
    }))
    .filter((p) => {
      if (orgFilter.value && p.org !== orgFilter.value) return false;
      if (!query.value) return true;
      const q = query.value.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        p.teamName.toLowerCase().includes(q) ||
        p.matrix.toLowerCase().includes(q)
      );
    }),
);

function hueFor(id) {
  let h = 0;
  for (let i = 0; i < (id || '').length; i += 1) h = (h * 31 + id.charCodeAt(i)) % 360;
  return h;
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Mensen"
      lede="Iedereen die op het Rijksplatform werkt, met rol, organisatie en team."
      :crumbs="[{ text: 'Rijksplatform', href: '/' }, { text: 'Teams & mensen', href: '/teams' }, { text: 'Mensen', href: '/teams/mensen' }]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Teams" start-icon="person-2" @click="$router.push('/teams')" />
        <nldd-button variant="secondary" text="On-call" start-icon="clock" @click="$router.push('/teams/on-call')" />
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="3" gap="16">
      <MetricCard :value="store.people.length" label="Mensen" icon="person" />
      <MetricCard :value="store.teams.length" label="Teams" icon="person-2" to="/teams" />
      <MetricCard :value="store.organisations.length" label="Organisaties" icon="apartment-building" to="/teams/organisatie" />
    </nldd-container>

    <nldd-spacer size="20" />

    <div class="rp-filters">
      <nldd-search-field
        label="Zoek op naam, rol of team"
        placeholder="Zoeken…"
        @input="(e) => (query = e.target.value)"
      ></nldd-search-field>
      <nldd-dropdown label="Organisatie">
        <select @change="(e) => (orgFilter = e.target.value)">
          <option value="">Alle organisaties</option>
          <option v-for="o in store.organisations" :key="o.id" :value="o.id">{{ o.name }}</option>
        </select>
      </nldd-dropdown>
    </div>

    <nldd-spacer size="16" />

    <nldd-collection layout="grid" item-width="320px">
      <router-link
        v-for="p in rows"
        :key="p.id"
        :to="`/teams/mensen/${p.id}`"
        class="rp-person-link"
      >
        <nldd-card :accessible-label="p.name">
          <nldd-container padding="20">
            <div class="rp-person-head">
              <span
                class="rp-person-avatar"
                :style="{ background: `hsl(${hueFor(p.id)} 55% 88%)`, color: `hsl(${hueFor(p.id)} 55% 28%)` }"
              >{{ p.avatar }}</span>
              <div class="rp-person-id">
                <div class="rp-person-name">
                  {{ p.name }}
                  <nldd-tag v-if="p.isOncall" color="success" size="md">on-call</nldd-tag>
                </div>
                <div class="rp-person-role">{{ p.role }}</div>
              </div>
            </div>
            <nldd-spacer size="12" />
            <div class="rp-person-meta">
              <span class="rp-person-meta-row">
                <nldd-icon name="person-2" aria-hidden="true"></nldd-icon>{{ p.teamName }}
              </span>
              <span class="rp-person-meta-row">
                <nldd-icon name="apartment-building" aria-hidden="true"></nldd-icon>{{ p.orgName }}
              </span>
              <span class="rp-person-meta-row rp-mono">
                <nldd-icon name="envelope" aria-hidden="true"></nldd-icon>{{ p.matrix }}
              </span>
            </div>
          </nldd-container>
        </nldd-card>
      </router-link>
    </nldd-collection>

    <div v-if="!rows.length" class="rp-empty">
      <nldd-rich-text><p>Geen mensen gevonden voor deze filter.</p></nldd-rich-text>
    </div>
  </div>
</template>

<style scoped>
.rp-filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: flex-end;
}
.rp-filters nldd-search-field {
  flex: 1 1 260px;
}
.rp-person-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}
.rp-person-link nldd-card {
  height: 100%;
  display: block;
  transition: box-shadow 0.15s ease, transform 0.15s ease;
}
.rp-person-link:hover nldd-card {
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
.rp-person-head {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}
.rp-person-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}
.rp-person-name {
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}
.rp-person-role {
  opacity: 0.7;
  font-size: 0.85rem;
}
.rp-person-meta {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.85rem;
}
.rp-person-meta-row {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}
.rp-person-meta-row nldd-icon {
  width: 1rem;
  height: 1rem;
  opacity: 0.6;
}
.rp-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
.rp-empty {
  padding: 2rem;
  text-align: center;
  opacity: 0.7;
}
</style>
