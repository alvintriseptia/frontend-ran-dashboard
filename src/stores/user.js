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
	},
	mutations: {
		setUser(state, user) {
			state.user = user;
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
							Notification.success({
								title: "Success",
								message: "Login Successful",
							});
							resolve(response);
						} else {
							commit("setUser", null);
							Notification.error({
								title: "Error",
								message: response.data.message,
							});
							reject(response);
						}
					})
					.catch((error) => {
						commit("setUser", null);
						Notification.error({
							title: "Error",
							message: "Login Failed",
						});
						reject(error);
					});
			});
		},
		loginGuest({ commit }) {
			return new Promise((resolve, reject) => {
				axios
					.post("/api/auth/login-guest")
					.then((response) => {
						if (response.data.status === "success") {
							commit("setUser", response.data.data);
							Notification.success({
								title: "Success",
								message: "Login Successful",
							});
							resolve(response);
						} else {
							commit("setUser", null);
							Notification.error({
								title: "Error",
								message: response.data.message,
							});
							reject(response);
						}
					})
					.catch((error) => {
						commit("setUser", null);
						Notification.error({
							title: "Error",
							message: "Login Failed",
						});
						reject(error);
					});
			});
		},
		async getUser({ commit }) {
			try {
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
				console.log(error);
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
	},
});
