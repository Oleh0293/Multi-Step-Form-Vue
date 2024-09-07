import { createRouter, createWebHistory } from 'vue-router';
import Step1 from '../components/Step1.vue';
import Step2 from '../components/Step2.vue';
import Step3 from '../components/Step3.vue';

const routes = [
    { path: '/', name: 'Step1', component: Step1 },
    { path: '/step2', name: 'Step2', component: Step2, props: true },
    { path: '/step3', name: 'Step3', component: Step3, props: true },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
