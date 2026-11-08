<script setup lang="ts">
// Le fil de veille (tp/veille/flux.md) : les derniers articles des sources de la
// page Ressources. Instantané récupéré au build (../veille.data.ts) ; le bouton
// « Actualiser » demande la version à jour à la fonction Netlify /api/veille
// (mise en cache 30 minutes côté CDN). Voir ../../veille.ts.
import { computed, ref } from 'vue'
import { data as snapshot } from '../veille.data'
import { SOURCES, type VeilleData } from '../../veille'

const PAGE = 30
const CATEGORIES = ['Toutes', 'Généralistes', 'Développement', 'Newsletters'] as const

const feed = ref<VeilleData>(snapshot)
const category = ref<(typeof CATEGORIES)[number]>('Toutes')
const source = ref('')
const search = ref('')
const shown = ref(PAGE)
const loading = ref(false)
const error = ref('')

const byId = new Map(SOURCES.map((s) => [s.id, s]))

const sources = computed(() =>
  SOURCES.filter((s) => category.value === 'Toutes' || s.category === category.value),
)

const normalize = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const filtered = computed(() => {
  const q = normalize(search.value.trim())
  return feed.value.items.filter((item) => {
    const s = byId.get(item.source)
    if (!s) return false
    if (category.value !== 'Toutes' && s.category !== category.value) return false
    if (source.value && item.source !== source.value) return false
    return !q || normalize(item.title + ' ' + item.excerpt).includes(q)
  })
})

// Sans source choisie, on alterne les sources (le plus récent de chacune, puis
// le deuxième, etc.) : sinon un site qui publie dix articles à la minute
// occuperait toute la première page.
const ordered = computed(() => {
  if (source.value) return filtered.value
  const rank = new Map<string, number>()
  return filtered.value
    .map((item) => {
      const r = rank.get(item.source) ?? 0
      rank.set(item.source, r + 1)
      return { item, r }
    })
    .sort((a, b) => a.r - b.r || b.item.date - a.item.date)
    .map(({ item }) => item)
})

const visible = computed(() => ordered.value.slice(0, shown.value))

const failedNames = computed(() =>
  feed.value.failed.map((id) => byId.get(id)?.name).filter(Boolean).join(', '),
)

// Dates absolues, à l'heure de Paris : identiques au build et dans le navigateur.
const dateFormat = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris',
})
const formatDate = (ms: number) => (ms ? dateFormat.format(ms) : '')

function selectCategory(c: (typeof CATEGORIES)[number]) {
  category.value = c
  if (source.value && !sources.value.some((s) => s.id === source.value)) source.value = ''
  shown.value = PAGE
}

async function refresh() {
  loading.value = true
  error.value = ''
  try {
    const res = await fetch('/api/veille', { headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const fresh = (await res.json()) as VeilleData
    if (!Array.isArray(fresh.items) || !fresh.items.length) throw new Error('réponse vide')
    feed.value = fresh
    shown.value = PAGE
  } catch {
    error.value = "Impossible d'actualiser pour le moment : voici la dernière version disponible."
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="veille">
    <div class="veille-status">
      <span>Articles récupérés le {{ formatDate(feed.generated) }}.</span>
      <button type="button" class="veille-refresh" :disabled="loading" @click="refresh">
        {{ loading ? 'Actualisation…' : 'Actualiser' }}
      </button>
    </div>
    <p v-if="error" class="veille-error">{{ error }}</p>
    <p v-if="failedNames" class="veille-failed">Sans réponse lors de la dernière récupération : {{ failedNames }}.</p>

    <div class="veille-filters">
      <div class="veille-categories" role="group" aria-label="Catégorie">
        <button
          v-for="c in CATEGORIES"
          :key="c"
          type="button"
          :class="{ active: category === c }"
          :aria-pressed="category === c"
          @click="selectCategory(c)"
        >{{ c }}</button>
      </div>
      <div class="veille-fields">
        <select v-model="source" aria-label="Source" @change="shown = PAGE">
          <option value="">Toutes les sources</option>
          <option v-for="s in sources" :key="s.id" :value="s.id">{{ s.name }}</option>
        </select>
        <input v-model="search" type="search" placeholder="Rechercher (titre, extrait)…" aria-label="Rechercher" @input="shown = PAGE" />
      </div>
    </div>

    <p v-if="!feed.items.length" class="veille-empty">
      Aucun article pour le moment : cliquez sur « Actualiser ».
    </p>
    <p v-else-if="!filtered.length" class="veille-empty">Aucun article ne correspond à votre recherche.</p>

    <ul class="veille-list">
      <li v-for="item in visible" :key="item.link" class="veille-item">
        <a :href="item.link" target="_blank" rel="noopener noreferrer" class="veille-title">{{ item.title }}</a>
        <div class="veille-meta">
          <a :href="byId.get(item.source)?.site" target="_blank" rel="noopener noreferrer">{{ byId.get(item.source)?.name }}</a>
          <span v-if="item.date"> · {{ formatDate(item.date) }}</span>
        </div>
        <p v-if="item.excerpt" class="veille-excerpt">{{ item.excerpt }}</p>
      </li>
    </ul>

    <button v-if="filtered.length > shown" type="button" class="veille-more" @click="shown += PAGE">
      Afficher plus d'articles ({{ filtered.length - shown }} restants)
    </button>
  </div>
</template>

<style>
.veille {
  margin-top: 24px;
}

.veille-status {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 16px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.veille button {
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  padding: 4px 14px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, color 0.25s;
}

.veille button:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.veille button:disabled {
  opacity: 0.6;
  cursor: wait;
}

.veille .veille-refresh {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.vp-doc .veille-error,
.vp-doc .veille-failed,
.vp-doc .veille-empty {
  margin: 8px 0 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.vp-doc .veille-error {
  color: var(--vp-c-warning-1);
}

.veille-filters {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 20px 0 8px;
}

.veille-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.veille .veille-categories button.active {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  background-color: var(--vp-c-brand-1);
}

.veille-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.veille-fields select,
.veille-fields input {
  flex: 1 1 220px;
  min-width: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 14px;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg);
}

.veille-fields select:focus,
.veille-fields input:focus {
  border-color: var(--vp-c-brand-1);
  outline: none;
}

.vp-doc ul.veille-list {
  list-style: none;
  margin: 8px 0 0;
  padding: 0;
}

.vp-doc .veille-item {
  margin: 0;
  padding: 14px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.vp-doc .veille-item + .veille-item {
  margin-top: 0;
}

.vp-doc a.veille-title {
  font-weight: 600;
  line-height: 24px;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.vp-doc a.veille-title:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}

.veille-meta {
  margin-top: 2px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.vp-doc .veille-meta a {
  color: var(--vp-c-text-2);
  font-weight: 500;
  text-decoration: none;
}

.vp-doc .veille-meta a:hover {
  color: var(--vp-c-brand-1);
}

.vp-doc .veille-excerpt {
  margin: 6px 0 0;
  font-size: 14px;
  line-height: 22px;
  color: var(--vp-c-text-2);
}

.veille .veille-more {
  display: block;
  margin: 20px auto 0;
}
</style>
