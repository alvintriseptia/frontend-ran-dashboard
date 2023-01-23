import { createRouter, createWebHistory } from "vue-router";
import * as views from "../views";

const routes = [
	{
		path: "/",
		name: "home",
		component: views.Home,
	},
	{
		path: "/count",
		name: "count",
		component: views.Count,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
