<template>
  <!-- Ce que le serveur produit réellement (HTML, requête SQL…) à partir de la saisie. -->
  <div v-if="code" class="requete">
    <span class="requete-label">{{ label }}</span>
    <pre>{{ code }}</pre>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  code: { type: String, default: '' },
})
</script>
