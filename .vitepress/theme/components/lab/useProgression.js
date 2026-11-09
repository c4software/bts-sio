// Progression des épreuves d'un bac à sable, gardée dans le localStorage du
// navigateur (clé propre à chaque lab). Le stockage peut être indisponible
// (navigation privée, données bloquées) : on continue alors sans mémoire.
import { ref } from 'vue'

export function useProgression(cle) {
  const resolus = ref({})

  function charger() {
    try {
      const ids = JSON.parse(localStorage.getItem(cle) || '[]')
      if (Array.isArray(ids)) resolus.value = Object.fromEntries(ids.map((id) => [id, true]))
    } catch (e) {}
  }

  function marquer(id) {
    if (resolus.value[id]) return
    resolus.value = { ...resolus.value, [id]: true }
    try {
      localStorage.setItem(cle, JSON.stringify(Object.keys(resolus.value)))
    } catch (e) {}
  }

  function effacer() {
    resolus.value = {}
    try {
      localStorage.removeItem(cle)
    } catch (e) {}
  }

  return { resolus, charger, marquer, effacer }
}
