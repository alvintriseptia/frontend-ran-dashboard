import { createRouter, createWebHistory } from "vue-router";
import * as views from "../views";

const routes = [
	{
		path: "/",
		name: "home",
		component: views.Home,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
