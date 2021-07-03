import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import CardListView from "../views/CardListView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "CardList",
    component: CardListView,
    meta: { title: "MtG Cards" }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: { title: "About" }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
