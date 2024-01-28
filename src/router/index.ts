import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{ path: "/", name: "Main", component: () => import("@/pages/MainPage.vue") },
	{ path: "/bills", name: "Bills", component: () => import("@/pages/BillPage.vue") },
	{ path: "/residents", name: "Auth", component: () => import("@/pages/ResidentsPage.vue") },
	{ path: "/:catchAll(.*)", redirect: "/" },
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
