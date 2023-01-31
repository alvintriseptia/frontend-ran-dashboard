import { onMounted, onUnmounted, ref } from "vue";
export const useRoute = () => {
	// define reactive variables
	const path = ref(window.location.pathname);
	const query = ref(window.location.search);
	const hash = ref(window.location.hash);

	// define a function to update the reactive variables
	const update = () => {
		path.value = window.location.pathname;
		query.value = window.location.search;
		hash.value = window.location.hash;
	};

	// add event listeners
	onMounted(() => {
		window.addEventListener("popstate", update);
	});

	onUnmounted(() => {
		window.removeEventListener("popstate", update);
	});

	return { path, query, hash };
};
