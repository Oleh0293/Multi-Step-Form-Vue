<template>
  <div id="app" class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="max-w-lg w-full bg-white shadow-2xl rounded-2xl p-8">
      <!-- Import and use Stepper component -->
      <Stepper :steps="steps" />
      <!-- Content Section -->
      <div class="bg-white p-6 rounded-xl shadow-inner">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Stepper from './components/Stepper.vue'; // Import Stepper component

const steps = ref([
  { label: "Step 1", completed: false },
  { label: "Step 2", completed: false },
  { label: "Step 3", completed: false },
]);
</script>
