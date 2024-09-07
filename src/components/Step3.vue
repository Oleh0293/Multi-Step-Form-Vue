<template>
  <div class="max-w-md mx-auto bg-white p-6">
    <h2 class="text-xl font-semibold text-gray-700 mb-4">Doświadczenie zawodowe</h2>
    <form @submit.prevent="submitForm">
      <div v-for="(experience, index) in form.experiences" :key="index" class="mb-4 border-b pb-4">
        <div class="mb-4 relative">
          <label for="company" class="block text-gray-600 mb-2">Firma:</label>
          <input
              v-model="experience.company"
              type="text"
              id="company"
              placeholder="Wprowadź nazwę firmy"
              class="input-field w-full border border-gray-300 rounded-xl p-3 pl-10 text-gray-900"
          />
          <!-- Icon for Company Field -->
          <i class="fa fa-building absolute left-4 top-3.1rem text-gray-400"></i>
        </div>
        <div class="mb-4 relative">
          <label for="position" class="block text-gray-600 mb-2">Stanowisko:</label>
          <input
              v-model="experience.position"
              type="text"
              id="position"
              placeholder="Wprowadź stanowisko"
              class="input-field w-full border border-gray-300 rounded-xl p-3 pl-10 text-gray-900"
          />
          <!-- Icon for Position Field -->
          <i class="fa fa-briefcase absolute left-4 top-3.1rem text-gray-400"></i>
        </div>
        <div class="mb-4">
          <label for="dateFrom" class="block text-gray-600 mb-2">Data od:</label>
          <input
              v-model="experience.dateFrom"
              type="date"
              id="dateFrom"
              class="input-field w-full border border-gray-300 rounded-xl p-3 text-gray-900"
          />
        </div>
        <div class="mb-4">
          <label for="dateTo" class="block text-gray-600 mb-2">Data do:</label>
          <input
              v-model="experience.dateTo"
              type="date"
              id="dateTo"
              class="input-field w-full border border-gray-300 rounded-xl p-3 text-gray-900"
          />
        </div>
        <button
            type="button"
            @click="removeExperience(index)"
            class="bg-red-500 text-white rounded-xl px-4 py-3"
        >
          Usunąć
        </button>
      </div>
      <!-- Plus Icon Button to Add More Experience -->
      <div class="flex justify-start mb-4">
        <button
            type="button"
            @click="addExperience"
            class="flex items-center justify-center w-2/3 h-10 bg-green-500 text-white rounded-full hover:bg-green-600"
            title="Dodaj doświadczenie"
        >
          <img src="@/assets/icons/add-experience.svg" alt="Dodaj doświadczenie" class="w-10 h-6"/>
          Dodaj doświadczenie
        </button>
      </div>
      <div class="flex justify-between">
        <button
            type="button"
            @click="prevStep"
            class="bg-gray-200 text-gray-700 rounded-xl px-4 py-3"
        >
          Poprzedni
        </button>
        <button
            type="submit"
            class="bg-blue-500 text-white rounded-xl px-4 py-3"
        >
          Prześlij
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';  // Import SweetAlert2
import { Form, Experience } from '@/types/formTypes';

const route = useRoute();
const router = useRouter();

const queryForm = route.query.form as string | undefined;
const form = ref<Form>({
  experiences: [],
});

if (queryForm) {
  const parsedForm = JSON.parse(queryForm);
  form.value = { ...form.value, ...parsedForm };
}

const addExperience = () => {
  if (form.value.experiences){
    form.value.experiences.push({
      company: '',
      position: '',
      dateFrom: '',
      dateTo: '',
    } as Experience);
  } else {
    console.error('Experience form is empty!')
  }
};

const removeExperience = (index: number) => {
  if (form.value.experiences){
    form.value.experiences.splice(index, 1);
  } else {
    console.error('Experience form is empty!')
  }
};

/**
 * Function to handle form submission.
 * This function simulates sending the form data to a server.
 * The form data is logged to the console, and a success alert is shown using SweetAlert2.
 */
const submitForm = () => {
  // Show a success message using SweetAlert2
  Swal.fire({
    title: 'Success!',
    text: 'Formularz został pomyślnie wysłany!',
    icon: 'success',
    confirmButtonText: 'OK'
  });

  console.log('Submitted data:', form.value);
};

/**
 * Function to handle moving to the previous step.
 * This function navigates back to Step 2.
 */
const prevStep = () => {
  router.push({ name: 'Step2' });
};
</script>
