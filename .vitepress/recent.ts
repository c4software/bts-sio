// Les dernières pages créées ou modifiées, lues dans l'historique Git au
// build. Source unique de la section « Nouveautés » de l'accueil, de la page
// /nouveautes (theme/recent.data.ts) et du flux /rss.xml (buildEnd de config.mts).
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

export interface RecentPage {
  title: string
  description: string
  link: string
  // Date du dernier commit de la page, en millisecondes.
  updated: number
}

export const RECENT_COUNT = 20
const DIRS = ['tp', 'cours', 'cheatsheets']

// Titre et description d'une page : frontmatter `title:` / `description:`,
// sinon le premier titre `# ` du contenu.
function readPage(root: string, file: string, updated: number): RecentPage | null {
  const src = readFileSync(path.join(root, file), 'utf8')
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

export function recentPages(root: string, count = RECENT_COUNT): RecentPage[] {
  let log = ''
  try {
    log = execFileSync('git', ['log', '-n', '300', '--format=@%ct', '--name-status', '-M', '--', ...DIRS], {
      cwd: root,
      encoding: 'utf8',
    })
  } catch {
    return []
  }

  // Une entrée par fichier, à la date de son dernier commit ; dans un même
  // commit, les pages créées passent avant les pages modifiées, et une
  // introduction avant le reste de sa série.
  const seen = new Map<string, { time: number; added: boolean }>()
  let time = 0
  for (const line of log.split('\n')) {
    if (line.startsWith('@')) {
      time = Number(line.slice(1))
      continue
    }
    const parts = line.split('\t')
    if (parts.length < 2) continue
    const status = parts[0]
    const file = parts[parts.length - 1]
    if (!file.endsWith('.md') || seen.has(file) || status.startsWith('D')) continue
    seen.set(file, { time, added: status.startsWith('A') })
  }

  const rank = (file: string) => (/(^|\/)(introduction|index)\.md$/.test(file) ? 0 : 1)
  const files = [...seen.entries()]
    .filter(([file]) => existsSync(path.join(root, file)))
    .sort(([fa, a], [fb, b]) =>
      b.time - a.time || Number(b.added) - Number(a.added) || rank(fa) - rank(fb) || fa.localeCompare(fb))

  const pages: RecentPage[] = []
  for (const [file, { time }] of files) {
    const page = readPage(root, file, time * 1000)
    if (page) pages.push(page)
    if (pages.length === count) break
  }
  return pages
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
