import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'curioquiz-questions'
const LEGACY_STORAGE_KEY = 'vuetorial-questions'

// Load from localStorage on startup, or fall back to the seed question
function loadQuestions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved).map(question => ({
        ...question,
        quizSetId: question.quizSetId ?? question.lessonId
      }))
    }
  } catch (e) {
    console.warn('Failed to load questions:', e)
  }
  // Default seed data
  return [
    {
      id: 1,
      quizSetId: 1,
      text: 'Which ancient wonder was located in Alexandria, Egypt?',
      options: ['The Lighthouse of Alexandria', 'The Colossus of Rhodes', 'The Hanging Gardens', 'The Temple of Artemis'],
      correctIndex: 0
    },
    {
      id: 2,
      quizSetId: 2,
      text: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
      correctIndex: 1
    },
    {
      id: 3,
      quizSetId: 3,
      text: 'Who painted the Mona Lisa?',
      options: ['Vincent van Gogh', 'Claude Monet', 'Leonardo da Vinci', 'Pablo Picasso'],
      correctIndex: 2
    },
    {
      id: 4,
      quizSetId: 4,
      text: 'Which country is widely credited as the birthplace of pizza?',
      options: ['Greece', 'Italy', 'France', 'Spain'],
      correctIndex: 1
    },
    {
      id: 5,
      quizSetId: 5,
      text: 'Who is commonly credited with inventing the World Wide Web?',
      options: ['Tim Berners-Lee', 'Steve Jobs', 'Ada Lovelace', 'Alan Turing'],
      correctIndex: 0
    },
    {
      id: 6,
      quizSetId: 6,
      text: 'How many rings are on the Olympic flag?',
      options: ['Four', 'Five', 'Six', 'Seven'],
      correctIndex: 1
    }
  ]
}

// Figure out the next ID (so new questions don't collide after refresh)
function nextIdFrom(list) {
  return list.length ? Math.max(...list.map(q => q.id)) + 1 : 1
}

export const useQuestionsStore = defineStore('questions', () => {
  const initial = loadQuestions()
  const questions = ref(initial)
  let nextId = nextIdFrom(initial)

  // Auto-save to localStorage on every change
  watch(
    questions,
    (val) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    },
    { deep: true }
  )

  function addQuestion(q) {
    questions.value.push({ id: nextId++, ...q })
  }
  function updateQuestion(id, updated) {
    const idx = questions.value.findIndex(q => q.id === id)
    if (idx !== -1) questions.value[idx] = { ...questions.value[idx], ...updated }
  }
  function deleteQuestion(id) {
    questions.value = questions.value.filter(q => q.id !== id)
  }
  function getByQuizSet(quizSetId) {
    return questions.value.filter(q => (q.quizSetId ?? q.lessonId) === quizSetId)
  }

  return { questions, addQuestion, updateQuestion, deleteQuestion, getByQuizSet }
})