<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { quizSets } from '@/data/quizSets'
import { useQuestionsStore } from '@/stores/questionsStore'
import { useProgressStore } from '@/stores/progressStore'

const props = defineProps({ quizSetId: { type: [String, Number], required: true } })
const store = useQuestionsStore()
const progress = useProgressStore()

const quizSet = computed(() => quizSets.find(set => set.id === Number(props.quizSetId)))
const questions = computed(() => store.getByQuizSet(Number(props.quizSetId)))

const currentIndex = ref(0)
const selected = ref(null)
const score = ref(0)
const finished = ref(false)
const answers = ref([])

const current = computed(() => questions.value[currentIndex.value])
const isLast = computed(() => currentIndex.value === questions.value.length - 1)

function choose(i) {
  if (selected.value !== null) return
  selected.value = i
  if (i === current.value.correctIndex) score.value++
  answers.value.push({ questionId: current.value.id, chosen: i })
}

function next() {
  if (isLast.value) {
    finished.value = true
    const percent = Math.round((score.value / questions.value.length) * 100)
    progress.markCompleted(quizSet.value.id, percent)
  } else {
    currentIndex.value++
    selected.value = null
  }
}

function restart() {
  currentIndex.value = 0
  selected.value = null
  score.value = 0
  finished.value = false
  answers.value = []
}

const percent = computed(() =>
  questions.value.length
    ? Math.round((score.value / questions.value.length) * 100)
    : 0
)
</script>

<template>
  <div class="container" v-if="quizSet">
    <RouterLink :to="`/quizzes/${quizSet.id}`" class="back">← Back to quiz set</RouterLink>

    <div class="card" style="margin-top: 1rem;">
      <h1>{{ quizSet.title }}</h1>

      <div v-if="!questions.length" class="empty">
        <p>This quiz set is waiting for its first question.</p>
        <RouterLink to="/crud-lab" class="btn">Add questions</RouterLink>
      </div>

      <div v-else-if="!finished" class="quiz-body">
        <div class="quiz-progress">
          Question {{ currentIndex + 1 }} of {{ questions.length }}
        </div>

        <h2 class="q-text">{{ current.text }}</h2>

        <ul class="options">
          <li
            v-for="(opt, i) in current.options"
            :key="i"
            class="option"
            :class="{
              selected: selected === i,
              correct: selected !== null && i === current.correctIndex,
              wrong: selected === i && i !== current.correctIndex
            }"
            @click="choose(i)"
          >
            <span class="letter">{{ String.fromCharCode(65 + i) }}</span>
            {{ opt }}
          </li>
        </ul>

        <button
          v-if="selected !== null"
          class="btn"
          @click="next"
        >
          {{ isLast ? 'Finish Quiz' : 'Next →' }}
        </button>
      </div>

      <div v-else class="result">
        <h2>Quiz Complete!</h2>
        <p class="score">
          You scored <strong>{{ score }} / {{ questions.length }}</strong>
          ({{ percent }}%)
        </p>
        <div class="actions">
          <button class="btn" @click="restart">Try Again</button>
          <RouterLink to="/dashboard" class="btn secondary">My Quiz Space</RouterLink>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="container">
    <h2>Quiz set not found</h2>
    <RouterLink to="/quizzes" class="btn" style="margin-top: 1rem;">Explore Quiz Sets</RouterLink>
  </div>
</template>

<style scoped>
.back { font-size: 0.9rem; }
.quiz-progress {
  color: var(--muted);
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
}
.q-text { font-size: 1.3rem; margin-bottom: 1.25rem; }
.options { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
.option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 1rem;
  border: 2px solid #e2e8ef;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s;
  font-size: 0.95rem;
}
.option:hover { border-color: var(--primary); }
.option.selected { border-color: var(--primary); background: #f0fdf7; }
.option.correct { border-color: var(--primary); background: #e8f7f0; }
.option.wrong { border-color: var(--danger); background: #fdecea; }
.letter {
  width: 26px;
  height: 26px;
  background: var(--primary-dark);
  color: white;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 0.8rem;
  font-weight: 700;
}
.result { text-align: center; padding: 1.5rem 0; }
.score { font-size: 1.15rem; margin: 1rem 0; }
.actions { display: flex; gap: 0.75rem; justify-content: center; }
.empty { text-align: center; padding: 1.5rem 0; display: flex; flex-direction: column; gap: 1rem; align-items: center; }
</style>