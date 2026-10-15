<script setup>
import { ref, computed } from 'vue'
import QuestionForm from '@/components/QuestionForm.vue'
import { useQuestionsStore } from '@/stores/questionsStore'
import { quizSets } from '@/data/quizSets'

const store = useQuestionsStore()
const editing = ref(null)
const filterQuizSet = ref('all')

const visibleQuestions = computed(() =>
  filterQuizSet.value === 'all'
    ? store.questions
    : store.questions.filter(q => (q.quizSetId ?? q.lessonId) === Number(filterQuizSet.value))
)

function handleSubmit(payload) {
  if (editing.value) {
    store.updateQuestion(editing.value.id, payload)
    editing.value = null
  } else {
    store.addQuestion(payload)
  }
}

function startEdit(q) { editing.value = { ...q } }

function restoreEditing(q) {
  editing.value = q ? { ...q } : null
}

function remove(id) {
  if (confirm('Delete this question?')) store.deleteQuestion(id)
}

function quizSetTitle(id) {
  return quizSets.find(set => set.id === id)?.title || 'Unknown'
}
</script>

<template>
  <div class="container">
    <h1>Quiz Builder</h1>
    <p class="muted">
      Write and organize multiple-choice questions, then play them in the matching quiz set.
    </p>

    <div class="layout">
      <QuestionForm
        :editing="editing"
        @submit="handleSubmit"
        @cancel="editing = null"
        @restore-editing="restoreEditing"
      />

      <div class="card list-card">
        <div class="list-header">
          <h3>Existing Questions ({{ visibleQuestions.length }})</h3>
          <select v-model="filterQuizSet">
            <option value="all">All quiz topics</option>
            <option v-for="set in quizSets" :key="set.id" :value="set.id">
              {{ set.id }} — {{ set.title }}
            </option>
          </select>
        </div>

        <p v-if="!visibleQuestions.length" class="muted" style="margin-top: 1rem;">
          No questions yet. Add one on the left.
        </p>

        <ul class="q-list">
          <li v-for="q in visibleQuestions" :key="q.id" class="q-item">
            <div class="q-body">
              <div class="q-topic">{{ quizSetTitle(q.quizSetId ?? q.lessonId) }}</div>
              <strong>{{ q.text }}</strong>
              <ul class="q-options">
                <li
                  v-for="(opt, i) in q.options"
                  :key="i"
                  :class="{ correct: i === q.correctIndex }"
                >
                  {{ i === q.correctIndex ? '✔' : '·' }} {{ opt }}
                </li>
              </ul>
            </div>
            <div class="q-actions">
            <button class="btn small edit" @click="startEdit(q)">Edit</button>
            <button class="btn small delete" @click="remove(q.id)">Delete</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
  gap: 1.5rem;
  margin-top: 1.5rem;
}
@media (max-width: 800px) {
  .layout { grid-template-columns: 1fr; }
}
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.list-header select {
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
  border: 1px solid #d5dde5;
  font-family: inherit;
}
.q-list { list-style: none; margin-top: 1rem; }
.q-item {
  padding: 1rem 0;
  border-bottom: 1px solid #eef2f6;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
}
.q-item:last-child { border-bottom: none; }
.q-topic {
  font-size: 0.75rem;
  color: var(--primary);
  font-weight: 700;
  margin-bottom: 0.25rem;
}
.q-options {
  list-style: none;
  margin-top: 0.4rem;
  font-size: 0.85rem;
  color: var(--muted);
}
.q-options .correct { color: var(--primary); font-weight: 600; }
.q-actions { display: flex; flex-direction: column; gap: 0.4rem; }
</style>