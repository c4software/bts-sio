// Le fil de veille à jour, pour la page tp/veille/flux.md (chargement et bouton « Actualiser »).
//
// Pas de relais ouvert, pas de risque de coût :
// - aucun paramètre : la fonction ne lit que la liste blanche de ../../.vitepress/veille.ts ;
// - seules les pages du site peuvent l'appeler : un navigateur sur une autre origine, ou un
//   client qui ne se présente pas comme une page du site, reçoit un 403 (voir allowed()) ;
// - cache côté serveur (Netlify Blobs) : les flux ne sont relus qu'une fois toutes les
//   5 heures au plus, même si quelqu'un contourne le cache du CDN ;
// - cache du CDN (durable) devant, 5 heures aussi : la plupart des visites ne lancent même
//   pas la fonction. Sa clé ignore les paramètres de l'adresse et tient compte des en-têtes
//   contrôlés, pour qu'un 403 ne soit jamais servi à une page du site, ni une réponse à un
//   autre client.
// Limite assumée : des en-têtes se falsifient (curl). Celui qui le fait obtient la même
// réponse en cache que tout le monde, sans pouvoir provoquer plus d'une lecture des flux
// toutes les 5 heures.
import { getStore } from '@netlify/blobs'
import { fetchVeille, type VeilleData } from '../../.vitepress/veille'

const TTL_S = 5 * 60 * 60
const SITE_HOSTS = ['cours.brosseau.ovh']

interface Context {
  site?: { url?: string }
}

// Une page du site : le navigateur annonce une requête de même origine (Sec-Fetch-Site),
// ou, pour les navigateurs qui n'envoient pas cet en-tête, la page d'origine (Referer) est
// sur le site.
function allowed(req: Request, context?: Context): boolean {
  const fetchSite = req.headers.get('sec-fetch-site')
  if (fetchSite) return fetchSite === 'same-origin'
  const hosts = new Set(SITE_HOSTS)
  if (context?.site?.url) hosts.add(new URL(context.site.url).host)
  const from = req.headers.get('referer') ?? req.headers.get('origin')
  if (!from) return false
  try {
    return hosts.has(new URL(from).host)
  } catch {
    return false
  }
}

const CDN_VARY = 'query=v,header=Sec-Fetch-Site|Referer'

function json(data: VeilleData, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'private, max-age=300',
      'Netlify-Vary': CDN_VARY,
      'Netlify-CDN-Cache-Control':
        status === 200 ? `public, durable, s-maxage=${TTL_S}, stale-while-revalidate=86400` : 'public, durable, s-maxage=300',
    },
  })
}

// Le cache côté serveur : indisponible hors de Netlify (tests en local), on s'en passe.
async function readCache(): Promise<VeilleData | null> {
  try {
    return (await getStore('veille').get('latest', { type: 'json' })) as VeilleData | null
  } catch {
    return null
  }
}

async function writeCache(data: VeilleData): Promise<void> {
  try {
    await getStore('veille').setJSON('latest', data)
  } catch {
    // Pas de cache : la prochaine demande relira les flux.
  }
}

export default async (req: Request, context?: Context): Promise<Response> => {
  if (req.method !== 'GET') return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET' } })

  if (!allowed(req, context)) {
    return new Response('Forbidden', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
        'Netlify-Vary': CDN_VARY,
        'Netlify-CDN-Cache-Control': 'public, durable, s-maxage=300',
      },
    })
  }

  const cached = await readCache()
  if (cached && Date.now() - cached.generated < TTL_S * 1000) return json(cached)

  const fresh = await fetchVeille(6000)
  if (fresh.items.length) {
    await writeCache(fresh)
    return json(fresh)
  }
  // Toutes les sources muettes : la dernière version connue plutôt que rien.
  return cached ? json(cached) : json(fresh, 502)
}

export const config = { path: '/api/veille', method: 'GET' }
