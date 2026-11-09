<template>
  <!-- Choix de l'épreuve et progression (épreuves réussies). Le scénario et le
       formulaire propres à chaque lab se placent dans le slot. -->
  <div class="picker">
    <label>Épreuve :
      <select v-model="defiId" :disabled="disabled">
        <option v-for="(d, i) in defis" :key="d.id" :value="d.id">{{ i + 1 }}. {{ d.titre }}</option>
      </select>
    </label>
  </div>
  <div class="journal">
    <strong>Progression</strong>
    <span v-for="d in defis" :key="d.id" class="etape" :class="{ ok: resolus[d.id] }">
      {{ resolus[d.id] ? '✔ ' + d.titre : d.titre }}
    </span>
  </div>
  <div v-if="defi" class="brief">
    <p><strong>Scénario.</strong> {{ defi.scenario }}</p>
    <p class="objectif"><strong>Objectif :</strong> {{ defi.objectif }}</p>
    <slot :defi="defi" />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const defiId = defineModel({ type: String, required: true })
const props = defineProps({
  // [{ id, titre, scenario, objectif, … }]
  defis: { type: Array, required: true },
  resolus: { type: Object, required: true },
  disabled: { type: Boolean, default: false },
})
const defi = computed(() => props.defis.find((d) => d.id === defiId.value))
</script>
