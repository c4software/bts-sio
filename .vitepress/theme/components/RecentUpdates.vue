<script setup lang="ts">
// Les pages retouchées récemment (correction, précision, image ajoutée), qui
// ne sont pas des nouveautés (voir ../../recent.ts).
// - mode « ticker » (accueil) : une seule ligne, qui passe d'une page à la
//   suivante toutes les 4 secondes ; pause au survol ou au focus, et aucune
//   animation si le système demande de réduire les animations ;
// - mode « list » (page /nouveautes) : la liste complète.
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { data } from '../recent.data'

const props = withDefaults(defineProps<{ mode?: 'ticker' | 'list'; title?: string }>(), {
  mode: 'ticker',
  title: 'Mis à jour récemment',
})

const updates = data.updates
const index = ref(0)
const paused = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  if (props.mode !== 'ticker' || updates.length < 2) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => {
    if (!paused.value && !document.hidden) index.value = (index.value + 1) % updates.length
  }, 4000)
})

onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div
    v-if="updates.length && mode === 'ticker'"
    class="recent-updates-ticker"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
    @focusin="paused = true"
    @focusout="paused = false"
  >
    <span class="recent-updates-label">{{ title }}</span>
    <span class="recent-updates-window" aria-live="off">
      <Transition name="recent-updates-slide" mode="out-in">
        <a :key="updates[index].link" :href="updates[index].link" class="recent-updates-link">
          {{ updates[index].title }}
        </a>
      </Transition>
    </span>
    <a href="/nouveautes.html#autres-mises-a-jour" class="recent-updates-all">Tout voir</a>
  </div>

  <ul v-else-if="updates.length" class="recent-updates-list">
    <li v-for="page in updates" :key="page.link">
      <a :href="page.link">{{ page.title }}</a>
      <span v-if="page.description" class="recent-updates-description"> : {{ page.description }}</span>
    </li>
  </ul>
</template>

<style>
.recent-updates-ticker {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  padding: 12px 20px;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  font-size: 14px;
  line-height: 24px;
}

.recent-updates-label {
  flex-shrink: 0;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.recent-updates-window {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.vp-doc .home-content a.recent-updates-link,
.recent-updates-link {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--vp-c-text-2);
}

.vp-doc .home-content a.recent-updates-link:hover {
  color: var(--vp-c-brand-1);
}

.vp-doc .home-content a.recent-updates-all,
.recent-updates-all {
  flex-shrink: 0;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}

.vp-doc .home-content a.recent-updates-all:hover {
  color: var(--vp-c-brand-2);
}

.recent-updates-slide-enter-active,
.recent-updates-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.recent-updates-slide-enter-from {
  opacity: 0;
  transform: translateY(60%);
}

.recent-updates-slide-leave-to {
  opacity: 0;
  transform: translateY(-60%);
}

@media (max-width: 640px) {
  .recent-updates-ticker {
    flex-wrap: wrap;
    gap: 4px 12px;
  }

  .recent-updates-window {
    order: 3;
    flex-basis: 100%;
  }

  .recent-updates-all {
    margin-left: auto;
  }
}

.recent-updates-description {
  color: var(--vp-c-text-2);
}
</style>
