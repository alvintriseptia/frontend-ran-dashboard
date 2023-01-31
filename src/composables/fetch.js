import { ref, isRef, unref, watchEffect } from "vue";

export function useFetch(url) {
	const loading = ref(true);
	const data = ref(null);
	const error = ref(null);

	function doFetch() {
		// reset state before fetching..
		data.value = null;
		error.value = null;
		loading.value = true;
		// unref() unwraps potential refs
		fetch(unref(url))
			.then((res) => res.json())
			.then((json) => {
				if (json.status.toLowerCase() === "success") {
					console.log(json);
					data.value = json.data;
				} else {
					error.value = json.message;
				}
			})
			.catch((err) => {
				console.log(err);
				error.value = err.message;
			})
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

	return { loading, data, error, doFetch };
}
