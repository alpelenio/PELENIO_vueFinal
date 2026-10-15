<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { quizSets } from '@/data/quizSets'
import { useQuestionsStore } from '@/stores/questionsStore'
import { useProgressStore } from '@/stores/progressStore'

const props = defineProps({ id: { type: [String, Number], required: true } })

const quizSet = computed(() =>
  quizSets.find(set => set.id === Number(props.id))
)
const questionsStore = useQuestionsStore()
const progress = useProgressStore()

const questionCount = computed(() =>
  quizSet.value ? questionsStore.getByQuizSet(quizSet.value.id).length : 0
)
</script>

<template>
  <div class="container" v-if="quizSet">
    <RouterLink to="/quizzes" class="back">← Back to quiz sets</RouterLink>

    <div class="card" style="margin-top: 1rem;">
      <span class="tag">{{ quizSet.difficulty }}</span>
      <h1>{{ quizSet.title }}</h1>
      <p class="muted">✦ {{ quizSet.duration }}</p>
      <p style="margin-top: 1rem;">{{ quizSet.summary }}</p>

      <div class="meta">
        <div><strong>{{ questionCount }}</strong> question(s) available</div>
        <div v-if="progress.isCompleted(quizSet.id)">
          ✔ Completed with score
          {{ progress.completedQuizSets[quizSet.id]?.score }}%
        </div>
      </div>

      <div class="actions">
        <RouterLink :to="`/quiz/${quizSet.id}`" class="btn">
          Play this Quiz →
        </RouterLink>
        <RouterLink to="/crud-lab" class="btn secondary">
          Add Questions in Quiz Builder
        </RouterLink>
      </div>
    </div>
  </div>

  <div v-else class="container">
    <h2>Quiz set not found</h2>
    <RouterLink to="/quizzes" class="btn" style="margin-top: 1rem;">
      Back to Quiz Sets
    </RouterLink>
  </div>
</template>

<style scoped>
.back { font-size: 0.9rem; }
.tag {
  display: inline-block;
  background: #e8f7f0;
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  margin-bottom: 0.75rem;
}
.meta {
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid #eef2f6;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.9rem;
}
.actions { margin-top: 1.25rem; display: flex; gap: 0.75rem; flex-wrap: wrap; }
</style>