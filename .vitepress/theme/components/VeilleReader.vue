<script setup lang="ts">
// Le fil de veille (tp/veille/flux.md) : les derniers articles des sources de la
// page Ressources (voir ../../veille.ts).
// - au build, un instantané (../veille.data.ts) est servi avec la page ;
// - à l'ouverture, la page demande la version à jour à la fonction Netlify
//   /api/veille (réponse gardée 30 minutes sur le CDN : pas de coût par visite) ;
//   en cas d'échec, l'instantané reste affiché, sans message ;
// - le bouton « Actualiser » refait la même demande, et prévient en cas d'échec.
// Deux modes de lecture sur mobile, comme dans FreshRSS Discover : la liste de
// cartes, et l'immersif (un article plein écran, le suivant d'un geste vers le
// haut). Sans illustration dans les flux, une page prend la teinte de sa source.
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { data as snapshot } from '../veille.data'
import { SOURCES, type VeilleData, type VeilleItem } from '../../veille'

const PAGE = 30

const feed = ref<VeilleData>(snapshot)
const source = ref('')
const search = ref('')
const shown = ref(PAGE)
const loading = ref(false)
const error = ref('')
// Faux pendant le rendu serveur et l'hydratation : les libellés relatifs
// (« Aujourd'hui », « Hier ») ne s'affichent qu'ensuite.
const mounted = ref(false)

const byId = new Map(SOURCES.map((s) => [s.id, s]))
const sources = SOURCES

const normalize = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const filtered = computed(() => {
  const q = normalize(search.value.trim())
  return feed.value.items.filter((item) => {
    const s = byId.get(item.source)
    if (!s) return false
    if (source.value && item.source !== source.value) return false
    return !q || normalize(item.title + ' ' + item.excerpt).includes(q)
  })
})

// Dates à l'heure de Paris : identiques au build et dans le navigateur.
const TZ = 'Europe/Paris'
const dayKey = new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: TZ })
const dayLabel = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: TZ })
const timeLabel = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: TZ })
const fullLabel = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: TZ })

function groupTitle(key: string, sample: number): string {
  if (!sample) return 'Sans date'
  if (mounted.value) {
    const today = dayKey.format(Date.now())
    const yesterday = dayKey.format(Date.now() - 86400000)
    if (key === today) return "Aujourd'hui"
    if (key === yesterday) return 'Hier'
  }
  const label = dayLabel.format(sample)
  return label.charAt(0).toUpperCase() + label.slice(1)
}

const when = (item: VeilleItem) =>
  item.date ? `${groupTitle(dayKey.format(item.date), item.date)}, ${timeLabel.format(item.date)}` : ''

// En vue d'ensemble (ni source ni recherche), au plus 3 articles par source et
// par jour : sinon un site qui publie dix articles à la minute occuperait tout
// l'écran. Les autres restent accessibles par le lien « Et aussi » du jour.
const PER_DAY = 3
const overview = computed(() => !source.value && !search.value.trim())

const capped = computed(() => {
  const list = filtered.value
  if (!overview.value) return { items: list, hidden: new Map<string, Map<string, number>>() }
  const seen = new Map<string, number>()
  const hidden = new Map<string, Map<string, number>>()
  const items: VeilleItem[] = []
  for (const item of list) {
    const day = item.date ? dayKey.format(item.date) : 'sans-date'
    const k = day + '|' + item.source
    const n = (seen.get(k) ?? 0) + 1
    seen.set(k, n)
    if (n <= PER_DAY) items.push(item)
    else {
      if (!hidden.has(day)) hidden.set(day, new Map())
      const h = hidden.get(day)!
      h.set(item.source, (h.get(item.source) ?? 0) + 1)
    }
  }
  return { items, hidden }
})

// Les articles par jour, du plus récent au plus ancien.
const groups = computed(() => {
  const days = new Map<string, VeilleItem[]>()
  for (const item of capped.value.items.slice(0, shown.value)) {
    const key = item.date ? dayKey.format(item.date) : 'sans-date'
    if (!days.has(key)) days.set(key, [])
    days.get(key)!.push(item)
  }
  return [...days.entries()].map(([key, items]) => ({
    key,
    title: groupTitle(key, items[0].date),
    items,
    more: [...(capped.value.hidden.get(key) ?? new Map<string, number>()).entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([id, count]) => ({ id, count, name: byId.get(id)?.name ?? id })),
  }))
})

function showSource(id: string) {
  source.value = id
  shown.value = PAGE
}

// Une teinte par source, tirée de son nom : une source garde sa couleur d'une
// visite à l'autre (même règle que FreshRSS Discover).
function hueOf(id: string): number {
  const name = byId.get(id)?.name ?? id
  let h = 7
  for (const c of name) h = (h * 31 + c.codePointAt(0)!) % 360
  return h
}
const initialOf = (id: string) => (byId.get(id)?.name ?? '?').replace(/^(le|la|les)\s+/i, '').charAt(0).toUpperCase()
const nameOf = (id: string) => byId.get(id)?.name ?? id

const failedNames = computed(() => feed.value.failed.map((id) => byId.get(id)?.name).filter(Boolean).join(', '))

async function load(silent: boolean) {
  loading.value = true
  if (!silent) error.value = ''
  try {
    const res = await fetch('/api/veille', { headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const fresh = (await res.json()) as VeilleData
    if (!Array.isArray(fresh.items) || !fresh.items.length) throw new Error('réponse vide')
    feed.value = fresh
    error.value = ''
  } catch {
    if (!silent) error.value = "Impossible d'actualiser pour le moment : voici la dernière version disponible."
  } finally {
    loading.value = false
  }
}

// Modes de lecture : sur mobile seulement, mémorisé dans le navigateur.
type Mode = 'liste' | 'immersif'
const MODE_KEY = 'veille-mode'
const mobile = ref(false)
const mode = ref<Mode>('liste')
const immersive = computed(() => mobile.value && mode.value === 'immersif')
const pager = ref<HTMLElement | null>(null)
const position = ref(0)
let media: MediaQueryList | undefined
const onMedia = (e: MediaQueryListEvent) => (mobile.value = e.matches)

function setMode(m: Mode) {
  mode.value = m
  try {
    localStorage.setItem(MODE_KEY, m)
  } catch {
    // Stockage indisponible (navigation privée) : le mode vaut pour cette visite.
  }
}

function onScroll() {
  const el = pager.value
  if (el) position.value = Math.round(el.scrollTop / Math.max(el.clientHeight, 1))
}

function onKey(e: KeyboardEvent) {
  if (immersive.value && e.key === 'Escape') setMode('liste')
}

watch(immersive, async (on) => {
  // La page de fond ne défile plus sous le mode immersif.
  document.documentElement.classList.toggle('veille-immersive-open', on)
  if (on) {
    position.value = 0
    await nextTick()
    pager.value?.scrollTo({ top: 0 })
    pager.value?.focus()
  }
})

onMounted(() => {
  mounted.value = true
  media = window.matchMedia('(max-width: 767px)')
  mobile.value = media.matches
  media.addEventListener('change', onMedia)
  try {
    if (localStorage.getItem(MODE_KEY) === 'immersif') mode.value = 'immersif'
  } catch {
    // Stockage indisponible : mode liste.
  }
  window.addEventListener('keydown', onKey)
  load(true)
})

onBeforeUnmount(() => {
  media?.removeEventListener('change', onMedia)
  window.removeEventListener('keydown', onKey)
  document.documentElement.classList.remove('veille-immersive-open')
})
</script>

<template>
  <div class="veille">
    <div class="veille-toolbar">
      <div class="veille-modes" role="group" aria-label="Mode de lecture">
        <button type="button" :class="{ active: mode === 'liste' }" :aria-pressed="mode === 'liste'" @click="setMode('liste')">Liste</button>
        <button type="button" :class="{ active: mode === 'immersif' }" :aria-pressed="mode === 'immersif'" @click="setMode('immersif')">Immersif</button>
      </div>
      <div class="veille-fields">
        <select v-model="source" aria-label="Source" @change="shown = PAGE">
          <option value="">Toutes les sources</option>
          <option v-for="s in sources" :key="s.id" :value="s.id">{{ s.name }}</option>
        </select>
        <input v-model="search" type="search" placeholder="Rechercher un mot-clé…" aria-label="Rechercher" @input="shown = PAGE" />
      </div>
      <div class="veille-status">
        <span>{{ loading ? 'Recherche des derniers articles…' : `Mis à jour le ${fullLabel.format(feed.generated)}` }}</span>
        <button type="button" class="veille-refresh" :disabled="loading" @click="load(false)">Actualiser</button>
      </div>
      <p v-if="error" class="veille-error">{{ error }}</p>
    </div>

    <p v-if="!feed.items.length" class="veille-empty">Aucun article pour le moment : cliquez sur « Actualiser ».</p>
    <p v-else-if="!filtered.length" class="veille-empty">Aucun article ne correspond à votre recherche.</p>

    <section v-for="group in groups" :key="group.key" class="veille-day">
      <h3 class="veille-day-title">{{ group.title }}</h3>
      <a
        v-for="item in group.items"
        :key="item.link"
        :href="item.link"
        target="_blank"
        rel="noopener noreferrer"
        class="veille-card"
        :style="{ '--hue': hueOf(item.source) }"
      >
        <span class="veille-meta">
          <span class="veille-source">{{ nameOf(item.source) }}</span>
          <time v-if="item.date" :datetime="new Date(item.date).toISOString()">{{ timeLabel.format(item.date) }}</time>
        </span>
        <span class="veille-title">{{ item.title }}</span>
        <span v-if="item.excerpt" class="veille-excerpt">{{ item.excerpt }}</span>
      </a>
      <p v-if="group.more.length" class="veille-also">
        Et aussi, d'autres articles du jour :
        <template v-for="(m, i) in group.more" :key="m.id">
          <button type="button" class="veille-also-link" @click="showSource(m.id)">{{ m.name }} ({{ m.count }})</button><span v-if="i < group.more.length - 1">, </span>
        </template>
      </p>
    </section>

    <button v-if="capped.items.length > shown" type="button" class="veille-more" @click="shown += PAGE">
      Afficher plus d'articles ({{ capped.items.length - shown }} restants)
    </button>

    <p v-if="failedNames && !loading" class="veille-failed">Sans réponse lors de la dernière récupération : {{ failedNames }}.</p>

    <Teleport to="body">
      <div v-if="immersive" class="veille-immersive" role="dialog" aria-modal="true" aria-label="Fil de veille, lecture immersive">
        <div class="veille-imm-bar">
          <button type="button" class="veille-imm-close" @click="setMode('liste')">← Liste</button>
          <span v-if="capped.items.length" class="veille-imm-count">{{ Math.min(position + 1, capped.items.length) }} / {{ capped.items.length }}</span>
        </div>
        <div ref="pager" class="veille-imm-pager" tabindex="-1" @scroll.passive="onScroll">
          <section
            v-for="(item, i) in capped.items"
            :key="item.link"
            class="veille-imm-page"
            :style="{ '--hue': hueOf(item.source) }"
          >
            <span class="veille-imm-initial" aria-hidden="true">{{ initialOf(item.source) }}</span>
            <div class="veille-imm-text">
              <span class="veille-imm-meta">
                <span class="veille-source">{{ nameOf(item.source) }}</span>
                <span v-if="item.date">{{ when(item) }}</span>
              </span>
              <h2 class="veille-imm-title">{{ item.title }}</h2>
              <p v-if="item.excerpt" class="veille-imm-excerpt">{{ item.excerpt }}</p>
              <a :href="item.link" target="_blank" rel="noopener noreferrer" class="veille-imm-open">Lire l'article →</a>
              <span v-if="i === 0" class="veille-imm-hint">Glissez vers le haut pour l'article suivant</span>
            </div>
          </section>
          <section class="veille-imm-page veille-imm-end">
            <div class="veille-imm-text">
              <h2 class="veille-imm-title">Vous êtes à jour 🎉</h2>
              <p class="veille-imm-excerpt">C'est tout pour cette sélection. Revenez dans quelques jours, ou changez de source dans la liste.</p>
              <button type="button" class="veille-imm-open" @click="setMode('liste')">Revenir à la liste</button>
            </div>
          </section>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style>
.veille {
  max-width: 760px;
  margin-top: 24px;
}

/* Barre d'outils : reste visible pendant le défilement. */
.veille-toolbar {
  position: sticky;
  top: calc(var(--vp-nav-height) + 8px);
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 8px;
  padding: 14px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg);
  /* Masque le texte qui défile entre la barre de navigation et la barre d'outils. */
  box-shadow: 0 -9px 0 var(--vp-c-bg);
}

@media (max-width: 959px) {
  .veille-toolbar {
    position: static;
  }
}

.veille button {
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  padding: 3px 12px;
  font-size: 13px;
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

/* Choix du mode de lecture : sur mobile seulement. */
.veille-modes {
  display: none;
  gap: 6px;
}

@media (max-width: 767px) {
  .veille-modes {
    display: flex;
  }
}

.veille .veille-modes button {
  flex: 1;
  padding: 6px 12px;
  font-size: 14px;
}

.veille .veille-modes button.active {
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
  flex: 1 1 200px;
  min-width: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 14px;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg);
}

.veille-fields select:focus,
.veille-fields input:focus {
  border-color: var(--vp-c-brand-1);
  outline: none;
}

.veille-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.vp-doc .veille-error,
.vp-doc .veille-empty,
.vp-doc .veille-failed {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.vp-doc .veille-error {
  color: var(--vp-c-warning-1);
}

.vp-doc .veille-empty {
  margin: 24px 0;
  font-size: 15px;
}

.vp-doc .veille-failed {
  margin-top: 24px;
}

.vp-doc .veille-day-title {
  margin: 32px 0 8px;
  padding: 0;
  border: 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

/* Une carte par article, cliquable en entier. */
.vp-doc a.veille-card {
  display: block;
  margin: 0 0 10px;
  padding: 14px 16px;
  border: 1px solid transparent;
  border-radius: 12px;
  color: inherit;
  font-weight: inherit;
  text-decoration: none;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s;
}

.vp-doc a.veille-card:hover {
  border-color: var(--vp-c-brand-1);
}

.veille-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

/* L'étiquette de la source, à sa teinte. */
.veille-source {
  border-radius: 6px;
  padding: 1px 8px;
  font-size: 12px;
  font-weight: 600;
  color: hsl(var(--hue, 220) 55% 32%);
  background-color: hsl(var(--hue, 220) 70% 92%);
}

.dark .veille-source {
  color: hsl(var(--hue, 220) 70% 78%);
  background-color: hsl(var(--hue, 220) 35% 22%);
}

.veille-card .veille-title {
  display: block;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: var(--vp-c-text-1);
}

.vp-doc a.veille-card:hover .veille-title {
  color: var(--vp-c-brand-1);
}

.veille-card .veille-excerpt {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  margin-top: 4px;
  font-size: 14px;
  line-height: 22px;
  color: var(--vp-c-text-2);
}

.vp-doc .veille-also {
  margin: 4px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.veille .veille-also-link {
  border: 0;
  border-radius: 0;
  padding: 0;
  font-size: 13px;
  color: var(--vp-c-brand-1);
  background: none;
}

.veille .veille-also-link:hover:not(:disabled) {
  text-decoration: underline;
}

.veille .veille-more {
  display: block;
  margin: 24px auto 0;
  padding: 6px 16px;
  font-size: 14px;
}

/* Mode immersif : un article plein écran, le suivant d'un geste vers le haut. */
html.veille-immersive-open,
html.veille-immersive-open body {
  overflow: hidden;
}

.veille-immersive {
  position: fixed;
  inset: 0;
  z-index: 200;
  background-color: var(--vp-c-bg);
}

.veille-imm-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: max(12px, env(safe-area-inset-top)) 16px 12px;
  pointer-events: none;
}

.veille-imm-bar > * {
  pointer-events: auto;
}

.veille-imm-close {
  border: 0;
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  background-color: color-mix(in srgb, var(--vp-c-bg) 75%, transparent);
  backdrop-filter: blur(6px);
}

.veille-imm-count {
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-2);
  background-color: color-mix(in srgb, var(--vp-c-bg) 75%, transparent);
}

.veille-imm-pager {
  height: 100%;
  overflow-y: auto;
  overscroll-behavior: contain;
  scroll-snap-type: y mandatory;
  outline: none;
}

.veille-imm-page {
  position: relative;
  display: flex;
  align-items: flex-end;
  height: 100%;
  overflow: hidden;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  /* La teinte de la source, en dégradé (pas d'illustration dans les flux). */
  background: linear-gradient(170deg, hsl(var(--hue, 220) 60% 90%), hsl(var(--hue, 220) 55% 80%));
}

.dark .veille-imm-page {
  background: linear-gradient(170deg, hsl(var(--hue, 220) 40% 24%), hsl(var(--hue, 220) 45% 12%));
}

.veille-imm-end {
  background: var(--vp-c-bg-soft);
}

.dark .veille-imm-end {
  background: var(--vp-c-bg-soft);
}

/* L'initiale de la source, en filigrane. */
.veille-imm-initial {
  position: absolute;
  top: 12%;
  right: -4%;
  font-size: 58vh;
  font-weight: 800;
  line-height: 1;
  color: hsl(var(--hue, 220) 50% 50% / 0.14);
  user-select: none;
}

.veille-imm-text {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 24px 22px max(28px, env(safe-area-inset-bottom));
}

.veille-imm-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.veille-imm-title {
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.25;
  color: var(--vp-c-text-1);
}

.veille-imm-excerpt {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 7;
  line-clamp: 7;
  overflow: hidden;
  margin: 0;
  font-size: 16px;
  line-height: 1.55;
  color: var(--vp-c-text-1);
  opacity: 0.85;
}

a.veille-imm-open,
button.veille-imm-open {
  align-self: flex-start;
  margin-top: 4px;
  border: 0;
  border-radius: 24px;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-white);
  text-decoration: none;
  background-color: var(--vp-c-brand-1);
}

.veille-imm-hint {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
