import { createRouter,createWebHistory } from 'vue-router'

import Home from '../components/home.vue'
const routes = [
    {
        payh: '/',
        component: Home
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router