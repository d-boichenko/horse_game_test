<script setup>
import '../styles/components/HorseTable.scss';

const props = defineProps({
  selectedHorses: {
    type: Array,
    required: false,
    default: () => [],
  },
  tableLegend: {
    type: String,
    required: false,
    default: '',
  },
});
</script>

<template>
  <div class="table-wrapper">
    <h4>{{ tableLegend }}</h4>
    <table>
      <thead>
        <tr>
          <th>Position</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(horse, i) in props.selectedHorses" :key="i">
          <td>{{ horse?.position || i + 1 }}</td>
          <td>{{ horse?.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
