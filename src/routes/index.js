import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/home-page.vue";
import NewsListPage from "../pages/article-list.vue";
import NotFoundView from "../components/not-found.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/news-list", component: NewsListPage },
  { path: "/:pathMatch(.*)*", component: NotFoundView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
