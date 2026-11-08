<script setup lang="ts">
// Les nouveautés : pages créées ou modifiées de manière importante (voir ../recent.ts), dans le
// style des cartes de l'accueil. Sur l'accueil : les 3 premières et un lien
// vers la page /nouveautes, qui les affiche toutes.
import { computed } from 'vue'
import VPFeatures from 'vitepress/dist/client/theme-default/components/VPFeatures.vue'
import { data } from '../recent.data'

const pages = data.pages

const props = withDefaults(defineProps<{ limit?: number; title?: string; more?: boolean }>(), {
  limit: 3,
  title: '',
  more: false,
})

const features = computed(() =>
  pages.slice(0, props.limit).map((page) => ({
    title: page.title,
    details: page.description,
    link: page.link,
    linkText: 'Lire',
  })),
)
</script>

<template>
  <section v-if="features.length" class="recent-pages">
    <h2 v-if="title" class="recent-pages-title">{{ title }}</h2>
    <VPFeatures :features="features" />
    <slot />
    <p v-if="more && pages.length > limit" class="recent-pages-more">
      <a href="/nouveautes.html">Voir plus de nouveautés →</a>
    </p>
  </section>
</template>

<style>
.home-content .recent-pages {
  margin-top: 48px;
}

.vp-doc .home-content .recent-pages-title {
  margin: 0 0 16px;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
}

/* Hors de l'accueil, les cartes gardent leur style malgré les règles markdown. */
.vp-doc .recent-pages .VPFeature,
.vp-doc .recent-pages .VPFeature:hover {
  color: inherit;
  text-decoration: none;
  font-weight: inherit;
}

.vp-doc .recent-pages .VPFeature .title {
  margin: 0;
  padding: 0;
  border-top: 0;
  font-size: 16px;
  line-height: 24px;
}

.vp-doc .recent-pages .VPFeature .details {
  margin: 0;
}

.vp-doc .recent-pages .VPFeature .link-text {
  color: var(--vp-c-brand-1);
}

.vp-doc .recent-pages .VPFeatures {
  padding: 0;
}

.vp-doc .recent-pages .VPFeatures .container {
  max-width: none;
}

.vp-doc .recent-pages-more {
  margin: 16px 0 0;
  text-align: right;
}

.vp-doc .home-content .recent-pages-more a {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.vp-doc .home-content .recent-pages-more a:hover {
  color: var(--vp-c-brand-2);
}
</style>

<style>
/* Accueil : des cartes plus basses, description sur deux lignes au plus. */
.home-content .recent-pages .VPFeature .box {
  padding: 16px 20px;
}

.home-content .recent-pages .VPFeature .details {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  padding-top: 4px;
  font-size: 13px;
  line-height: 20px;
}

.home-content .recent-pages .VPFeature .link-text {
  padding-top: 8px;
}
</style>
