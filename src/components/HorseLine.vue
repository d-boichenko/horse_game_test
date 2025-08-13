<script setup>
import Horse from './Horse.vue';
import { computed, watch, nextTick, ref, onUnmounted } from 'vue';
import '../styles/components/HorseLine.scss';

const props = defineProps({
  horse: {
    type: Object,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  raceStarted: {
    type: Boolean,
    required: false,
    default: false,
  },
  isPaused: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(['horse-finished']);

const resetInProgress = ref(false);
const horseElement = ref(null);
const pausedPosition = ref(null);
const remainingTime = ref(null);
const finishTimeout = ref(null);

const horseStyle = computed(() => {
  const minDuration = 5;
  const maxDuration = 15;
  let duration = maxDuration - ((props.horse.condition - 1) / 99) * (maxDuration - minDuration);

  if (remainingTime.value !== null) {
    duration = remainingTime.value;
  }

  const style = {
    'transition-duration': `${duration}s`,
  };

  if (props.isPaused && pausedPosition.value !== null) {
    style.left = `${pausedPosition.value}px`;
  }

  return style;
});

const animationDuration = computed(() => {
  const minDuration = 5;
  const maxDuration = 15;
  return maxDuration - ((props.horse.condition - 1) / 99) * (maxDuration - minDuration);
});

function resetPosition() {
  resetInProgress.value = true;
  pausedPosition.value = null;
  remainingTime.value = null;

  if (finishTimeout.value) {
    clearTimeout(finishTimeout.value);
    finishTimeout.value = null;
  }

  nextTick(() => {
    setTimeout(() => {
      resetInProgress.value = false;
    }, 50);
  });
}

function captureCurrentPosition() {
  if (horseElement.value) {
    const computedStyle = getComputedStyle(horseElement.value);
    const currentLeft = parseInt(computedStyle.left, 10);
    pausedPosition.value = currentLeft;

    const totalDistance = horseElement.value.parentElement.offsetWidth - 100;
    const totalTime = animationDuration.value * 1000;
    const elapsedDistance = currentLeft - 50;
    const progressRatio = elapsedDistance / totalDistance;
    remainingTime.value = (totalTime * (1 - progressRatio)) / 1000;
  }
}

watch(
  () => props.isPaused,
  (newValue, oldValue) => {
    if (newValue && !oldValue && props.raceStarted) {
      captureCurrentPosition();
      if (finishTimeout.value) {
        clearTimeout(finishTimeout.value);
        finishTimeout.value = null;
      }
    } else if (!newValue && oldValue && props.raceStarted) {
      // Resuming - continue with remaining time
      if (remainingTime.value > 0) {
        finishTimeout.value = setTimeout(() => {
          emit('horse-finished', props.number);
        }, remainingTime.value * 1000);
      }
    }
  }
);

// Watch for race start
watch(
  () => props.raceStarted,
  (newValue, oldValue) => {
    if (oldValue === true && newValue === false) {
      resetPosition();
    }

    if (newValue && !props.isPaused) {
      finishTimeout.value = setTimeout(() => {
        emit('horse-finished', props.number);
      }, animationDuration.value * 1000);
    }
  }
);

// Cleanup
onUnmounted(() => {
  if (finishTimeout.value) {
    clearTimeout(finishTimeout.value);
  }
});
</script>

<template>
  <div class="horse-line">
    <div class="horse-line-number">{{ props.number }}</div>
    <div
      ref="horseElement"
      class="horse-line__horse"
      :class="{
        moving: raceStarted && !isPaused,
        'no-transition': resetInProgress || isPaused,
        paused: isPaused,
      }"
      :style="horseStyle"
    >
      <Horse :color="props.horse.color" />
    </div>
  </div>
</template>
