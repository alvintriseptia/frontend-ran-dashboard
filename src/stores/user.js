import { Store } from "vuex";
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const userStore = new Store({
	state: {
		user: {
			role: "admin",
		},
	},
	mutations: {
		setUser(state, user) {
			state.user = user;
		},
	},
	actions: {
		async login({ commit }, { username, password }) {
			const response = await axios.post("/api/login", { username, password });
			commit("setUser", response.data);
		},
		async getUser() {
			const response = await axios.get("/api/user");
			commit("setUser", response.data);
		},
		async logout({ commit }) {
			await axios.post("/api/logout");
			commit("setUser", null);
		},
	},
	getters: {
		user(state) {
			return state.user;
		},
		isLoggedIn(state) {
			return state.user !== null;
		},
		userRole(state) {
			return state.user.role;
		},
	},
});
