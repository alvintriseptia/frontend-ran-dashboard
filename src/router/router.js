import VueRouter from "vue-router";
import * as views from "@/views";

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
	{
		path: "/maps",
		name: "maps",
		component: views.Maps,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
