<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import StatCard from '@/components/StatCard.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { quizSets } from '@/data/quizSets'
import { useProgressStore } from '@/stores/progressStore'
import { useQuestionsStore } from '@/stores/questionsStore'

const progress = useProgressStore()
const questions = useQuestionsStore()

const totalQuizSets = quizSets.length
const completed = computed(() => progress.totalCompleted)
const avgScore = computed(() => {
  const items = Object.values(progress.completedQuizSets)
  if (!items.length) return '—'
  const avg = items.reduce((s, i) => s + i.score, 0) / items.length
  return Math.round(avg) + '%'
})
</script>

<template>
  <div class="container">
    <h1>Your Quiz Space</h1>
    <p class="muted">Your latest scores, favorite topics, and quiz-making progress.</p>

    <div class="grid grid-3" style="margin: 1.5rem 0;">
      <StatCard label="Quiz Sets Played" :value="completed" />
      <StatCard label="Average Score" :value="avgScore" accent="var(--warning)" />
      <StatCard label="Questions in Library" :value="questions.questions.length" accent="var(--primary-dark)" />
    </div>

    <div class="card">
      <h3>Topics Explored</h3>
      <ProgressBar :value="completed" :max="totalQuizSets" />
    </div>

    <div class="card" style="margin-top: 1.5rem;">
      <h3>Pick a Quiz Set</h3>
      <ul class="lesson-list">
        <li v-for="lesson in quizSets" :key="lesson.id" class="lesson-item">
          <div>
            <strong>{{ lesson.title }}</strong>
            <div class="muted">{{ lesson.summary }}</div>
          </div>
          <div class="right">
            <span v-if="progress.isCompleted(lesson.id)" class="done-badge">✔ Done</span>
            <RouterLink :to="`/quizzes/${lesson.id}`" class="btn small">Explore</RouterLink>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.lesson-list { list-style: none; margin-top: 1rem; }
.lesson-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 0;
  border-bottom: 1px solid #eef2f6;
  gap: 1rem;
}
.lesson-item:last-child { border-bottom: none; }
.right { display: flex; align-items: center; gap: 0.75rem; }
.done-badge {
  color: var(--primary);
  font-weight: 600;
  font-size: 0.85rem;
}
</style>