<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { quizSets } from '@/data/quizSets'

const search = ref('')
const difficulty = ref('All')

const filtered = computed(() =>
  quizSets.filter(l => {
    const matchesSearch = l.title.toLowerCase().includes(search.value.toLowerCase())
    const matchesDifficulty = difficulty.value === 'All' || l.difficulty === difficulty.value
    return matchesSearch && matchesDifficulty
  })
)
</script>

<template>
  <div class="container">
    <h1>Explore Quiz Sets</h1>
    <p class="muted">Pick a topic, test what you know, and discover something new.</p>

    <div class="filters card">
      <input
        v-model="search"
        type="text"
        placeholder="🔍 Search quiz topics..."
        class="search-input"
      />
      <select v-model="difficulty">
        <option>All</option>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>
    </div>

    <div class="grid grid-3">
      <RouterLink
        v-for="lesson in filtered"
        :key="lesson.id"
        :to="`/quizzes/${lesson.id}`"
        class="lesson-card card"
      >
        <div class="tag">{{ lesson.difficulty }}</div>
        <h3>{{ lesson.title }}</h3>
        <p class="muted">{{ lesson.summary }}</p>
        <div class="footer">
          <span>✦ {{ lesson.duration }}</span>
          <span class="arrow">→</span>
        </div>
      </RouterLink>
    </div>

    <p v-if="!filtered.length" class="muted" style="margin-top: 1rem;">
      No quiz topics match your filters.
    </p>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
}
.search-input { flex: 1; }
.filters input, .filters select {
  padding: 0.6rem 0.9rem;
  border: 1px solid #d5dde5;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: inherit;
}
.lesson-card {
  display: block;
  color: inherit;
  transition: transform 0.15s, box-shadow 0.15s;
}
.lesson-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 22px rgba(0,0,0,0.08);
  text-decoration: none;
}
.tag {
  display: inline-block;
  background: #e8f7f0;
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  margin-bottom: 0.5rem;
}
.footer {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  font-size: 0.85rem;
  color: var(--muted);
}
.arrow { color: var(--primary); font-weight: 700; }
</style>