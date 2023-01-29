import { createPinia } from "pinia";
import Vue from "vue";
import ElementUI from "element-ui";
import "@/styles/scss/element-variables.scss";

import App from "@/App.vue";
import router from "@/router/router";
import "@/styles/index.css";
import VueRouter from "vue-router";
import locale from "element-ui/lib/locale/lang/id";

const pinia = createPinia();

Vue.use(VueRouter);
Vue.use(ElementUI, { locale });
Vue.use(pinia);

const app = new Vue({
	router,
	pinia,
	ElementUI,
	render: function (createElement) {
		return createElement(App);
	},
});

app.$mount("#app");
