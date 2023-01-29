import { onMounted, onUnmounted, ref } from "vue";
export const useRoute = () => {
	const path = ref(window.location.pathname);
	const query = ref(window.location.search);
	const hash = ref(window.location.hash);

	const update = () => {
		path.value = window.location.pathname;
		query.value = window.location.search;
		hash.value = window.location.hash;
	};

	onMounted(() => {
		window.addEventListener("popstate", update);
	});

	onUnmounted(() => {
		window.removeEventListener("popstate", update);
	});

	return { path, query, hash };
};
