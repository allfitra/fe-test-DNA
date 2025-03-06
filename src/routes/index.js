import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/home-page.vue";
import NotFoundView from "../components/not-found.vue";

console.log(NotFoundView);

const routes = [
  { path: "/", component: HomePage },
  { path: "/:pathMatch(.*)*", component: NotFoundView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
