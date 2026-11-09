<template>
  <!-- Résultat d'un essai. Convention commune à tous les labs : vert = l'action de l'élève
       aboutit (y compris une attaque réussie), rouge = elle échoue (attaque bloquée).
       ton 'warn' (orange) : à surveiller, par ex. une attaque ratée sur une page qui reste
       vulnérable ; ton 'info' (neutre) : comportement normal, ni réussite ni échec.
       verdict = { ok, texte, lignes?, ton? } ; les lignes s'affichent en liste. -->
  <div v-if="verdict" class="verdict" :class="verdict.ton || (verdict.ok ? 'ok' : 'ko')">
    <p>{{ verdict.texte }}</p>
    <ul v-if="verdict.lignes && verdict.lignes.length">
      <li v-for="(l, i) in verdict.lignes" :key="i" class="mono">{{ l }}</li>
    </ul>
  </div>
</template>

<script setup>
defineProps({ verdict: { type: Object, default: null } })
</script>
