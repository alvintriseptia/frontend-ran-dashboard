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
				axios({
					url: "/api/auth/login",
					method: "POST",
					data: form,
					timeout: 60000, // wait 60 seconds before timing out
				})
					.then((response) => {
						if (response.data.status === "success") {
							commit("setUser", response.data.data);
							resolve(response);
						} else {
							commit("setUser", { role: null, username: null });
							reject(response);
						}
					})
					.catch((error) => {
						commit("setUser", { role: null, username: null });
						reject(error);
					});
			});
		},
		async getUser({ commit }) {
			try {
				commit("setLoading", true);
				const response = await axios({
					url: "/api/auth/user",
					method: "GET",
					timeout: 60000, // wait 60 seconds before timing out
				});
				if (response.data.status === "success") {
					commit("setUser", response.data.data);
				} else {
					commit("setUser", { role: null, username: null });
					if (
						router.currentRoute.path !== "/login" &&
						router.currentRoute.path !== "/reset"
					) {
						router.push("/login");
					}
				}
			} catch (error) {
				commit("setUser", { role: null, username: null });
				if (
					router.currentRoute.path !== "/login" &&
					router.currentRoute.path !== "/reset"
				) {
					router.push("/login");
				}
			} finally {
				commit("setLoading", false);
			}
		},
		async logout({ commit }) {
			try {
				const response = await axios({
					url: "/api/auth/logout",
					method: "POST",
					timeout: 60000, // wait 60 seconds before timing out
				});
				if (response.data.status === "success") {
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
