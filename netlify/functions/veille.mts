// Le fil de veille à jour, pour le bouton « Actualiser » de tp/veille/flux.md.
//
// Pas de risque de coût ni de relais ouvert :
// - aucun paramètre : la fonction ne lit que la liste blanche de ../../.vitepress/veille.ts ;
// - réponse gardée 30 minutes dans le cache partagé du CDN Netlify (durable) :
//   la fonction tourne au plus une fois par demi-heure, quel que soit le nombre de
//   visiteurs (moins de 1 500 appels par mois, pour 125 000 inclus dans l'offre gratuite).
import { fetchVeille } from '../../.vitepress/veille'

export default async (req: Request): Promise<Response> => {
  if (req.method !== 'GET') return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET' } })

  const data = await fetchVeille(6000)
  const ok = data.items.length > 0
  return new Response(JSON.stringify(data), {
    status: ok ? 200 : 502,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
      // En cas d'échec complet, on ne réessaie pas plus d'une fois toutes les 5 minutes.
      'Netlify-CDN-Cache-Control': ok
        ? 'public, durable, s-maxage=1800, stale-while-revalidate=86400'
        : 'public, durable, s-maxage=300',
    },
  })
}

export const config = { path: '/api/veille', method: 'GET' }
