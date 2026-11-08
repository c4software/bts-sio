<script setup lang="ts">
// Rend le hero + les features de la page d'accueil (frontmatter `hero:` / `features:`)
// tout en restant sur le layout `doc`, afin de conserver le menu latéral.
import VPHomeHero from 'vitepress/dist/client/theme-default/components/VPHomeHero.vue'
import VPHomeFeatures from 'vitepress/dist/client/theme-default/components/VPHomeFeatures.vue'
import RecentPages from './RecentPages.vue'
import RecentUpdates from './RecentUpdates.vue'
</script>

<template>
  <div class="VPHome home-content">
    <VPHomeHero />
    <a class="home-start" href="/pages/categories/debuter.html">
      <span class="home-start-text">
        <strong>Vous débutez ? Commencez ici.</strong>
        Comment fonctionnent les supports, comment préparer votre poste, et quel parcours suivre, dans quel ordre.
      </span>
      <span class="home-start-link">Par où commencer →</span>
    </a>
    <VPHomeFeatures />
    <RecentPages title="Nouveautés" more>
      <RecentUpdates />
    </RecentPages>
    <a class="home-start home-start--soft" href="/tp/veille/flux.html">
      <span class="home-start-text">
        <strong>Le fil de veille</strong>
        Les derniers articles de Dev.to, Hacker News, Développez.com, Reddit et de la newsletter TLDR, réunis sur une
        seule page.
      </span>
      <span class="home-start-link">Lire la veille →</span>
    </a>
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

/* Encart « Vous débutez ? » entre le hero et les cartes. */
.home-content .home-start {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  padding: 20px 24px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 12px;
  background-color: var(--vp-c-brand-soft);
  transition: border-color 0.25s, background-color 0.25s;
}

.home-content .home-start:hover {
  background-color: var(--vp-c-bg-soft);
}

/* Variante discrète (fil de veille, sous les nouveautés). */
.home-content .home-start--soft {
  margin: 32px 0 0;
  border-color: var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
}

.home-content .home-start--soft:hover {
  border-color: var(--vp-c-brand-1);
}

.home-start-text {
  line-height: 24px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.home-start-text strong {
  display: block;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.home-start-link {
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .home-content .home-start {
    flex-direction: column;
    align-items: flex-start;
  }
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
