<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  accent: { type: String, default: 'var(--primary)' }
})
</script>

<template>
  <div class="stat-card card" :style="{ borderTop: `4px solid ${accent}` }">
    <div class="label">{{ label }}</div>
    <div class="value">{{ value }}</div>
  </div>
</template>

<style scoped>
.stat-card { text-align: center; }
.label { color: var(--muted); font-size: 0.9rem; }
.value { font-size: 2rem; font-weight: 700; color: var(--primary-dark); }
</style>