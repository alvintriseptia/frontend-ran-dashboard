import VueRouter from "vue-router";
import * as views from "@/views";

const routes = [
	{
		path: "/",
		name: "home",
		component: views.Dashboard,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
