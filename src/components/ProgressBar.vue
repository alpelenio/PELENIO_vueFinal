<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, required: true },     // completed count
  max: { type: Number, required: true }        // total count
})

const percent = computed(() =>
  props.max === 0 ? 0 : Math.round((props.value / props.max) * 100)
)
</script>

<template>
  <div class="progress-wrap">
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: percent + '%' }"></div>
    </div>
    <div class="progress-meta">
      <span>{{ value }} / {{ max }} quiz sets</span>
      <strong>{{ percent }}%</strong>
    </div>
  </div>
</template>

<style scoped>
.progress-bar {
  height: 12px;
  background: #e6ecf1;
  border-radius: 999px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #42b883, #6fe0ab);
  transition: width 0.4s ease;
}
.progress-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--muted);
}
</style>