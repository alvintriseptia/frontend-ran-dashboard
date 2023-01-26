import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
	state: () => ({ count: 0 }),
	getters: {
		doubleCount: (state) => state.count * 2,
	},
	actions: {
		increment() {
			console.log("incrementing");
			this.count++;
		},
		decrement() {
			console.log("decrementing");
			this.count--;
		},
	},
});
