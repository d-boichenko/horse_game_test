<script setup>
import AppHeader from './components/AppHeader.vue';
import HorseList from './components/HorseList.vue';
import HorseTrack from './components/HorseTrack.vue';
import HorseTables from './components/HorseTables.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
import './styles/layouts/App.scss';

const store = useStore();

const allHorses = computed(() => store.getters['horses/getAllHorses']);
const currentRaceNumber = computed(() => store.getters['game/getRaceNumber']);
const horsesInTheRace = computed(
  () => store.getters['game/getProgram'][currentRaceNumber.value - 1] || []
);
</script>

<template>
  <AppHeader />
  <div class="app">
    <div class="container">
      <div class="app-inner">
        <template v-if="allHorses.length > 0">
          <HorseList :horses="allHorses" />
          <HorseTrack :selectedHorses="horsesInTheRace" />
          <HorseTables :program="store.getters['game/getProgram']" />
        </template>
        <template v-else>
          <div class="initial-screen">
            No horses available. Please generate a race program to start the game.
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
