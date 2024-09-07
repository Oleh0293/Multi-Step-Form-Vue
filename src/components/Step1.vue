<template>
  <div class="max-w-md mx-auto bg-white p-8">
    <h2 class="text-2xl font-semibold text-gray-800 mb-6">Dane podstawowe</h2>
    <!-- Form for entering basic data -->
    <form @submit.prevent="nextStep">
      <!-- Input field for First Name -->
      <div class="mb-6 relative">
        <label for="firstName" class="block text-gray-600 font-medium mb-2">Imię:</label>
        <input
            v-model="form.firstName"
            type="text"
            id="firstName"
            placeholder="Enter first name"
            class="input-field w-full border border-gray-300 rounded-xl p-3 pl-10 text-gray-900"
            required
        />
        <!-- Icon for the First Name field -->
        <i class="fa fa-user absolute left-4 top-3.1rem text-gray-400"></i>
      </div>

      <!-- Input field for Last Name -->
      <div class="mb-6 relative">
        <label for="lastName" class="block text-gray-600 font-medium mb-2">Nazwisko:</label>
        <input
            v-model="form.lastName"
            type="text"
            id="lastName"
            placeholder="Enter last name"
            class="input-field w-full border border-gray-300 rounded-xl p-3 pl-10 text-gray-900"
            required
        />
        <!-- Icon for the Last Name field -->
        <i class="fa fa-id-card absolute left-4 top-3.1rem text-gray-400"></i>
      </div>

      <!-- Input field for Birth Date -->
      <div class="mb-6 relative">
        <label for="birthDate" class="block text-gray-600 font-medium mb-2">Data urodzenia:</label>
        <input
            v-model="form.birthDate"
            type="date"
            id="birthDate"
            class="input-field w-full border border-gray-300 rounded-xl p-3 text-gray-900"
            required
        />
      </div>

      <!-- Button to proceed to the next step -->
      <button
          type="submit"
          class="w-full bg-blue-600 text-white rounded-xl py-3 font-medium hover:bg-blue-700 transition duration-200"
      >
        Next
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { Form } from '@/types/formTypes';

// Initialize the router for navigation
const router = useRouter();

// Reactive state for the form data
const form = ref<Form>({
  firstName: '',
  lastName: '',
  birthDate: '',
});

// Maximum allowed date (current date)
const maxDate = new Date().toISOString().split('T')[0];

// Function triggered on form submission
const nextStep = () => {
  // Check if the birth date is provided
  if (!form.value.birthDate) {
    Swal.fire({
      title: 'Error!',
      text: 'Please enter your birth date.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return;
  }

  // Compare birth date with today's date
  const birthDate = new Date(form.value.birthDate);
  const today = new Date(maxDate);

  if (birthDate >= today) {
    Swal.fire({
      title: 'Error!',
      text: 'Birth date must be earlier than today.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return;
  }

  // Proceed to the next step and pass the form data
  router.push({ name: 'Step2', query: { form: JSON.stringify(form.value) } });
};

</script>
