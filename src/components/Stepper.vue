<template>
  <div class="relative flex justify-between items-center mb-8">
    <div
        v-for="(step, index) in steps"
        :key="index"
        class="relative flex flex-col items-center"
        style="flex: 1;"
    >
      <!-- Step circle -->
      <div
          :class="[
          'z-10 w-10 h-10 flex items-center justify-center rounded-full',
          stepClass(index),
          'border-4 border-white'
        ]"
      >
        <span>{{ index + 1 }}</span>
      </div>

      <!-- Connecting line -->
      <div
          v-if="index < steps.length - 1"
          class="absolute top-1/2 transform -translate-y-1/2 h-1"
          :class="lineClass(index)"
          :style="{
          left: '50%',
          width: lineWidths[index],
          transition: 'width 1s ease-in-out, background-color 1s ease-in-out'
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';

const currentStep = ref(1);

// Accepting steps as props to make it reusable
const props = defineProps({
  steps: {
    type: Array,
    required: true
  }
});

const lineWidths = ref(Array(props.steps.length - 1).fill('100%')); // Line widths for connecting lines

const route = useRoute();

// Function to update stepper progress and step completion state
const updateStep = async () => {
  const routeName = route.name;

  // Check if routeName is defined
  if (!routeName) {
    console.warn('Route name is undefined');
    return; // Exit if route.name is undefined
  }

  const stepIndex = props.steps.findIndex(
      (step) => step.label.toLowerCase().replace(" ", "") === routeName.toLowerCase().replace(" ", "")
  );

  if (stepIndex >= 0) {
    currentStep.value = stepIndex + 1;
    props.steps.forEach((step, index) => {
      step.completed = index < stepIndex;
    });

    // Reset the line widths for animation
    lineWidths.value = lineWidths.value.map((width, index) =>
        index < stepIndex - 1 ? '100%' : '100%'
    );

    await nextTick();

    // Trigger line color animation
    if (stepIndex > 0) {
      lineWidths.value[stepIndex - 1] = '100%';
    }
  }
};

// Function to dynamically assign class for steps (blue, green, or gray)
const stepClass = (index) => {
  if (currentStep.value === index + 1) {
    return 'bg-blue-500 text-white';
  } else if (props.steps[index].completed) {
    return 'bg-green-500 text-white';
  } else {
    return 'bg-gray-300 text-gray-800';
  }
};

// Function to dynamically assign class for the connecting lines (blue or gray)
const lineClass = (index) => {
  return props.steps[index].completed ? 'bg-blue-500' : 'bg-gray-300';
};

watch(route, () => {
  updateStep();
});

onMounted(() => {
  updateStep();
});
</script>

