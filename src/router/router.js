import VueRouter from "vue-router";
import * as views from "@/views";
import { userStore } from "@/stores";

const routes = [
	{
		path: "/",
		name: "dashboard",
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
	if (to.path === "/login") {
		if (userStore.getters.user === null) {
			userStore.dispatch("getUser").then(() => {
				if (userStore.getters.isLoggedIn) {
					next("/");
				}
			});
		} else {
			if (userStore.getters.isLoggedIn) {
				next("/");
			}
		}
		return;
	}

	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (userStore.getters.user === null) {
			userStore.dispatch("getUser").then(() => {
				if (userStore.getters.isLoggedIn) {
					if (to.path === "/login") {
						next("/");
						return;
					}
					next();
					return;
				} else {
					if (to.path !== "/login") {
						next("/login");
						return;
					}
				}
			});
		} else {
			if (userStore.getters.isLoggedIn) {
				if (to.path === "/login") {
					next("/");
					return;
				}
				next();
				return;
			} else {
				if (to.path !== "/login") {
					next("/login");
					return;
				}
			}
		}
	} else {
		next();
	}
});

export default router;
