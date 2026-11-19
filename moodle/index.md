---
title: Quiz d'entraînement
aside: false
---

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { withBase } from 'vitepress'

const quizzes = ref([])
const selected = ref('')
const error = ref(false)

// Regroupe les quiz par le premier mot de leur titre, mais seulement quand
// ce mot apparaît plus d'une fois. Les thématiques uniques restent seules.
const quizGroups = computed(() => {
  const firstWord = t => (t || '').trim().split(/\s+/)[0] || ''

  const counts = {}
  quizzes.value.forEach(q => {
    const w = firstWord(q.title).toLowerCase()
    counts[w] = (counts[w] || 0) + 1
  })

  const groups = []
  const indexByWord = {}
  quizzes.value.forEach(q => {
    const w = firstWord(q.title).toLowerCase()
    if (counts[w] > 1) {
      if (indexByWord[w] === undefined) {
        indexByWord[w] = groups.length
        groups.push({ label: firstWord(q.title), quizzes: [] })
      }
      groups[indexByWord[w]].quizzes.push(q)
    } else {
      groups.push({ label: null, quizzes: [q] })
    }
  })

  return groups
})

onMounted(async () => {
  try {
    const response = await fetch(withBase('/quiz/index.json'))
    if (!response.ok) throw new Error(response.statusText)
    quizzes.value = await response.json()
  } catch {
    error.value = true
  }

  // Sélection initiale depuis l'URL (?quiz=...) pour partager une thématique.
  const param = new URLSearchParams(window.location.search).get('quiz')
  if (param) {
    if (param === ALL_PARAM) {
      selected.value = '__all__'
    } else {
      const quiz = quizzes.value.find(q => q.src === param || q.src === 'quiz-' + param)
      if (quiz) selected.value = quiz.src
    }
  }
})

// Paramètre d'URL court : « quiz-android-compose » devient « android-compose ».
const ALL_PARAM = 'melange'
const toParam = src => src === '__all__' ? ALL_PARAM : src.replace(/^quiz-/, '')

// Met à jour l'URL à chaque changement de thématique, sans recharger la page.
// La série (?serie=N, gérée par QuizGift) ne vaut que pour la thématique de
// départ : on la retire quand l'étudiant en choisit une autre.
watch(selected, (value, previous) => {
  const url = new URL(window.location.href)
  if (value) url.searchParams.set('quiz', toParam(value))
  else url.searchParams.delete('quiz')
  if (previous) url.searchParams.delete('serie')
  window.history.replaceState(window.history.state, '', url)
})
</script>

# Quiz d'entraînement

Ces quiz vous permettent de vérifier vos connaissances sur les différentes thématiques du cours. Ils ne sont pas notés : entraînez-vous autant de fois que nécessaire.

::: tip Comment ça marche ?
Choisissez une thématique, répondez aux questions, puis validez pour obtenir votre score et les explications. À chaque tentative, 10 questions sont tirées au hasard dans la banque de la thématique : celles que vous n'avez pas encore vues passent en premier, puis celles que vous avez ratées. Refaites le quiz plusieurs fois pour tout couvrir. Vous préférez avancer pas à pas ? Choisissez « Dans l'ordre » puis la série de questions à travailler. Le mode « Mélange » pioche dans l'ensemble des thématiques, idéal pour réviser en fin d'année. Vous retrouverez une partie de ces questions dans les évaluations sur Moodle.
:::

<ClientOnly>

<div class="quiz-selector">
  <label for="quiz-select"><strong>Choisissez un quiz :</strong></label>
  <select id="quiz-select" v-model="selected">
    <option disabled value="">— Sélectionnez une thématique —</option>
    <option value="__all__">Mélange : toutes les thématiques</option>
    <template v-for="(group, gi) in quizGroups" :key="gi">
      <optgroup v-if="group.label" :label="group.label">
        <option v-for="quiz in group.quizzes" :key="quiz.src" :value="quiz.src">
          {{ quiz.title }} ({{ quiz.questions }} questions)
        </option>
      </optgroup>
      <option v-else v-for="quiz in group.quizzes" :key="quiz.src" :value="quiz.src">
        {{ quiz.title }} ({{ quiz.questions }} questions)
      </option>
    </template>
  </select>
</div>

<p v-if="error">Impossible de charger la liste des quiz.</p>

<QuizGift v-if="selected" :src="selected === '__all__' ? '' : selected" :multi="selected === '__all__'" :key="selected" />

</ClientOnly>

<style scoped>
.quiz-selector {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin: 24px 0;
}

.quiz-selector select {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  font-size: 1em;
  max-width: 100%;
}
</style>
