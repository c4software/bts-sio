<template>
  <div class="quiz" v-if="quiz">
    <h2 v-if="!hideTitle">{{ quiz.title }}</h2>

    <div class="options">
      <div class="mode" role="radiogroup" aria-label="Ordre des questions">
        <label>
          <input type="radio" value="random" v-model="mode" @change="changeMode" />
          Tirage aléatoire
        </label>
        <label>
          <input type="radio" value="ordered" v-model="mode" @change="changeMode" />
          Dans l'ordre
        </label>
      </div>
      <label v-if="mode === 'ordered'" class="serie">
        Série :
        <select v-model="serie" @change="changeSerie">
          <option v-for="(s, si) in series" :key="si" :value="si + 1">
            {{ si + 1 }} (questions {{ s.from }} à {{ s.to }})
          </option>
        </select>
      </label>
      <p v-if="mode === 'random'" class="progress">
        Questions déjà vues : {{ seenCount }} / {{ quiz.questions.length }}
        <span v-if="wrongCount"> · {{ wrongCount }} à retravailler (reproposées en priorité)</span>
        <button v-if="seenCount" type="button" class="link" @click="forget">Oublier</button>
      </p>
    </div>

    <div v-for="(q, qi) in questions" :key="qi" class="question" :class="stateClass(qi)">
      <p class="question-title">
        <strong>Question {{ q.number || qi + 1 }}</strong>
        <span v-if="q.title"> — {{ q.title }}</span>
        <span v-if="q.origin" class="origin">{{ q.origin }}</span>
      </p>

      <p v-for="(img, ii) in q.images" :key="'img' + ii" class="diagram">
        <img :src="resolveImage(img)" alt="Diagramme UML" />
      </p>

      <!-- Mot manquant : la phrase contient le trou -->
      <p v-if="q.type === 'missingword'">
        {{ q.text }}
        <select v-model="answers[qi]" :disabled="corrected">
          <option disabled :value="null">…</option>
          <option v-for="(o, oi) in q.shuffled" :key="oi" :value="oi">{{ o.text }}</option>
        </select>
        {{ q.after }}
      </p>
      <p v-else class="multiline">{{ q.text }}</p>

      <!-- QCM à réponse unique -->
      <ul v-if="q.type === 'multichoice'">
        <li v-for="(o, oi) in q.shuffled" :key="oi">
          <label>
            <input type="radio" :name="`q${qi}`" :value="oi" v-model="answers[qi]" :disabled="corrected" />
            <span class="multiline">{{ o.text }}</span>
          </label>
        </li>
      </ul>

      <!-- QCM à réponses multiples -->
      <div v-if="q.type === 'multichoice-multi'">
        <p class="hint">Plusieurs réponses possibles.</p>
        <ul>
          <li v-for="(o, oi) in q.shuffled" :key="oi">
            <label>
              <input type="checkbox" :value="oi" v-model="answers[qi]" :disabled="corrected" />
              <span class="multiline">{{ o.text }}</span>
            </label>
          </li>
        </ul>
      </div>

      <!-- Vrai / Faux -->
      <ul v-if="q.type === 'truefalse'">
        <li v-for="v in [true, false]" :key="String(v)">
          <label>
            <input type="radio" :name="`q${qi}`" :value="v" v-model="answers[qi]" :disabled="corrected" />
            {{ v ? 'Vrai' : 'Faux' }}
          </label>
        </li>
      </ul>

      <!-- Réponse courte / numérique -->
      <p v-if="q.type === 'shortanswer' || q.type === 'numerical'">
        <input
          class="free-input"
          :type="q.type === 'numerical' ? 'number' : 'text'"
          v-model="answers[qi]"
          :disabled="corrected"
          placeholder="Votre réponse…"
        />
      </p>

      <!-- Appariement -->
      <table v-if="q.type === 'matching'" class="matching">
        <tr v-for="(pair, pi) in q.pairs" :key="pi">
          <td>{{ pair.left }}</td>
          <td>
            <select v-model="answers[qi][pi]" :disabled="corrected">
              <option disabled :value="null">…</option>
              <option v-for="r in q.shuffledRights" :key="r" :value="r">{{ r }}</option>
            </select>
          </td>
        </tr>
      </table>

      <!-- Correction -->
      <div v-if="corrected" class="feedback">
        <p v-if="isCorrect(qi)" class="good">✔ Bonne réponse</p>
        <template v-else>
          <p class="bad">✘ {{ answered(qi) ? 'Mauvaise réponse' : 'Pas de réponse' }}</p>
          <p class="expected">Réponse attendue : {{ expected(qi) }}</p>
        </template>
        <p v-if="feedbackFor(qi)" class="explain">{{ feedbackFor(qi) }}</p>
      </div>
    </div>

    <div class="actions">
      <p v-if="corrected" class="score">Score : {{ score }} / {{ questions.length }}</p>
      <button v-if="!corrected" @click="correct">Valider mes réponses</button>
      <template v-else>
        <button @click="reset">{{ mode === 'random' ? 'Nouveau tirage' : 'Recommencer la série' }}</button>
        <button v-if="mode === 'ordered' && serie < series.length" @click="nextSerie">Série suivante</button>
      </template>
    </div>
  </div>
  <div v-else class="quiz">
    <p v-if="error">Impossible de charger le quiz « {{ src }} ».</p>
    <p v-else>Chargement du quiz…</p>
  </div>
</template>

<script>
import { withBase } from 'vitepress'

// --- Parseur du format GIFT (Moodle) ---
// Supporte : QCM (réponse unique et multiple), vrai/faux, réponse courte,
// numérique (avec tolérance), appariement, mot manquant. Les questions
// libres (essay) sont ignorées.

const ESCAPES = [
  ['\\=', '\x00'],
  ['\\:', '\x01'],
  ['\\{', '\x02'],
  ['\\}', '\x03'],
  ['\\~', '\x04'],
  ['\\#', '\x05'],
  ['\\;', '\x06']
]

// Les images des énoncés sont référencées en absolu dans les .gift (pour
// Moodle) : en ligne, on les ressert depuis le site courant.
const SITE = 'https://cours.brosseau.ovh'
const IMAGE = /<img src="([^"]+)"\s*\/?>/g

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

function stripFeedback(answer) {
  const parts = answer.split('#')
  return [parts[0].trim(), (parts[1] || '').trim()]
}

function displayTitle(title) {
  // Retire l'identifiant technique (ex. « PHP-L1-Q1 ») du début du titre
  const parts = title.split(' ')
  return parts.length > 1 ? parts.slice(1).join(' ') : title
}

function parseAnswers(raw) {
  // Feedback général (####) retiré ; sans réponse, c'est une question libre
  raw = raw.split('####')[0].trim()
  if (raw === '') return { type: 'essay' }

  if (raw.startsWith('#')) {
    const [value, feedback] = stripFeedback(raw.slice(1).trim())
    const [num, tol] = value.split(':')
    return {
      type: 'numerical',
      value: parseFloat(restore(num)),
      tolerance: tol !== undefined ? parseFloat(restore(tol)) : 0,
      feedback: restore(feedback)
    }
  }

  const tfMatch = raw.match(/^(TRUE|FALSE|T|F)\b([\s\S]*)$/)
  if (tfMatch) {
    const feedback = tfMatch[2] ? tfMatch[2].replace(/^#/, '').split('#')[0].trim() : ''
    return {
      type: 'truefalse',
      correct: tfMatch[1] === 'TRUE' || tfMatch[1] === 'T',
      feedback: restore(feedback)
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
      // Une entrée sans partie gauche est un distracteur : sa proposition
      // s'ajoute à la liste déroulante sans correspondre à aucune ligne.
      const all = entries.map((e) => {
        const parts = e.text.split('->')
        return { left: restore(parts[0]), right: restore(parts.slice(1).join('->')) }
      })
      return {
        type: 'matching',
        pairs: all.filter((p) => p.left),
        rights: all.map((p) => p.right)
      }
    }
    return {
      type: 'shortanswer',
      accepted: entries.map((e) => restore(e.text)),
      feedback: restore(entries[0].feedback)
    }
  }

  return {
    // Comme Moodle : un « = » signifie réponse unique, même avec des pondérations négatives
    type: hasWeight && !prefixes.includes('=') ? 'multichoice-multi' : 'multichoice',
    options: entries.map((e) => ({
      correct: e.correct,
      text: restore(e.text),
      feedback: restore(e.feedback)
    }))
  }
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

  const images = []
  const text = restore(m[1])
    .replace(IMAGE, (_, src) => {
      images.push(src)
      return ''
    })
    .trim()

  const question = {
    // Identifiant technique (ex. « PHP-L1-Q3 ») : sert à mémoriser les questions vues
    id: title.split(' ')[0] || text,
    title: displayTitle(title),
    text,
    images,
    after: restore(m[3]),
    ...parseAnswers(m[2].trim())
  }
  if (question.after && question.type === 'multichoice') {
    question.type = 'missingword'
  }
  return question
}

function parseGift(source) {
  const protectedSource = protect(source)
  const lines = protectedSource.split('\n')
  const titleLine = lines.find((l) => l.startsWith('// Questionnaire'))
  const title = titleLine
    ? restore(titleLine.slice(2).trim()).replace(/^Questionnaire\s*/, '')
    : ''

  const kept = lines.filter(
    (l) => !l.trim().startsWith('//') && !l.trim().startsWith('$CATEGORY')
  )
  const chunks = kept
    .join('\n')
    .split(/\n\s*\n/)
    .map((c) => c.trim())
    .filter(Boolean)

  return {
    title,
    // Les questions libres demandent une correction manuelle : pas en ligne
    questions: chunks.map(parseQuestion).filter((q) => q && q.type !== 'essay')
  }
}

// --- Hasard ---

// Entier aléatoire dans [0, max[ : crypto si disponible (meilleure qualité
// que Math.random), sans biais de modulo.
function randomInt(max) {
  if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
    return Math.floor(Math.random() * max)
  }
  const limit = Math.floor(0x100000000 / max) * max
  const buffer = new Uint32Array(1)
  do {
    crypto.getRandomValues(buffer)
  } while (buffer[0] >= limit)
  return buffer[0] % max
}

// Générateur déterministe (mulberry32) initialisé par une chaîne : en mode
// « dans l'ordre », les propositions sont mélangées toujours de la même façon
// (sinon la bonne réponse, souvent écrite en premier dans le .gift, serait
// toujours en tête).
function seeded(text) {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) {
    h = Math.imul(h ^ text.charCodeAt(i), 16777619)
  }
  return (max) => {
    h = (h + 0x6d2b79f5) | 0
    let t = Math.imul(h ^ (h >>> 15), 1 | h)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return Math.floor((((t ^ (t >>> 14)) >>> 0) / 4294967296) * max)
  }
}

function shuffle(array, rand = randomInt) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = rand(i + 1)
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

// Mélange en alternant les groupes (thématiques) : en mode multi, un tirage
// de 10 questions couvre 10 thématiques différentes quand c'est possible.
function interleave(questions, groupOf) {
  const groups = {}
  for (const q of shuffle(questions)) {
    ;(groups[groupOf(q)] ||= []).push(q)
  }
  const queues = shuffle(Object.values(groups))
  const result = []
  while (queues.some((g) => g.length)) {
    for (const g of queues) if (g.length) result.push(g.shift())
  }
  return result
}

// --- Historique (localStorage) ---
// Pour chaque question : vue dans le cycle en cours (s) et ratée (w).
// L'historique est commun à tous les quiz, le mode « Mélange » en profite.

const STORAGE_KEY = 'quiz-gift:historique'

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

function saveHistory(history) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  } catch {
    // Navigation privée ou stockage plein : le tirage reste aléatoire
  }
}

// --- Composant ---

export default {
  name: 'QuizGift',
  props: {
    // Quiz unique (nom du fichier sans extension) ou mode multi
    src: { type: String, default: '' },
    // Mode multi : pioche les questions dans tous les quiz du manifeste
    multi: { type: Boolean, default: false },
    hideTitle: { type: Boolean, default: false },
    limit: { type: Number, default: 10 }
  },
  data() {
    return {
      quiz: null,
      questions: [],
      answers: [],
      corrected: false,
      error: false,
      // « random » : tirage aléatoire ; « ordered » : questions dans l'ordre du fichier, par série
      mode: 'random',
      serie: 1,
      history: {}
    }
  },
  computed: {
    score() {
      return this.questions.filter((_, qi) => this.isCorrect(qi)).length
    },
    series() {
      const total = this.quiz ? this.quiz.questions.length : 0
      const count = Math.ceil(total / this.limit)
      return Array.from({ length: count }, (_, i) => ({
        from: i * this.limit + 1,
        to: Math.min((i + 1) * this.limit, total)
      }))
    },
    seenCount() {
      return this.quiz ? this.quiz.questions.filter((q) => this.history[q.key]?.s).length : 0
    },
    wrongCount() {
      return this.quiz ? this.quiz.questions.filter((q) => this.history[q.key]?.w).length : 0
    }
  },
  async mounted() {
    try {
      this.quiz = this.multi ? await this.loadAll() : await this.loadOne(this.src)
      this.quiz.questions.forEach((q, i) => {
        q.number = i + 1
      })
      this.history = loadHistory()
      this.readUrl()
      this.setup()
    } catch {
      this.error = true
    }
  },
  methods: {
    resolveImage(src) {
      return src.startsWith(SITE) ? withBase(src.slice(SITE.length)) : src
    },
    async loadOne(src) {
      const response = await fetch(withBase(`/quiz/${src}.gift`))
      if (!response.ok) throw new Error(response.statusText)
      const quiz = parseGift(await response.text())
      quiz.questions.forEach((q) => {
        q.key = `${src}:${q.id}`
      })
      return quiz
    },
    // Rassemble les questions de tous les quiz du manifeste,
    // chaque question garde la thématique dont elle provient.
    async loadAll() {
      const response = await fetch(withBase('/quiz/index.json'))
      if (!response.ok) throw new Error(response.statusText)
      const manifest = await response.json()
      const all = await Promise.all(manifest.map((m) => this.loadOne(m.src)))
      const questions = all.flatMap((quiz) =>
        quiz.questions.map((q) => ({ ...q, origin: quiz.title }))
      )
      return { title: 'Toutes les thématiques', questions }
    },
    // Paramètre ?serie=N : mode « dans l'ordre » sur la série N (lien partageable)
    readUrl() {
      const param = new URLSearchParams(window.location.search).get('serie')
      const serie = parseInt(param, 10)
      if (serie >= 1 && serie <= this.series.length) {
        this.mode = 'ordered'
        this.serie = serie
      }
    },
    writeUrl() {
      const url = new URL(window.location.href)
      if (this.mode === 'ordered') url.searchParams.set('serie', this.serie)
      else url.searchParams.delete('serie')
      window.history.replaceState(window.history.state, '', url)
    },
    changeMode() {
      this.writeUrl()
      this.setup()
    },
    changeSerie() {
      this.writeUrl()
      this.setup()
    },
    nextSerie() {
      this.serie++
      this.changeSerie()
    },
    // Ordre de priorité du tirage : questions jamais vues (les ratées d'un
    // cycle précédent en tête), puis ratées, puis les autres. Quand toutes ont
    // été vues, un nouveau cycle commence : on couvre ainsi toute la banque en
    // un minimum de tentatives.
    draw() {
      const pool = this.quiz.questions
      const seen = (q) => this.history[q.key]?.s
      const wrong = (q) => this.history[q.key]?.w
      const order = (list) => (this.multi ? interleave(list, (q) => q.origin) : shuffle(list))
      const prioritize = (list) => [...order(list.filter(wrong)), ...order(list.filter((q) => !wrong(q)))]

      let picked = prioritize(pool.filter((q) => !seen(q))).slice(0, this.limit)
      if (picked.length < this.limit) {
        // Cycle terminé : on oublie les questions vues (celles de ce tirage
        // seront marquées juste après)
        for (const q of pool) if (this.history[q.key]) this.history[q.key].s = 0
        const rest = prioritize(pool.filter((q) => !picked.includes(q)))
        picked = [...picked, ...rest.slice(0, this.limit - picked.length)]
      }
      for (const q of picked) {
        this.history[q.key] = { ...this.history[q.key], s: 1 }
      }
      saveHistory(this.history)
      // Ordre d'affichage : mélangé, sans regrouper les ratées en tête
      return order(picked)
    },
    setup() {
      const ordered = this.mode === 'ordered'
      const start = (this.serie - 1) * this.limit
      const picked = ordered
        ? this.quiz.questions.slice(start, start + this.limit)
        : this.draw()

      this.questions = picked.map((q) => {
        const question = { ...q, number: ordered ? q.number : null }
        // Dans l'ordre : mélange des propositions fixe, identique pour tous
        const rand = ordered ? seeded(q.key) : randomInt
        if (q.options) {
          question.shuffled = shuffle(q.options, rand)
        }
        if (q.type === 'matching') {
          question.shuffledRights = shuffle(q.rights, rand)
        }
        return question
      })
      this.answers = this.questions.map((q) => {
        if (q.type === 'multichoice-multi') return []
        if (q.type === 'matching') return q.pairs.map(() => null)
        if (q.type === 'shortanswer' || q.type === 'numerical') return ''
        return null
      })
      this.corrected = false
    },
    forget() {
      for (const q of this.quiz.questions) delete this.history[q.key]
      this.history = { ...this.history }
      saveHistory(this.history)
    },
    answered(qi) {
      const a = this.answers[qi]
      if (this.questions[qi].type === 'matching') return a.some((v) => v !== null)
      if (Array.isArray(a)) return a.length > 0
      return a !== null && a !== ''
    },
    isCorrect(qi) {
      const q = this.questions[qi]
      const a = this.answers[qi]
      if (q.type === 'multichoice' || q.type === 'missingword') {
        return a !== null && q.shuffled[a].correct
      }
      if (q.type === 'multichoice-multi') {
        return q.shuffled.every((o, oi) => o.correct === a.includes(oi))
      }
      if (q.type === 'truefalse') return a === q.correct
      if (q.type === 'shortanswer') {
        const given = String(a).trim().toLowerCase()
        return q.accepted.some((acc) => acc.trim().toLowerCase() === given)
      }
      if (q.type === 'numerical') {
        if (a === '' || a === null) return false
        return Math.abs(Number(a) - q.value) <= q.tolerance
      }
      if (q.type === 'matching') {
        return q.pairs.every((pair, pi) => a[pi] === pair.right)
      }
      return false
    },
    expected(qi) {
      const q = this.questions[qi]
      if (q.type === 'multichoice' || q.type === 'missingword' || q.type === 'multichoice-multi') {
        return q.shuffled.filter((o) => o.correct).map((o) => o.text).join(' ; ')
      }
      if (q.type === 'truefalse') return q.correct ? 'Vrai' : 'Faux'
      if (q.type === 'shortanswer') return q.accepted[0]
      if (q.type === 'numerical') return q.value + (q.tolerance ? ` (± ${q.tolerance})` : '')
      if (q.type === 'matching') {
        return q.pairs.map((p) => `${p.left} → ${p.right}`).join(' ; ')
      }
      return ''
    },
    feedbackFor(qi) {
      const q = this.questions[qi]
      if (q.feedback) return q.feedback
      if (q.shuffled) {
        // Feedback de l'option choisie si disponible, sinon celui de la bonne réponse
        const a = this.answers[qi]
        if (q.type === 'multichoice' || q.type === 'missingword') {
          const chosen = a !== null ? q.shuffled[a] : null
          if (chosen && chosen.feedback) return chosen.feedback
        }
        const good = q.shuffled.find((o) => o.correct && o.feedback)
        return good ? good.feedback : ''
      }
      return ''
    },
    stateClass(qi) {
      if (!this.corrected) return ''
      return this.isCorrect(qi) ? 'is-good' : 'is-bad'
    },
    correct() {
      this.corrected = true
      // Les questions ratées seront reproposées en priorité aux prochains tirages
      this.questions.forEach((q, qi) => {
        const entry = { s: 1, ...this.history[q.key] }
        if (this.isCorrect(qi)) delete entry.w
        else entry.w = 1
        this.history[q.key] = entry
      })
      this.history = { ...this.history }
      saveHistory(this.history)
    },
    reset() {
      this.setup()
    }
  }
}
</script>

<style scoped>
.quiz {
  margin: 16px 0;
}

.options {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 24px;
  margin: 12px 0;
  font-size: 0.95em;
}

.mode {
  display: flex;
  gap: 16px;
}

.progress {
  flex-basis: 100%;
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9em;
}

button.link {
  border: none;
  background: none;
  color: var(--vp-c-brand-1);
  padding: 0 0 0 8px;
  font-size: 1em;
  text-decoration: underline;
}

button.link:hover {
  background: none;
  color: var(--vp-c-brand-2);
}

.question {
  border: 1px solid var(--vp-c-divider);
  border-left: 4px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px 16px;
  margin: 12px 0;
}

.question.is-good {
  border-left-color: var(--vp-c-green-1, #28a745);
}

.question.is-bad {
  border-left-color: var(--vp-c-red-1, #dc3545);
}

.question-title {
  margin: 0 0 8px;
}

.origin {
  display: inline-block;
  margin-left: 8px;
  padding: 1px 8px;
  border-radius: 10px;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
  font-size: 0.75em;
  vertical-align: middle;
}

ul {
  list-style: none;
  padding-left: 4px;
  margin: 8px 0;
}

label {
  user-select: none;
  cursor: pointer;
}

.hint {
  font-style: italic;
  font-size: 0.9em;
  margin: 4px 0;
}

/* Fond blanc : les diagrammes restent lisibles en thème sombre */
.diagram img {
  max-width: 100%;
  background: #fff;
  border-radius: 4px;
  padding: 8px;
}

.free-input,
select {
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 4px 8px;
  background: var(--vp-c-bg);
}

.matching td {
  padding: 4px 12px 4px 0;
}

.feedback {
  border-top: 1px dashed var(--vp-c-divider);
  margin-top: 8px;
  padding-top: 8px;
  font-size: 0.95em;
}

.feedback p {
  margin: 4px 0;
}

/* Préserve les retours à la ligne (code, réponses longues) */
.multiline,
.expected,
.explain {
  white-space: pre-wrap;
}

.good {
  color: var(--vp-c-green-1, #28a745);
  font-weight: 600;
}

.bad {
  color: var(--vp-c-red-1, #dc3545);
  font-weight: 600;
}

.explain {
  font-style: italic;
  color: var(--vp-c-text-2);
}

.actions {
  text-align: center;
  margin: 20px 0;
}

.score {
  font-size: 1.2em;
  font-weight: 700;
}

button {
  cursor: pointer;
  border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: #fff;
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 1em;
}

.actions button + button {
  margin-left: 12px;
}

button:hover {
  background: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
}
</style>
