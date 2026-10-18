<template>
  <button
    v-if="available"
    class="chat-nav-button"
    type="button"
    title="Échanger sur la page (IA)"
    aria-label="Échanger sur la page (IA)"
    @click="toggle"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 14H5.17L4 17.17V4h16zm-8.5-2l1.1-2.4L15 10.5l-2.4-1.1L11.5 7l-1.1 2.4L8 10.5l2.4 1.1z"/></svg>
  </button>
</template>

<script setup>
// Bouton de la barre du haut : ouvre le chat de public/reformulation/main.js
// (Gemini Nano intégré à Chrome, sinon Gemma 2 via WebLLM si le navigateur a WebGPU).
// Le chat vit dans ce script : on communique avec lui par des événements sur window.
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'

const available = ref(false)
const route = useRoute()

onMounted(async () => {
  if ('LanguageModel' in window) {
    const availability = await window.LanguageModel.availability({
      expectedInputs: [{ type: 'text', languages: ['fr'] }],
      expectedOutputs: [{ type: 'text', languages: ['fr'] }],
    })
    if (availability !== 'unavailable') {
      available.value = true
      return
    }
  }

  // Repli WebLLM : il faut une carte graphique accessible par WebGPU
  if ('gpu' in navigator) {
    available.value = !!(await navigator.gpu.requestAdapter().catch(() => null))
  }
})

// Nouvelle page : la conversation en cours ne correspond plus au contenu affiché
watch(() => route.path, () => {
  window.dispatchEvent(new CustomEvent('reformulation:page-change'))
})

function toggle() {
  window.dispatchEvent(new CustomEvent('reformulation:toggle-chat'))
}
</script>

<style scoped>
.chat-nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin-left: 8px;
  color: var(--vp-c-text-2);
  transition: color 0.25s;
}

.chat-nav-button:hover {
  color: var(--vp-c-text-1);
}
</style>
