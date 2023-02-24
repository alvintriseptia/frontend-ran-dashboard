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
	{
		path: "/activities/:siteId",
		name: "activities-site",
		component: views.Activities,
		meta: { requiresAuth: true },
		props: true,
	},
	{
		path: "/sites",
		name: "sites",
		component: views.Sites,
		meta: { requiresAuth: true },
	},
	{
		path: "/accounts",
		name: "accounts",
		component: views.Accounts,
		meta: { requiresAuth: true },
	},
];

const router = new VueRouter({
	mode: "history",
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		// check if store not have user data
		if (userStore.getters.user === null) {
			userStore.dispatch("getUser").then(() => {
				userCheckRequireAuth(to, from, next);
			});
		} else {
			// store already has user data
			userCheckRequireAuth(to, from, next);
		}
	} else {
		userCheckGeneral(to, from, next);
	}
});

function userCheckRequireAuth(to, from, next) {
	if (userStore.getters.isLoggedIn) {
		// if user is logged in and tries to access login page, redirect to dashboard
		if (to.path === "/login") {
			next("/");
			return;
		}

		//	if user is not admin and tries to access sites page, redirect to dashboard
		if (
			(to.path === "/sites" || to.path === "/accounts") &&
			userStore.getters.role !== "admin"
		) {
			next("/");
			return;
		}

		// else
		next();
		return;
	} else {
		// if user is not logged in and tries to access any page other than login, redirect to login page
		if (to.path !== "/login") {
			next("/login");
			return;
		}
	}
}

function userCheckGeneral(to, from, next) {
	// if user is logged in and tries to access any page other than login, redirect to login page
	if (to.path === "/login") {
		if (userStore.getters.user === null) {
			userStore.dispatch("getUser").then(() => {
				if (userStore.getters.isLoggedIn) {
					next("/");
					return;
				}
			});
		} else {
			if (userStore.getters.isLoggedIn) {
				next("/");
				return;
			}
		}
	}

	// check if path does not exist
	if (to.matched.length === 0) {
		next("/");
		return;
	}

	next();
}

export default router;
