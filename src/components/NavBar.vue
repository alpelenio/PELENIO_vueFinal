<script setup>
import { RouterLink } from 'vue-router'
import { useProgressStore } from '@/stores/progressStore'

const progress = useProgressStore()
</script>

<template>
  <nav class="navbar">
    <div class="nav-inner">
      <RouterLink to="/" class="brand">
        <span class="logo">C</span> CurioQuiz
      </RouterLink>
      <ul class="nav-links">
        <li><RouterLink to="/dashboard">Dashboard</RouterLink></li>
        <li><RouterLink to="/quizzes">Explore</RouterLink></li>
        <li><RouterLink to="/crud-lab">Quiz Builder</RouterLink></li>
        <li class="badge" v-if="progress.totalCompleted">
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: var(--primary-dark);
  color: white;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.nav-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9rem 1.5rem;
}
.brand {
  color: white;
  font-weight: 700;
  font-size: 1.15rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.brand:hover { text-decoration: none; }
.logo {
  background: var(--primary);
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: grid;
  place-items: center;
  font-weight: 900;
}
.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  align-items: center;
}
.nav-links a {
  color: #d9e3ec;
  font-size: 0.95rem;
}
.nav-links a.router-link-active {
  color: var(--primary);
  font-weight: 600;
}

</style>