<script setup>
import HorseLine from './HorseLine.vue';
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import '../styles/components/HorseTrack.scss';

const store = useStore();

const props = defineProps({
  selectedHorses: {
    type: Array,
    required: false,
    default: () => [],
  },
});

const finishedHorses = ref(new Set());
const finishingOrder = ref([]);

const program = computed(() => store.getters['game/getProgram']);
const started = computed(() => store.getters['game/getStarted']);
const raceCompleted = computed(() => store.getters['game/getRaceCompleted']);
const allRacesCompleted = computed(() => store.getters['game/getAllRacesCompleted']);
const legendText = computed(() => {
  return `Race #${store.getters['game/getRaceNumber']} - ${store.getters['game/getRaceLength']}m`;
});
const totalHorses = computed(() => props.selectedHorses?.length || 0);
const isPaused = computed(() => store.getters['game/getIsPaused']);

function handleHorseFinished(horseNumber) {
  if (isPaused.value) return;

  finishedHorses.value.add(horseNumber);

  const horse = props.selectedHorses[horseNumber - 1];
  if (!horse) return;

  finishingOrder.value.push({
    position: finishingOrder.value.length + 1,
    name: horse.name,
  });

  if (finishedHorses.value.size === totalHorses.value && !raceCompleted.value) {
    const raceNumber = store.getters['game/getRaceNumber'];
    store.dispatch('game/completeRace');

    const raceResult = {
      raceNumber,
      raceLength: store.getters['game/getRaceLength'],
      results: [...finishingOrder.value],
    };

    store.commit('game/ADD_RACE_RESULT', raceResult);

    setTimeout(
      () => {
        startNextRace();
      },
      raceNumber !== 6 ? 2000 : 0
    );
  }
}

function startNextRace() {
  const currentRaceNumber = store.getters['game/getRaceNumber'];
  const maxRaces = store.getters['game/getProgram'].length;

  if (currentRaceNumber < maxRaces) {
    finishedHorses.value.clear();
    finishingOrder.value = [];

    store.commit('game/SET_NEW_RACE');
    store.dispatch('game/resetTrackState');

    setTimeout(() => {
      store.dispatch('game/startRace');
    }, 1000);
  } else {
    store.commit('game/SET_ALL_RACES_COMPLETED', true);
  }
}

function resetLocalState() {
  finishedHorses.value.clear();
  finishingOrder.value = [];
}

watch(
  program,
  () => {
    resetLocalState();
  },
  { deep: true }
);
</script>

<template>
  <div class="horse-track-wrapper">
    <div v-if="selectedHorses" class="horse-track">
      <HorseLine
        v-for="(horse, i) in selectedHorses"
        :key="i"
        :horse="horse"
        :is-paused="isPaused"
        :race-started="started"
        :number="i + 1"
        @horse-finished="handleHorseFinished"
      />
    </div>
    <div class="horse-track-legend">
      {{ legendText }}

      <span class="horse-track-legend__finish">FINISH</span>
    </div>
    <div v-if="raceCompleted && !allRacesCompleted" class="race-status">
      Race Completed! Next race starting soon...
    </div>
    <div v-else-if="isPaused && started" class="race-status paused">Race Paused</div>
    <div v-else-if="allRacesCompleted" class="race-status">
      All races are complete! Please regenerate the program to continue.
    </div>
  </div>
</template>
