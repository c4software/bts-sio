// Les dernières pages créées ou modifiées, lues dans l'historique Git au
// build. Source unique de la section « Nouveautés » de l'accueil, de la page
// /nouveautes (theme/recent.data.ts) et du flux /rss.xml (buildEnd de config.mts).
//
// Deux listes :
// - les nouveautés : pages créées, ou modifiées de manière importante (voir
//   isImportant) ; ce sont les cartes de l'accueil, la page et le flux RSS ;
// - les mises à jour : pages dont la dernière modification est mineure
//   (correction, précision, image ajoutée) ; elles défilent sous les cartes.
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

export interface RecentPage {
  title: string
  description: string
  link: string
  // Date du commit retenu pour la page, en millisecondes.
  updated: number
}

export interface RecentData {
  pages: RecentPage[]
  updates: RecentPage[]
}

export const RECENT_COUNT = 20
export const UPDATES_COUNT = 10
const DIRS = ['tp', 'cours', 'cheatsheets']

// Une modification est importante quand, sur une même journée, elle touche au
// moins 60 lignes et au moins 15 % de la page (200 lignes suffisent, quelle que
// soit la taille de la page). Le cumul par journée compte une série de petits
// commits sur un même TP comme une seule refonte.
function isImportant(changed: number, lines: number): boolean {
  return changed >= 200 || (changed >= 60 && changed >= 0.15 * lines)
}

// Titre et description d'une page : frontmatter `title:` / `description:`,
// sinon le premier titre `# ` du contenu.
function readPage(src: string, file: string, updated: number): RecentPage | null {
  const fm = src.match(/^---\n([\s\S]*?)\n---/)
  const front = fm ? fm[1] : ''
  const field = (name: string) => {
    const m = front.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))
    return m ? m[1].trim().replace(/^(["'])(.*)\1$/, '$2') : ''
  }
  if (/^lastUpdated:\s*false/m.test(front)) return null
  const body = fm ? src.slice(fm[0].length) : src
  const h1 = body.match(/^#\s+(.+)$/m)
  const title = field('title') || (h1 ? h1[1].trim() : '')
  if (!title) return null
  const link = '/' + file.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '.html')
  return { title, description: field('description'), link, updated }
}

// Chemin final d'une ligne --numstat, renommages compris
// (« a => b » ou « dossier/{a => b}/fichier »).
function numstatPath(raw: string): string {
  const brace = raw.match(/^(.*)\{(.*) => (.*)\}(.*)$/)
  if (brace) return (brace[1] + brace[3] + brace[4]).replace(/\/\//g, '/')
  const arrow = raw.split(' => ')
  return arrow[arrow.length - 1]
}

interface FileHistory {
  // Dernier commit qui touche la page.
  last: number
  // Dernier commit « important » (création ou grosse modification), 0 si aucun.
  important: number
  added: boolean
  // Lignes modifiées par jour, pour la journée en cours de lecture.
  day: string
  dayChanged: number
  dayTime: number
}

export function recentData(root: string, count = RECENT_COUNT, updatesCount = UPDATES_COUNT): RecentData {
  let log = ''
  try {
    log = execFileSync(
      'git',
      ['log', '-n', '500', '--format=@%ct', '--numstat', '--summary', '-M', '--', ...DIRS],
      { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
    )
  } catch {
    return { pages: [], updates: [] }
  }

  const sources = new Map<string, string | null>()
  const source = (file: string) => {
    if (!sources.has(file)) {
      const full = path.join(root, file)
      sources.set(file, existsSync(full) ? readFileSync(full, 'utf8') : null)
    }
    return sources.get(file)!
  }
  const lineCount = (file: string) => (source(file) ?? '').split('\n').length

  // Le journal va du plus récent au plus ancien : on cumule les lignes
  // modifiées par page et par journée, et on retient la journée la plus récente
  // qui est importante.
  const history = new Map<string, FileHistory>()
  const closeDay = (file: string, h: FileHistory) => {
    if (!h.important && h.day && isImportant(h.dayChanged, lineCount(file))) h.important = h.dayTime
  }
  let time = 0
  for (const line of log.split('\n')) {
    if (line.startsWith('@')) {
      time = Number(line.slice(1))
      continue
    }
    const created = line.match(/^ create mode \d+ (.+\.md)$/)
    if (created) {
      const h = history.get(created[1])
      if (h && !h.important) {
        h.important = time
        h.added = h.last === time
      }
      continue
    }
    const parts = line.split('\t')
    if (parts.length !== 3) continue
    const file = numstatPath(parts[2])
    if (!file.endsWith('.md') || source(file) === null) continue
    const changed = (Number(parts[0]) || 0) + (Number(parts[1]) || 0)
    const day = new Date(time * 1000).toISOString().slice(0, 10)
    let h = history.get(file)
    if (!h) {
      h = { last: time, important: 0, added: false, day, dayChanged: 0, dayTime: time }
      history.set(file, h)
    }
    if (h.important) continue
    if (h.day !== day) {
      closeDay(file, h)
      if (h.important) continue
      h.day = day
      h.dayChanged = 0
      h.dayTime = time
    }
    h.dayChanged += changed
  }
  for (const [file, h] of history) closeDay(file, h)

  // Dans un même commit, les pages créées passent avant les pages modifiées,
  // et une introduction avant le reste de sa série.
  const rank = (file: string) => (/(^|\/)(introduction|index)\.md$/.test(file) ? 0 : 1)
  const byTime = (key: 'important' | 'last') => ([fa, a]: [string, FileHistory], [fb, b]: [string, FileHistory]) =>
    b[key] - a[key] || Number(b.added) - Number(a.added) || rank(fa) - rank(fb) || fa.localeCompare(fb)

  const collect = (entries: [string, FileHistory][], key: 'important' | 'last', max: number) => {
    const out: RecentPage[] = []
    for (const [file, h] of entries) {
      const page = readPage(source(file)!, file, h[key] * 1000)
      if (page) out.push(page)
      if (out.length === max) break
    }
    return out
  }

  const all = [...history.entries()]
  const pages = collect(all.filter(([, h]) => h.important).sort(byTime('important')), 'important', count)
  // Les mises à jour : pages retouchées depuis leur dernière modification
  // importante (ou jamais modifiées de manière importante dans le journal lu).
  const updates = collect(all.filter(([, h]) => h.last > h.important).sort(byTime('last')), 'last', updatesCount)
  return { pages, updates }
}

// Compatibilité : les seules nouveautés (cartes, page, flux).
export function recentPages(root: string, count = RECENT_COUNT): RecentPage[] {
  return recentData(root, count, 0).pages
}

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Le flux RSS 2.0 de ces pages.
export function recentRss(pages: RecentPage[], site: { url: string; title: string; description: string }): string {
  const items = pages
    .map((page) => {
      const url = site.url + page.link
      return [
        '    <item>',
        `      <title>${escapeXml(page.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="false">${escapeXml(`${url}#${page.updated}`)}</guid>`,
        `      <pubDate>${new Date(page.updated).toUTCString()}</pubDate>`,
        page.description ? `      <description>${escapeXml(page.description)}</description>` : '',
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n')
    })
    .join('\n')
  const lastBuild = pages.length ? new Date(pages[0].updated).toUTCString() : new Date().toUTCString()
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.title)}</title>
    <link>${escapeXml(site.url + '/nouveautes.html')}</link>
    <atom:link href="${escapeXml(site.url + '/rss.xml')}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(site.description)}</description>
    <language>fr-FR</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>
`
}
