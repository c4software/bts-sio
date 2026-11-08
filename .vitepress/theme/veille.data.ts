// Instantané du fil de veille (voir ../veille.ts), récupéré au build et servi
// avec la page tp/veille/flux.md ; le bouton « Actualiser » de <VeilleReader />
// le remplace par la réponse de la fonction Netlify /api/veille.
import { fetchVeille, type VeilleData } from '../veille'

declare const data: VeilleData
export { data }

export default {
  async load(): Promise<VeilleData> {
    try {
      return await fetchVeille()
    } catch {
      // Hors ligne : la page reste utilisable, le bouton « Actualiser » prend le relais.
      return { generated: Date.now(), items: [], failed: [] }
    }
  },
}
