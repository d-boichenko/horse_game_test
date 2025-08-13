<script setup>
import HorseTable from './HorseTable.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
import '../styles/components/HorseTables.scss';

const store = useStore();

const props = defineProps({
  program: {
    type: Array,
    required: false,
    default: () => [],
  },
});

const raceLengthArr = computed(() => store.getters['game/getRaceLengthArr']);
const raceResults = computed(() => store.getters['game/getRaceResults']);
</script>

<template>
  <div class="tables">
    <div class="tables__heading">
      <h3>Program</h3>
      <h3>Results</h3>
    </div>
    <div class="tables__inner">
      <div class="table-programs">
        <HorseTable
          v-for="(item, i) in program"
          :key="i"
          :selected-horses="program[i]"
          :table-legend="`Race #${i + 1} - ${raceLengthArr[i]}m`"
        />
      </div>
      <div class="table-results">
        <HorseTable
          v-for="(result, i) in raceResults"
          :key="`result-${i}`"
          :selected-horses="result.results"
          :table-legend="`Race #${result.raceNumber} - ${result.raceLength}m`"
        />
        <div v-if="raceResults.length === 0" class="no-results">No races completed yet</div>
      </div>
    </div>
  </div>
</template>
