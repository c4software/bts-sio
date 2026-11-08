// Le fil de veille : les flux RSS / Atom des sources de tp/veille/ressources.md,
// lus côté serveur (la plupart de ces sites refusent la lecture depuis un autre
// site, CORS). Partagé entre :
// - le build (theme/veille.data.ts) : un instantané servi avec la page ;
// - la fonction Netlify netlify/functions/veille.mts : le bouton « Actualiser ».
// Aucune dépendance : un lecteur RSS 2.0 / Atom volontairement simple.

export interface VeilleSource {
  id: string
  name: string
  site: string
  feed: string
  category: 'Développement' | 'Newsletters'
}

export interface VeilleItem {
  source: string
  title: string
  link: string
  // Date de publication en millisecondes (0 si absente).
  date: number
  excerpt: string
}

export interface VeilleData {
  // Date de la récupération, en millisecondes.
  generated: number
  items: VeilleItem[]
  // Identifiants des sources qui n'ont pas répondu.
  failed: string[]
}

// La liste blanche : la fonction Netlify ne lit que ces adresses. Toujours le flux
// RSS public et ouvert de la source, à son adresse finale (sans redirection).
// Hacker News passe par hnrss.org : news.ycombinator.com/rss refuse les
// serveurs des hébergeurs (la fonction Netlify n'obtenait aucune réponse).
export const SOURCES: VeilleSource[] = [
  { id: 'devto', name: 'Dev.to', site: 'https://dev.to/', feed: 'https://dev.to/feed', category: 'Développement' },
  { id: 'reddit-webdev', name: 'Reddit /r/webdev', site: 'https://www.reddit.com/r/webdev/', feed: 'https://www.reddit.com/r/webdev/.rss', category: 'Développement' },
  { id: 'hn', name: 'Hacker News', site: 'https://news.ycombinator.com/', feed: 'https://hnrss.org/frontpage', category: 'Développement' },
  { id: 'developpez', name: 'Développez.com', site: 'https://www.developpez.com/', feed: 'https://www.developpez.com/index/rss', category: 'Développement' },
  { id: 'jdn-dev', name: 'Le journal du développeur', site: 'https://www.journaldunet.com/web-tech/developpeur/', feed: 'https://www.journaldunet.com/developpeur/rss/', category: 'Développement' },
  { id: 'medium-webdev', name: 'Medium (web development)', site: 'https://medium.com/tag/web-development', feed: 'https://medium.com/feed/tag/web-development', category: 'Développement' },
  { id: 'tldr', name: 'TLDR', site: 'https://tldr.tech/', feed: 'https://tldr.tech/api/rss/tech', category: 'Newsletters' },
]

// Articles gardés par source, et taille maximale d'un extrait.
const PER_SOURCE = 10
const EXCERPT = 220

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }

function decode(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === '#') {
      const code = e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)
      return Number.isFinite(code) ? String.fromCodePoint(code) : m
    }
    return ENTITIES[e.toLowerCase()] ?? m
  })
}

// Contenu texte d'un élément : CDATA déballé, balises HTML retirées, entités décodées.
function text(raw: string | undefined): string {
  if (!raw) return ''
  const unwrapped = raw.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  // Les descriptions contiennent souvent du HTML échappé : on décode, puis on retire les balises.
  const html = decode(unwrapped)
  return decode(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim()
}

function tag(block: string, name: string): string | undefined {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i'))
  return m ? m[1] : undefined
}

function atomLink(block: string): string {
  const links = [...block.matchAll(/<link\b([^>]*)\/?>/gi)].map((m) => m[1])
  const pick = links.find((a) => /rel=["']alternate["']/i.test(a)) ?? links.find((a) => !/rel=/i.test(a)) ?? links[0]
  const href = pick?.match(/href=["']([^"']+)["']/i)
  return href ? decode(href[1]) : ''
}

function excerpt(s: string): string {
  return s.length > EXCERPT ? s.slice(0, EXCERPT).replace(/\s+\S*$/, '') + '…' : s
}

// Les articles d'un flux RSS 2.0 ou Atom, du plus récent au plus ancien.
export function parseFeed(xml: string, source: string): VeilleItem[] {
  const isAtom = /<feed\b[^>]*xmlns=["']http:\/\/www\.w3\.org\/2005\/Atom/i.test(xml) && !/<rss\b/i.test(xml)
  const blocks = [...xml.matchAll(isAtom ? /<entry\b[\s\S]*?<\/entry>/gi : /<item\b[\s\S]*?<\/item>/gi)].map((m) => m[0])
  const items: VeilleItem[] = []
  for (const b of blocks) {
    const title = text(tag(b, 'title'))
    const link = isAtom ? atomLink(b) : text(tag(b, 'link')) || text(tag(b, 'guid'))
    if (!title || !/^https?:\/\//.test(link)) continue
    const rawDate = text(tag(b, isAtom ? 'published' : 'pubDate')) || text(tag(b, 'updated')) || text(tag(b, 'dc:date'))
    const date = Date.parse(rawDate)
    const body = isAtom ? tag(b, 'summary') ?? tag(b, 'content') : tag(b, 'description')
    let summary = excerpt(text(body))
    // Hacker News : pas de résumé, mais les points et les commentaires.
    if (/^comments$/i.test(summary)) summary = ''
    const hn = summary.match(/^Article URL:.*?Points:\s*(\d+).*?# Comments:\s*(\d+)/)
    if (hn) summary = `${hn[1]} points, ${hn[2]} commentaires sur Hacker News`
    else if (/^Article URL:/.test(summary)) summary = ''
    summary = summary.replace(/\s*Continue reading on Medium »\s*$/i, '').trim()
    // Dev.to et d'autres recommencent l'extrait par le titre.
    if (summary.toLowerCase().startsWith(title.toLowerCase())) summary = summary.slice(title.length).trim()
    items.push({ source, title, link, date: Number.isFinite(date) ? date : 0, excerpt: summary })
  }
  // Un même article publié plusieurs fois (Medium) : on ne garde que le plus récent.
  const seen = new Set<string>()
  return items
    .sort((a, b) => b.date - a.date)
    .filter((item) => {
      const key = item.title.toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .slice(0, PER_SOURCE)
}

async function fetchSource(source: VeilleSource, timeoutMs: number): Promise<VeilleItem[]> {
  const res = await fetch(source.feed, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; cours-brosseau-veille/1.0; +https://cours.brosseau.ovh/tp/veille/flux.html)',
      Accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
    },
    signal: AbortSignal.timeout(timeoutMs),
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`${source.id}: HTTP ${res.status}`)
  const items = parseFeed(await res.text(), source.id)
  if (!items.length) throw new Error(`${source.id}: aucun article lu`)
  return items
}

// Toutes les sources en parallèle ; une source en panne est simplement ignorée.
export async function fetchVeille(timeoutMs = 8000): Promise<VeilleData> {
  const results = await Promise.allSettled(SOURCES.map((s) => fetchSource(s, timeoutMs)))
  const items: VeilleItem[] = []
  const failed: string[] = []
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') items.push(...r.value)
    else failed.push(SOURCES[i].id)
  })
  items.sort((a, b) => b.date - a.date)
  return { generated: Date.now(), items, failed }
}
