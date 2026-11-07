<script setup lang="ts">
// Les 3 dernières pages créées ou modifiées (voir ../recent.data.ts), dans le
// style des cartes de l'accueil.
import { computed } from 'vue'
import VPFeatures from 'vitepress/dist/client/theme-default/components/VPFeatures.vue'
import { data as pages } from '../recent.data'

const features = computed(() =>
  pages.map((page) => ({
    title: page.title,
    details: page.description,
    link: page.link,
    linkText: 'Lire',
  })),
)
</script>

<template>
  <section v-if="features.length" class="recent-pages">
    <h2 class="recent-pages-title">Nouveautés</h2>
    <VPFeatures :features="features" />
  </section>
</template>

<style>
.recent-pages {
  margin-top: 48px;
}

.vp-doc .home-content .recent-pages-title {
  margin: 0 0 16px;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
}
</style>
