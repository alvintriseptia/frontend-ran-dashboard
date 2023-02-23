import { Store } from "vuex";
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { Notification } from "element-ui";
import router from "@/router/router";

Vue.use(Vuex);

export const userStore = new Store({
	state: {
		user: null,
		loading: false,
	},
	mutations: {
		setUser(state, user) {
			state.user = user;
		},
		setLoading(state, loading) {
			state.loading = loading;
		},
	},
	actions: {
		login({ commit }, { username, password }) {
			return new Promise((resolve, reject) => {
				const form = new FormData();
				form.append("username", username);
				form.append("password", password);
				axios
					.post("/api/auth/login", form)
					.then((response) => {
						if (response.data.status === "success") {
							commit("setUser", response.data.data);
							resolve(response);
						} else {
							commit("setUser", null);
							reject(response);
						}
					})
					.catch((error) => {
						commit("setUser", null);
						reject(error);
					});
			});
		},
		async getUser({ commit }) {
			try {
				commit("setLoading", true);
				const response = await axios.get("/api/auth/user");
				if (response.data.status === "success") {
					commit("setUser", response.data.data);
				} else {
					commit("setUser", null);
					if (router.currentRoute.path !== "/login") {
						router.push("/login");
					}
				}
			} catch (error) {
				commit("setUser", null);
				if (router.currentRoute.path !== "/login") {
					router.push("/login");
				}
			} finally {
				commit("setLoading", false);
			}
		},
		async logout({ commit }) {
			try {
				const response = await axios.post("/api/auth/logout");
				if (response.data.status === "success") {
					commit("setUser", null);
					window.location.replace("/");
				} else {
					Notification.error({
						title: "Error",
						message: "Logout Failed",
					});
				}
			} catch (error) {
				// console.log(error);
				Notification.error({
					title: "Error",
					message: "Logout Failed",
				});
			}
		},
	},
	getters: {
		user(state) {
			return state.user;
		},
		isLoggedIn(state) {
			return state.user != null && state.user.role !== null;
		},
		role(state) {
			return state.user.role;
		},
		loading(state) {
			return state.loading;
		},
	},
});
