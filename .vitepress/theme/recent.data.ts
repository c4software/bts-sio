// Les dernières pages créées ou modifiées, lues dans l'historique Git au
// moment du build (affichées sur l'accueil par <RecentPages />).
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

export interface RecentPage {
  title: string
  description: string
  link: string
}

declare const data: RecentPage[]
export { data }

const COUNT = 20
const DIRS = ['tp', 'cours', 'cheatsheets']

// Titre et description d'une page : frontmatter `title:` / `description:`,
// sinon le premier titre `# ` du contenu.
function readPage(root: string, file: string): RecentPage | null {
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
  return { title, description: field('description'), link }
}

export default {
  load(): RecentPage[] {
    const root = path.resolve(__dirname, '../..')
    let log = ''
    try {
      log = execFileSync('git', ['log', '-n', '200', '--format=@%ct', '--name-status', '-M', '--', ...DIRS], {
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
      .map(([file]) => file)

    const pages: RecentPage[] = []
    for (const file of files) {
      const page = readPage(root, file)
      if (page) pages.push(page)
      if (pages.length === COUNT) break
    }
    return pages
  },
}
