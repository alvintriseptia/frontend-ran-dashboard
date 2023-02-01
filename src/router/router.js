import VueRouter from "vue-router";
import * as views from "@/views";
import { userStore } from "@/stores";

const routes = [
	{
		path: "/",
		name: "home",
		component: views.Dashboard,
		meta: { requiresAuth: true },
	},
	{
		path: "/login",
		name: "login",
		component: views.Login,
	},
	{
		path: "/project-planner",
		name: "project-planner",
		component: views.ProjectPlanner,
		meta: { requiresAuth: true },
	},
	{
		path: "/activities",
		name: "activities",
		component: views.Activities,
		meta: { requiresAuth: true },
	},
];

const router = new VueRouter({
	mode: "history",
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (userStore.getters.isLoggedIn) {
			next();
			return;
		}
		next("/login");
	} else {
		next();
	}
});

export default router;
