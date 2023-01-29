import VueRouter from "vue-router";
import * as views from "@/views";

const routes = [
	{
		path: "/",
		name: "home",
		component: views.Dashboard,
	},
	{
		path: "/project-planner",
		name: "project-planner",
		component: views.ProjectPlanner,
	},
];

const router = new VueRouter({
	mode: "history",
	routes,
});

export default router;
