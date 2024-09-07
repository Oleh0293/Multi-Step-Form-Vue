<template>
  <div class="max-w-md mx-auto bg-white p-6">
    <h2 class="text-xl font-semibold text-gray-700 mb-4">Dane kontaktowe</h2>
    <form @submit.prevent="nextStep">
      <!-- Input field for phone number -->
      <div class="mb-4 relative">
        <label for="phone" class="block text-gray-600 mb-2">Telefon:</label>
        <input
            v-model="form.phone"
            type="text"
            id="phone"
            class="input-field w-full border border-gray-300 rounded-xl p-3 pl-10 text-gray-900"
            placeholder="+380XXXXXXXXX"
            required
        />
        <!-- Icon for phone field -->
        <i class="fa fa-phone absolute left-4 top-3.1rem text-gray-400"></i>
      </div>
      <!-- Input field for email -->
      <div class="mb-4 relative">
        <label for="email" class="block text-gray-600 mb-2">Email:</label>
        <input
            v-model="form.email"
            type="email"
            id="email"
            class="input-field w-full border border-gray-300 rounded-xl p-3 pl-10 text-gray-900"
            placeholder="example@email.com"
            required
        />
        <!-- Icon for email field -->
        <i class="fa fa-envelope absolute left-4 top-3.1rem text-gray-400"></i>
      </div>

      <!-- Navigation buttons (Previous / Next) -->
      <div class="flex justify-between">
        <!-- Button to go back to the previous step -->
        <button
            type="button"
            @click="prevStep"
            class="bg-gray-200 text-gray-700 rounded-xl px-10 py-3"
        >
          Previous
        </button>
        <!-- Button to proceed to the next step -->
        <button
            type="submit"
            class="bg-blue-500 text-white rounded-xl px-20 py-3"
        >
          Next
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { Form } from '@/types/formTypes';

const route = useRoute();
const router = useRouter();

// Form state initialized with phone and email fields
const form = ref<Form>({
  phone: '',
  email: '',
});

// Check if any form data was passed from the previous step
const queryForm = route.query.form as string | undefined;
if (queryForm) {
  const parsedForm = JSON.parse(queryForm);
  // Merge form data from the query if available
  form.value = { ...form.value, ...parsedForm };
}

// Function to handle moving to the next step
const nextStep = () => {
  // Validate phone number presence
  if (!form.value.phone) {
    Swal.fire({
      title: 'Error!',
      text: 'Please enter a phone number.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return;
  }

  // Validate phone number format using regex
  const phoneRegex = /^\+?\d{10,13}$/;
  if (!phoneRegex.test(form.value.phone)) {
    Swal.fire({
      title: 'Error!',
      text: 'Invalid phone number.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return;
  }

  // Validate email presence
  if (!form.value.email) {
    Swal.fire({
      title: 'Error!',
      text: 'Please enter an email address.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return;
  }

  // Move to the next step if validation is successful
  router.push({ name: 'Step3', query: { form: JSON.stringify(form.value) } });
};

// Function to handle going back to the previous step
const prevStep = () => {
  router.push({ name: 'Step1' });
};
</script>
