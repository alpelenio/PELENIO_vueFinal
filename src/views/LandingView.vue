<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="landing-page">
    <section class="hero">
      <div class="hero-bg" aria-hidden="true">
        <span class="orb orb-one"></span>
        <span class="orb orb-two"></span>
        <span class="orb orb-three"></span>
      </div>

      <div class="container hero-inner">
        <div class="hero-copy">
          <span class="eyebrow">Your ideas, in quiz form</span>
          <h1>Make curiosity <span>playful.</span></h1>
          <p>
            Create quizzes for any topic, challenge yourself with fresh questions,
            and turn the things you love into a game worth sharing.
          </p>

          <div class="cta">
            <RouterLink to="/crud-lab" class="btn">Create a Quiz →</RouterLink>
            <RouterLink to="/quizzes" class="btn secondary">Explore Quiz Sets</RouterLink>
          </div>

          <ul class="mini-stats">
            <li><strong>Any topic</strong><span>make it your own</span></li>
            <li><strong>4 choices</strong><span>one right answer</span></li>
            <li><strong>Just play</strong><span>learn as you go</span></li>
          </ul>
        </div>

        <div class="hero-visual" aria-label="Quiz creation preview">
          <div class="main-card card">
            <div class="card-header">
              <span class="status-dot"></span>
              <span>CurioQuiz Creator</span>
            </div>

            <div class="dashboard-row top-row">
              <div class="pill active">World</div>
              <div class="pill">Science</div>
              <div class="pill">Culture</div>
            </div>

            <div class="chart-panel">
              <div class="bar bar-one"></div>
              <div class="bar bar-two"></div>
              <div class="bar bar-three"></div>
              <div class="bar bar-four"></div>
              <div class="bar bar-five"></div>
            </div>

            <div class="dashboard-row metrics-row">
              <div>
                <small>Questions</small>
                <strong>6</strong>
              </div>
              <div>
                <small>Topics</small>
                <strong>6</strong>
              </div>
            </div>
          </div>

          <div class="floating-card badge-card card">
            <span class="mini-label">New</span>
            <strong>Your next big idea</strong>
          </div>

          <div class="floating-card score-card card">
            <span class="mini-label">Quiz ready</span>
            <strong>Let's play!</strong>
          </div>
        </div>
      </div>
    </section>

    <section class="feature-strip container">
      <div class="card feature-item">
        <h3>Make it yours</h3>
        <p class="muted">Write questions on anything you love and shape each quiz your way.</p>
      </div>
      <div class="card feature-item">
        <h3>Play to discover</h3>
        <p class="muted">Explore ready-made topics, test what you know, and learn something new.</p>
      </div>
      <div class="card feature-item">
        <h3>Keep your streak</h3>
        <p class="muted">See your scores grow as you play through more quiz sets.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #f6f1ff 0%, #eef8ff 42%, #f9f7ff 100%);
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(18px);
  opacity: 0.7;
}

.orb-one {
  width: 26rem;
  height: 26rem;
  background: rgba(139, 92, 246, 0.16);
  top: -8rem;
  right: -4rem;
}

.orb-two {
  width: 22rem;
  height: 22rem;
  background: rgba(34, 211, 238, 0.14);
  left: -4rem;
  bottom: -6rem;
}

.orb-three {
  width: 18rem;
  height: 18rem;
  background: rgba(237, 121, 255, 0.12);
  right: 18%;
  bottom: 8%;
}

.hero-inner {
  position: relative;
  display: grid;
  grid-template-columns: 1.2fr 0.9fr;
  align-items: center;
  gap: 2rem;
  z-index: 1;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.eyebrow {
  display: inline-flex;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  background: rgba(139, 92, 246, 0.08);
  border: 1px solid rgba(139, 92, 246, 0.15);
  color: #5e4ad5;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

h1 {
  font-size: clamp(3rem, 5vw, 5rem);
  line-height: 0.96;
  letter-spacing: -0.07em;
  margin: 0 0 1rem;
}

h1 span {
  display: block;
  background: linear-gradient(135deg, var(--primary), #3ec5ff 55%, #ff7cc8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-copy p {
  max-width: 620px;
  color: var(--muted);
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.mini-stats {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.mini-stats li {
  min-width: 120px;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  color: var(--primary-dark);
}

.mini-stats strong {
  font-size: 1.4rem;
}

.mini-stats span {
  color: var(--muted);
  font-size: 0.8rem;
}

.hero-visual {
  position: relative;
  min-height: 480px;
  display: grid;
  place-items: center;
}

.main-card {
  position: relative;
  width: min(100%, 440px);
  padding: 1.4rem;
  border-radius: 28px;
  background: rgba(16, 18, 42, 0.92);
  color: white;
  transform: rotate(8deg);
  box-shadow: 0 32px 60px rgba(15, 23, 42, 0.28);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.82rem;
  margin-bottom: 1rem;
}

.status-dot {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #34d399, #22d3ee);
  box-shadow: 0 0 18px rgba(52, 211, 153, 0.8);
}

.dashboard-row {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.top-row {
  margin-bottom: 1.4rem;
}

.pill {
  border-radius: 999px;
  padding: 0.4rem 0.7rem;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.75rem;
}

.pill.active {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(34, 211, 238, 0.8));
  color: white;
}

.chart-panel {
  height: 140px;
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 0.85rem;
  padding: 1.2rem 0.35rem 0;
  margin-bottom: 1rem;
}

.bar {
  flex: 1;
  border-radius: 999px 999px 0 0;
  background: linear-gradient(180deg, #62e0ff 0%, #8b5cf6 100%);
  box-shadow: 0 12px 18px rgba(109, 124, 255, 0.22);
}

.bar-one { height: 40%; }
.bar-two { height: 55%; }
.bar-three { height: 78%; }
.bar-four { height: 66%; }
.bar-five { height: 90%; }

.metrics-row {
  justify-content: space-between;
  padding-top: 0.2rem;
}

.metrics-row div {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.metrics-row small {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.metrics-row strong {
  font-size: 1.5rem;
}

.floating-card {
  position: absolute;
  min-width: 150px;
  padding: 1rem 1.1rem;
}

.badge-card {
  top: 1.5rem;
  right: 8%;
  transform: rotate(14deg);
  background: rgba(255, 255, 255, 0.78);
}

.score-card {
  bottom: 2.5rem;
  left: 4%;
  transform: rotate(-12deg);
  background: rgba(255, 255, 255, 0.8);
}

.mini-label {
  display: inline-block;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6d7cff;
  margin-bottom: 0.5rem;
}

.feature-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem;
  margin-top: -2rem;
  padding-bottom: 3rem;
  position: relative;
  z-index: 2;
}

.feature-item {
  padding: 1.35rem 1.2rem;
}

.feature-item h3 {
  margin-bottom: 0.5rem;
}

@media (max-width: 920px) {
  .hero-inner {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-copy {
    align-items: center;
    text-align: center;
  }

  .feature-strip {
    grid-template-columns: 1fr;
    margin-top: 0;
  }

  .hero-visual {
    min-height: 380px;
    width: 100%;
  }
}

@media (max-width: 560px) {
  .cta {
    width: 100%;
    flex-direction: column;
  }

  .cta a {
    width: 100%;
  }

  .mini-stats {
    width: 100%;
    justify-content: center;
  }

  .floating-card {
    transform: none !important;
    position: static;
  }

  .hero-visual {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-height: auto;
    padding-bottom: 1rem;
  }
}
</style>
