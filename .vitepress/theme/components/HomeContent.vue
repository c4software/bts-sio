<script setup lang="ts">
// Rend le hero + les features de la page d'accueil (frontmatter `hero:` / `features:`)
// tout en restant sur le layout `doc`, afin de conserver le menu latéral.
import VPHomeHero from 'vitepress/dist/client/theme-default/components/VPHomeHero.vue'
import VPHomeFeatures from 'vitepress/dist/client/theme-default/components/VPHomeFeatures.vue'
</script>

<template>
  <div class="VPHome home-content">
    <VPHomeHero />
    <VPHomeFeatures />
  </div>
</template>

<style>
/* La page d'accueil garde le layout `doc` : on élargit le conteneur. */
.home-doc .content-container {
  max-width: 1152px;
}

/* Le hero est prévu pour se glisser sous la navbar : on annule ce décalage. */
.home-content .VPHero {
  margin-top: 0;
  padding: 0 0 32px;
}

.home-content .VPFeatures {
  padding: 0;
}

.home-content .VPHero .container,
.home-content .VPFeatures .container {
  max-width: none;
}

/* Neutralise les styles markdown (.vp-doc) sur les composants du thème. */
.vp-doc .home-content h1,
.vp-doc .home-content h2 {
  margin: 0;
  padding: 0;
  border-top: 0;
  letter-spacing: inherit;
}

.vp-doc .home-content p {
  margin: 0;
}

.vp-doc .home-content a {
  font-weight: inherit;
  color: inherit;
  text-decoration: none;
}

.vp-doc .home-content a:hover {
  color: inherit;
}
</style>
