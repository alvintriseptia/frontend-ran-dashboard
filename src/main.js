import Vue from "vue";
import ElementUI from "element-ui";
import axios from "axios";
import "@/styles/scss/element-variables.scss";

import App from "@/App.vue";
import router from "@/router/router";
import "@/styles/index.css";
import VueRouter from "vue-router";
import locale from "element-ui/lib/locale/lang/id";

axios.defaults.baseURL = "http://localhost:8080";
// axios.defaults.headers.common["Access-Control-Allow-Origin"] =
// 	"http://localhost:8080";
axios.defaults.withCredentials = true;

Vue.use(VueRouter);
Vue.use(ElementUI, { locale });

const app = new Vue({
	router,
	ElementUI,
	render: function (createElement) {
		return createElement(App);
	},
});

app.$mount("#app");
