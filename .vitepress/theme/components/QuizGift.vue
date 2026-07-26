<template>
  <div class="quiz" v-if="quiz">
    <h2 v-if="!hideTitle">{{ quiz.title }}</h2>

    <div v-for="(q, qi) in questions" :key="qi" class="question" :class="stateClass(qi)">
      <p class="question-title">
        <strong>Question {{ qi + 1 }}</strong>
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
      <button v-else @click="reset">Recommencer</button>
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
// numérique (avec tolérance), appariement, mot manquant.

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
    type: hasWeight ? 'multichoice-multi' : 'multichoice',
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
    questions: chunks.map(parseQuestion).filter(Boolean)
  }
}

// --- Composant ---

function shuffle(array) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

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
    return { quiz: null, questions: [], answers: [], corrected: false, error: false }
  },
  computed: {
    score() {
      return this.questions.filter((_, qi) => this.isCorrect(qi)).length
    }
  },
  async mounted() {
    try {
      this.quiz = this.multi ? await this.loadAll() : await this.loadOne(this.src)
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
      return parseGift(await response.text())
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
    setup() {
      // Tirage aléatoire de `limit` questions à chaque tentative
      this.questions = shuffle(this.quiz.questions).slice(0, this.limit).map((q) => {
        const question = { ...q }
        if (q.options) {
          question.shuffled = shuffle(q.options)
        }
        if (q.type === 'matching') {
          question.shuffledRights = shuffle(q.rights)
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

button:hover {
  background: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
}
</style>
