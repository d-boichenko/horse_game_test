<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import '../styles/components/AppHeader.scss';

const store = useStore();

const allHorses = computed(() => store.getters['horses/getAllHorses']);
const started = computed(() => store.getters['game/getStarted']);
const raceCompleted = computed(() => store.getters['game/getRaceCompleted']);
const isPaused = computed(() => store.getters['game/getIsPaused']);
const controlButtonText = computed(() => {
  const isFirstRace = store.getters['game/getRaceNumber'] === 1;

  if (!started.value && !raceCompleted.value && isFirstRace) {
    return 'Start Race';
  } else if (started.value && isPaused.value) {
    return 'Resume';
  } else {
    return 'Pause';
  }
});

const generateProgram = () => {
  store.dispatch('game/generateInitialData');
};

function manualStart() {
  if (!started.value && !raceCompleted.value) {
    store.dispatch('game/startRace');
  }
}

function togglePause() {
  if (started.value && !raceCompleted.value) {
    store.dispatch('game/togglePause');
  }
}

function handleControlButton() {
  if (!started.value && !raceCompleted.value) {
    manualStart();
  } else {
    togglePause();
  }
}
</script>

<template>
  <header>
    <div class="header-container">
      <h1>Don't push the horses</h1>
      <div class="game-controls">
        <button @click="generateProgram">Generate Program</button>
        <button @click="handleControlButton" :disabled="raceCompleted || !allHorses?.length > 0">
          {{ controlButtonText }}
        </button>
      </div>
    </div>
  </header>
</template>
