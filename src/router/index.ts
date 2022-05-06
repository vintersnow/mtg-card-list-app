import { createRouter, createWebHistory } from "vue-router";
import CardListView from "@/views/CardListView.vue";
import CardDetailView from "@/views/CardDetailView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "CardList",
      component: CardListView,
      meta: { title: "MtG Cards" },
    },
    {
      path: "/card/:cardId",
      name: "CardDetail",
      component: CardDetailView,
      meta: { title: "MtG Card" },
      props: true,
    },
    {
      path: "/about",
      name: "About",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/AboutView.vue"),
    },
  ],
});

export default router;
