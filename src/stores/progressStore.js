import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'curioquiz-progress'
const LEGACY_STORAGE_KEY = 'vuetorial-progress'

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch (e) {
    console.warn('Failed to load progress:', e)
  }
  return {}
}

export const useProgressStore = defineStore('progress', () => {
  const completedQuizSets = ref(loadProgress())
  const totalCompleted = computed(() => Object.keys(completedQuizSets.value).length)

  watch(
    completedQuizSets,
    (val) => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)),
    { deep: true }
  )

  function markCompleted(quizSetId, score) {
    completedQuizSets.value[quizSetId] = {
      completed: true,
      score,
      date: new Date().toISOString()
    }
  }
  function isCompleted(quizSetId) {
    return !!completedQuizSets.value[quizSetId]
  }
  function reset() {
    completedQuizSets.value = {}
  }

  return { completedQuizSets, totalCompleted, markCompleted, isCompleted, reset }
})