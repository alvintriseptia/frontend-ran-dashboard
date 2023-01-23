import { ref, isRef, unref, watchEffect } from "vue";

export function useFetch(url) {
	const loading = ref(true);
	const data = ref([]);
	const error = ref(null);

	function doFetch() {
		// reset state before fetching..
		data.value = null;
		error.value = null;
		loading.value = true;
		// unref() unwraps potential refs
		fetch(unref(url))
			.then((res) => res.json())
			.then((json) => (data.value = json.slice(0, 10)))
			.catch((err) => (error.value = err))
			.finally(() => (loading.value = false));
	}

	if (isRef(url)) {
		// setup reactive re-fetch if input URL is a ref
		watchEffect(doFetch);
	} else {
		// otherwise, just fetch once
		// and avoid the overhead of a watcher
		doFetch();
	}

	return { data, error, loading };
}
