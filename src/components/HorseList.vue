<script setup>
import '../styles/components/HorseList.scss';

const props = defineProps(['horses']);
</script>

<template>
  <table class="horse-list">
    <thead>
      <tr>
        <th>Name</th>
        <th>Condition</th>
        <th>Color</th>
      </tr>
    </thead>
    <tbody>
      <tr class="horse-list__item" v-for="horse in props.horses" :key="horse.id">
        <td>{{ horse.name }}</td>
        <td>{{ horse.condition }}</td>
        <td><span class="horse-color" :style="{ backgroundColor: horse.color }"></span></td>
      </tr>
    </tbody>
  </table>
</template>
