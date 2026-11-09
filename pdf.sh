#!/usr/bin/env bash
# Choisit un fichier Markdown du dépôt avec fzf et en génère un PDF
# A4 paysage, deux pages par feuille, police réduite et marges minimales.
#
# Le Markdown est converti en HTML localement avec le moteur de VitePress
# (node_modules, mêmes conteneurs ::: et même coloration du code), puis
# imprimé par Chrome headless sur des demi-A4 (A5) assemblés deux par
# deux sur une feuille A4 paysage. Aucun serveur, aucun accès au site.
#
# Usage : ./pdf.sh [requête fzf initiale]
# Sortie : pdf/<chemin-du-fichier>.pdf
set -euo pipefail

cd "$(dirname "$0")"
ROOT=$PWD

for cmd in fzf node uv; do
  command -v "$cmd" >/dev/null || { echo "Commande manquante : $cmd" >&2; exit 1; }
done
[ -d node_modules/vitepress ] || { echo "Lancez d'abord npm install" >&2; exit 1; }
CHROME=$(command -v google-chrome-stable || command -v google-chrome || command -v chromium || command -v chromium-browser || true)
[ -n "$CHROME" ] || { echo "Chrome / Chromium introuvable" >&2; exit 1; }

md=$(git ls-files '*.md' \
  | grep -vE '^node_modules/' \
  | fzf --query="${1:-}" --select-1 --prompt='Markdown > ' \
        --preview 'head -40 {}' --preview-window=right:50%) || exit 0

mkdir -p pdf
out="pdf/$(echo "${md%.md}" | tr '/' '-').pdf"
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

# 1. Markdown -> HTML
node --input-type=module - "$ROOT" "$md" "$tmp/page.html" <<'JS'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { createMarkdownRenderer } from 'vitepress'

const [root, rel, dest] = process.argv.slice(2)
const file = path.resolve(root, rel)

// <!--@include: chemin--> de VitePress (relatif au fichier, ou @/ = racine)
function load(p, depth = 0) {
  let src = fs.readFileSync(p, 'utf8')
  return src.replace(/<!--\s*@include:\s*(.+?)\s*-->/g, (m, inc) => {
    if (depth > 5) return ''
    const target = inc.startsWith('@/')
      ? path.join(root, inc.slice(2))
      : path.resolve(path.dirname(p), inc)
    const t = target.replace(/\{.*\}$/, '').replace(/#.*$/, '')
    return fs.existsSync(t) ? load(t, depth + 1).replace(/^---\n[\s\S]*?\n---\n/, '') : ''
  })
}

const md = await createMarkdownRenderer(root, { lineNumbers: false }, '/')
let src = load(file)
let title = path.basename(rel, '.md')
const fm = src.match(/^---\n([\s\S]*?)\n---\n/)
if (fm) {
  const t = fm[1].match(/^title:\s*["']?(.+?)["']?\s*$/m)
  if (t) title = t[1]
  src = src.slice(fm[0].length)
}
// Pas de sommaire à l'impression : bloc « ::: details Sommaire » + [[toc]]
src = src
  .replace(/^:::+[ \t]*details[^\n]*\n\s*\[\[toc\]\]\s*\n:::+[ \t]*$/gim, '')
  .replace(/^[ \t]*\[\[toc\]\][ \t]*$/gim, '')
let body = md.render(src, { path: file, relativePath: rel, cleanUrls: false })

// Liens et images absolus (/res/x.png) -> dossier public/ du dépôt
const pub = pathToFileURL(path.join(root, 'public')).href
body = body.replace(/(\s(?:src|href)=")\/(?!\/)/g, `$1${pub}/`)
// Tout <details> ouvert pour l'impression ? Non : on garde l'état du Markdown.

const css = `
@page { size: 148.5mm 210mm; margin: 4mm 4mm 5mm; }
@page { @bottom-center { content: counter(page); font: 6pt sans-serif; color: #888; } }
:root { --c-brand: #3451b2; --c-soft: #f3f4f6; --c-border: #d4d4d8; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font: 7.5pt/1.35 Inter, "Helvetica Neue", Arial, sans-serif; color: #1f2328; }
h1, h2, h3, h4 { line-height: 1.2; margin: .9em 0 .35em; break-after: avoid; }
h1 { font-size: 13pt; margin-top: 0; }
h2 { font-size: 10.5pt; border-top: 1px solid var(--c-border); padding-top: .4em; }
h3 { font-size: 9pt; } h4 { font-size: 8pt; }
p, ul, ol, table, pre, blockquote { margin: .35em 0; }
ul, ol { padding-left: 1.4em; } li + li { margin-top: .1em; }
a { color: var(--c-brand); text-decoration: none; }
.header-anchor, .vp-copy-ignore, button.copy, span.lang { display: none; }
img { max-width: 100%; max-height: 75mm; height: auto; display: block; margin: .3em auto; break-inside: avoid; }
li img, td img, p img { display: inline-block; }
iframe, div:has(> iframe), clientonly, slidesdeck { display: none; }
code { font: 6.6pt/1.3 "JetBrains Mono", "DejaVu Sans Mono", monospace; background: var(--c-soft); padding: 0 .25em; border-radius: 2px; }
div[class*="language-"] { position: relative; background: var(--c-soft); border-radius: 3px; margin: .35em 0; }
pre { padding: .35em .5em; white-space: pre-wrap; word-break: break-word; margin: 0; }
pre code { background: none; padding: 0; }
.shiki span { color: var(--shiki-light); }
.vp-code-group .tabs { display: none; }
.vp-code-group .blocks > div { display: block !important; }
table { border-collapse: collapse; width: 100%; break-inside: auto; }
th, td { border: 1px solid var(--c-border); padding: .15em .35em; text-align: left; vertical-align: top; }
th { background: var(--c-soft); }
tr { break-inside: avoid; }
blockquote { border-left: 2px solid var(--c-border); padding-left: .6em; color: #555; margin-left: 0; }
.custom-block { border-left: 3px solid; border-radius: 3px; padding: .25em .6em; margin: .45em 0; break-inside: avoid-page; }
.custom-block-title { font-weight: 700; margin: .1em 0; }
.custom-block.tip { border-color: #3451b2; background: #eef1fb; }
.custom-block.info { border-color: #8e96aa; background: #f1f2f4; }
.custom-block.warning { border-color: #d6a700; background: #fcf6e0; }
.custom-block.danger { border-color: #c62f3d; background: #fcecee; }
.custom-block.details { border-color: #8e96aa; background: #f6f6f7; }
details summary { font-weight: 700; cursor: default; }
hr { border: 0; border-top: 1px solid var(--c-border); margin: .6em 0; }
`
const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<base href="${pathToFileURL(path.dirname(file)).href}/">
<title>${title}</title><style>${css}</style></head>
<body>${body}</body></html>`
fs.writeFileSync(dest, html)
JS

# 2. HTML -> PDF demi-A4 (format donné par le @page du CSS)
"$CHROME" --headless=new --disable-gpu --no-first-run --no-default-browser-check \
  --user-data-dir="$tmp/profile" --allow-file-access-from-files \
  --no-pdf-header-footer --virtual-time-budget=10000 \
  --print-to-pdf="$tmp/pages.pdf" "file://$tmp/page.html" 2>/dev/null
[ -s "$tmp/pages.pdf" ] || { echo "Échec de l'impression" >&2; exit 1; }

# 3. Deux demi-A4 côte à côte sur une feuille A4 paysage
uv run --quiet --no-project --with 'pypdf>=5' python - "$tmp/pages.pdf" "$out" <<'PY'
import sys
from pypdf import PdfReader, PdfWriter, Transformation, PageObject

src, dst = sys.argv[1], sys.argv[2]
pages = list(PdfReader(src).pages)
W, H = 841.89, 595.28          # A4 paysage en points
cell_w = W / 2
writer = PdfWriter()
for i in range(0, len(pages), 2):
    sheet = PageObject.create_blank_page(width=W, height=H)
    for slot, page in enumerate(pages[i:i + 2]):
        pw, ph = float(page.mediabox.width), float(page.mediabox.height)
        scale = min(cell_w / pw, H / ph, 1)
        dx = slot * cell_w + (cell_w - pw * scale) / 2
        dy = (H - ph * scale) / 2
        sheet.merge_transformed_page(page, Transformation().scale(scale).translate(dx, dy))
    writer.add_page(sheet)
with open(dst, "wb") as f:
    writer.write(f)
print(f"{len(pages)} pages -> {len(writer.pages)} feuilles A4 paysage")
PY

echo "PDF : $out"
