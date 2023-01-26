import { createPinia } from "pinia";
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import App from "@/App.vue";
import router from "@/router/router";
import "@/styles/index.css";
import VueRouter from "vue-router";

const pinia = createPinia();

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(pinia);

const app = new Vue({
	router,
	pinia,
	ElementUI,
	render: function (createElement) {
		return createElement(App);
	},
}).$mount("#app");
