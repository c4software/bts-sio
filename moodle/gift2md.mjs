#!/usr/bin/env node
// Convertit les fichiers .gift du dossier en versions imprimables et en ligne.
//
// Usage : node moodle/gift2md.mjs (intégré au build via package.json)
// Pour chaque <nom>.gift, génère :
//   - print/<nom>.md            : sujet imprimable + corrigé (saut de page)
//   - ../public/quiz/<nom>.gift : copie servie au composant VitePress <QuizGift>
// Ainsi que ../public/quiz/index.json : la liste des quiz disponibles
// (utilisée par le sélecteur de la page /moodle/).
//
// Note : le .gift publié contient les réponses (nécessaire pour la correction
// côté client). Ces quiz en ligne sont des outils d'entraînement, pas d'évaluation.

import { createHash } from 'node:crypto'
import { copyFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Les caractères spéciaux GIFT échappés sont remplacés par des sentinelles
// le temps du découpage, puis restaurés dans le texte final.
const ESCAPES = [
  ['\\=', '\x00'],
  ['\\:', '\x01'],
  ['\\{', '\x02'],
  ['\\}', '\x03'],
  ['\\~', '\x04'],
  ['\\#', '\x05'],
  ['\\;', '\x06']
]

const LETTERS = 'abcdefgh'

function protect(text) {
  for (const [raw, sentinel] of ESCAPES) {
    text = text.split(raw).join(sentinel)
  }
  return text
}

function restore(text) {
  for (const [raw, sentinel] of ESCAPES) {
    text = text.split(sentinel).join(raw[1])
  }
  return text.trim()
}

// Restaure puis échappe les chevrons pour que <?php survive au rendu HTML
function md(text) {
  return restore(text).replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// Mélange déterministe (même sujet imprimé à chaque génération)
function shuffle(items, seed) {
  return items
    .map((item, index) => ({
      item,
      key: createHash('md5').update(`${seed}|${index}`).digest('hex')
    }))
    .sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0))
    .map(({ item }) => item)
}

function stripFeedback(answer) {
  const parts = answer.split('#')
  return [parts[0].trim(), (parts[1] || '').trim()]
}

// Retire l'identifiant technique (PHP-L1-Q1) du titre
function displayTitle(title) {
  const space = title.indexOf(' ')
  return space === -1 ? title : title.slice(space + 1)
}

function parseQuestion(chunk) {
  let title = ''
  let body = chunk
  const titled = chunk.match(/^::([\s\S]*?)::([\s\S]*)$/)
  if (titled) {
    title = restore(titled[1])
    body = titled[2]
  }
  const m = body.match(/^([\s\S]*?)\{([\s\S]*)\}([\s\S]*)$/)
  if (!m) return null
  return { title, before: m[1].trim(), answers: m[2].trim(), after: m[3].trim() }
}

// Retourne { type, entries }. Chaque entrée : { correct, text, feedback }
function parseAnswers(raw) {
  if (raw.startsWith('#')) {
    const [text, feedback] = stripFeedback(raw.slice(1).trim())
    return { type: 'numerical', entries: [{ correct: true, text, feedback }] }
  }
  const tf = raw.match(/^(TRUE|FALSE|T|F)\b([\s\S]*)$/)
  if (tf) {
    const correct = tf[1] === 'TRUE' || tf[1] === 'T'
    const feedback = tf[2] ? tf[2].replace(/^#/, '').split('#')[0].trim() : ''
    return {
      type: 'truefalse',
      entries: [{ correct, text: correct ? 'Vrai' : 'Faux', feedback }]
    }
  }
  const entries = []
  const prefixes = []
  let hasWeight = false
  for (const m of raw.matchAll(/[=~](%-?[\d.]+%)?([^=~]+)/g)) {
    const prefix = raw[m.index]
    const weight = m[1]
    const [text, feedback] = stripFeedback(m[2].trim())
    prefixes.push(prefix)
    if (weight) hasWeight = true
    const correct = weight ? parseFloat(weight.slice(1, -1)) > 0 : prefix === '='
    entries.push({ correct, text, feedback })
  }
  if (prefixes.every((p) => p === '=')) {
    if (entries.every((e) => e.text.includes('->'))) {
      return { type: 'matching', entries }
    }
    return { type: 'shortanswer', entries }
  }
  return { type: hasWeight ? 'multichoice-multi' : 'multichoice', entries }
}

// Rend une question en Markdown : [sujet, ligne de corrigé]
function render(qnum, q) {
  const { type, entries } = parseAnswers(q.answers)
  const text = md(q.before)
  const after = md(q.after)
  const subject = [`**Question ${qnum} — ${displayTitle(q.title)}**`, '']
  let answerKey = ''

  if (type === 'matching') {
    subject.push(text, '')
    const lefts = entries.map((e) => md(e.text.split('->')[0]))
    const rights = entries.map((e) => md(e.text.split('->').slice(1).join('->')))
    subject.push('| | À relier à… |')
    subject.push('|---|---|')
    const shuffled = shuffle(rights, q.title)
    lefts.forEach((l, i) => subject.push(`| ${l} → ______ | • ${shuffled[i]} |`))
    answerKey = lefts.map((l, i) => `${l} → ${rights[i]}`).join(' ; ')
  } else if (type === 'shortanswer' || type === 'numerical') {
    subject.push(after ? `${text} ______ ${after}` : text)
    subject.push('', 'Réponse : ' + '_'.repeat(40))
    const accepted = entries.map((e) => md(e.text))
    answerKey = accepted[0]
    if (accepted.length > 1) {
      answerKey += ` (accepté aussi : ${accepted.slice(1).join(', ')})`
    }
    if (entries[0].feedback) {
      answerKey += ` — *${md(entries[0].feedback)}*`
    }
  } else if (type === 'truefalse') {
    subject.push(text, '', '☐ Vrai  ☐ Faux')
    answerKey = entries[0].correct ? 'Vrai' : 'Faux'
    if (entries[0].feedback) {
      answerKey += ` — *${md(entries[0].feedback)}*`
    }
  } else if (after) {
    // Mot manquant
    subject.push(`${text} ______ ${after}`, '')
    const opts = shuffle(entries, q.title).map((e, i) => ({
      letter: LETTERS[i],
      correct: e.correct,
      text: md(e.text)
    }))
    subject.push(opts.map((o) => `(${o.letter}) ${o.text}`).join(' / '))
    answerKey = opts
      .filter((o) => o.correct)
      .map((o) => `(${o.letter}) ${o.text}`)
      .join(' ; ')
  } else {
    subject.push(text)
    if (type === 'multichoice-multi') {
      subject.push('', '*Plusieurs réponses possibles.*')
    }
    subject.push('')
    const keys = []
    const feedbacks = []
    shuffle(entries, q.title).forEach((e, i) => {
      subject.push(`- ☐ **${LETTERS[i]}.** ${md(e.text)}`)
      if (e.correct) {
        keys.push(`(${LETTERS[i]}) ${md(e.text)}`)
        if (e.feedback) feedbacks.push(md(e.feedback))
      }
    })
    answerKey = keys.join(' ; ')
    if (feedbacks.length) {
      answerKey += ` — *${feedbacks.join(' / ')}*`
    }
  }
  subject.push('')
  return [subject.join('\n'), answerKey]
}

function convert(path, name, printdir, webdir) {
  const raw = protect(readFileSync(path, 'utf-8'))
  const allLines = raw.split('\n').filter((l) => !l.trim().startsWith('$CATEGORY'))
  const titleLine = allLines.find((l) => l.startsWith('// Questionnaire'))
  const stem = name.replace(/\.gift$/, '')
  let title = titleLine ? titleLine.slice(2).trim() : stem
  title = title.replace(/^Questionnaire\s*/, '').trim()
  const lines = allLines.filter((l) => !l.trim().startsWith('//'))
  const chunks = lines
    .join('\n')
    .split(/\n\s*\n/)
    .map((c) => c.trim())
    .filter(Boolean)
  const questions = chunks.map(parseQuestion).filter(Boolean)

  const subjectParts = [
    `# ${title}`,
    '',
    'Nom : ______________________  Prénom : ______________________',
    ''
  ]
  const keyParts = ['<div style="page-break-before: always;"></div>', '', '## Corrigé', '']
  questions.forEach((q, i) => {
    const [subject, key] = render(i + 1, q)
    subjectParts.push(subject)
    keyParts.push(`**${i + 1}.** ${key}`, '')
  })
  writeFileSync(
    join(printdir, stem + '.md'),
    [...subjectParts, '', ...keyParts].join('\n'),
    'utf-8'
  )
  copyFileSync(path, join(webdir, name))
  return { title, count: questions.length }
}

const here = dirname(fileURLToPath(import.meta.url))
const printdir = join(here, 'print')
const webdir = join(here, '..', 'public', 'quiz')
mkdirSync(printdir, { recursive: true })
mkdirSync(webdir, { recursive: true })

const manifest = []
for (const name of readdirSync(here).filter((f) => f.endsWith('.gift')).sort()) {
  const { title, count } = convert(join(here, name), name, printdir, webdir)
  manifest.push({ src: name.replace(/\.gift$/, ''), title, questions: count })
  console.log(`${name} : ${count} questions -> print/ + public/quiz/`)
}
writeFileSync(join(webdir, 'index.json'), JSON.stringify(manifest, null, 2), 'utf-8')
console.log(`index.json : ${manifest.length} quiz référencés`)
