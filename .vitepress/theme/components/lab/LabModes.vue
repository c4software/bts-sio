<template>
  <!-- Bascule entre la version vulnérable et la version corrigée d'un exercice. -->
  <div class="mode">
    <label v-for="o in options" :key="o.value">
      <input type="radio" :value="o.value" v-model="mode" :disabled="disabled" /> {{ o.label }}
    </label>
  </div>
</template>

<script setup>
const mode = defineModel({ type: String, required: true })
defineProps({
  // [{ value: 'vulnerable', label: 'Version vulnérable' }, …]
  options: { type: Array, required: true },
  disabled: { type: Boolean, default: false },
})
</script>
