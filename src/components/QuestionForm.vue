<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { quizSets } from '@/data/quizSets'
import { useQuestionsStore } from '@/stores/questionsStore'

const DRAFT_STORAGE_KEY = 'curioquiz-question-form-draft'

const props = defineProps({
  editing: { type: Object, default: null }
})
const emit = defineEmits(['submit', 'cancel', 'restore-editing'])
const questionsStore = useQuestionsStore()

const blank = () => ({
  quizSetId: 1,
  text: '',
  options: ['', '', '', ''],
  correctIndex: 0
})

function loadDraft() {
  try {
    const saved = localStorage.getItem(DRAFT_STORAGE_KEY)
    if (!saved) return null

    const draft = JSON.parse(saved)
    const fields = draft.form
    if (
      !fields ||
      !quizSets.some(set => set.id === Number(fields.quizSetId)) ||
      typeof fields.text !== 'string' ||
      !Array.isArray(fields.options) ||
      fields.options.length !== 4 ||
      !fields.options.every(option => typeof option === 'string') ||
      !Number.isInteger(fields.correctIndex) ||
      fields.correctIndex < 0 ||
      fields.correctIndex > 3
    ) {
      return null
    }

    return {
      form: {
        quizSetId: Number(fields.quizSetId),
        text: fields.text,
        options: [...fields.options],
        correctIndex: fields.correctIndex
      },
      editingId: Number.isInteger(draft.editingId) ? draft.editingId : null
    }
  } catch (error) {
    console.warn('Failed to restore quiz question draft:', error)
    return null
  }
}

const savedDraft = loadDraft()
const restoredDraftId = savedDraft?.editingId ?? null
const editingId = ref(restoredDraftId)
const form = reactive(savedDraft?.form ?? blank())

function saveDraft() {
  if (
    editingId.value === null &&
    form.quizSetId === 1 &&
    form.text === '' &&
    form.options.every(option => option === '') &&
    form.correctIndex === 0
  ) {
    clearDraft()
    return
  }

  const questionDraft = {
    form: {
      quizSetId: form.quizSetId,
      text: form.text,
      options: [...form.options],
      correctIndex: form.correctIndex
    },
    editingId: editingId.value
  }

  try {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(questionDraft))
  } catch (error) {
    console.warn('Failed to save quiz question draft:', error)
  }
}

function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_STORAGE_KEY)
  } catch (error) {
    console.warn('Failed to clear quiz question draft:', error)
  }
}

watch(form, saveDraft, { deep: true, flush: 'sync' })
watch(editingId, saveDraft, { flush: 'sync' })

onMounted(() => {
  if (restoredDraftId !== null) {
    const question = questionsStore.questions.find(item => item.id === restoredDraftId)
    emit('restore-editing', question ?? null)
    if (!question) editingId.value = null
  }
})

// When parent passes an object to edit, populate the form
watch(
  () => props.editing,
  (val) => {
    if (val) {
      if (restoredDraftId === val.id) return
      editingId.value = val.id
      form.quizSetId = val.quizSetId
      form.text = val.text
      form.options = [...val.options]
      form.correctIndex = val.correctIndex
    }
  },
  { immediate: true }
)

function submit() {
  if (!form.text.trim()) return alert('Question text is required.')
  if (form.options.some(o => !o.trim())) return alert('All 4 options are required.')
  emit('submit', {
    quizSetId: Number(form.quizSetId),
    text: form.text.trim(),
    options: form.options.map(o => o.trim()),
    correctIndex: Number(form.correctIndex)
  })
  clearDraft()
  editingId.value = null
  Object.assign(form, blank())
}

function cancel() {
  clearDraft()
  editingId.value = null
  Object.assign(form, blank())
  emit('cancel')
}
</script>

<template>
  <form class="card" @submit.prevent="submit">
    <h3>{{ editing ? 'Edit Question' : 'Add New Question' }}</h3>
    <p class="draft-note">Your draft is saved automatically in this browser.</p>

    <label>Quiz topic</label>
    <select v-model="form.quizSetId">
      <option v-for="set in quizSets" :key="set.id" :value="set.id">
        {{ set.id }} — {{ set.title }}
      </option>
    </select>

    <label>Question</label>
    <textarea v-model="form.text" rows="2" placeholder="Type your question..."></textarea>

    <label>Options (select the correct one)</label>
    <div v-for="(_, i) in form.options" :key="i" class="option-row">
      <input type="radio" :value="i" v-model.number="form.correctIndex" />
      <input type="text" v-model="form.options[i]" :placeholder="`Option ${i + 1}`" />
    </div>

    <div class="actions">
      <button type="submit" class="btn">
        {{ editing ? 'Save Changes' : 'Add Question' }}
      </button>
      <button
        v-if="editing"
        type="button"
        class="btn secondary"
        @click="cancel"
      >Cancel</button>
    </div>
  </form>
</template>

<style scoped>
label {
  display: block;
  margin: 0.75rem 0 0.25rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary-dark);
}
input[type="text"], textarea, select {
  width: 100%;
  padding: 0.55rem 0.75rem;
  border: 1px solid #d5dde5;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: inherit;
}
.option-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-top: 0.4rem;
}
.actions { margin-top: 1rem; display: flex; gap: 0.5rem; }
.draft-note { color: var(--muted); font-size: 0.8rem; margin: -0.35rem 0 0.65rem; }
</style>