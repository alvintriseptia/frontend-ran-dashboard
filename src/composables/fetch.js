import { ref, isRef, unref, watchEffect } from "vue";
import axios from "axios";

export function useFetch({
	url,
	params = null,
	headers = null,
	body = null,
	method = "GET",
}) {
	const loading = ref(true);
	const data = ref(null);
	const error = ref(null);
	const totalData = ref(null);
	const totalPage = ref(null);
	const filterData = ref(null);

	function doFetch() {
		if (url || (method !== "GET" && body !== null)) {
			// set state loading before fetching..
			loading.value = true;
			// unref() unwraps potential refs
			axios({
				url: unref(url),
				params: unref(params),
				headers: unref(headers),
				method,
				data: unref(body),
			})
				.then((res) => {
					// if status error
					if (res.data.status === "error") {
						if (res.data.message === "Unauthorized") {
							window.location.replace("/login");
						}
						error.value = res.data.message;
					} else {
						data.value = res.data.data;
						if (res.data.totalData) {
							totalData.value = res.data.totalData;
						}
						if (res.data.totalPage) {
							totalPage.value = res.data.totalPage;
						}
						if (res.data.filters) {
							filterData.value = res.data.filters;
						}
						error.value = null;
					}
				})
				.catch((err) => {
					if (!err.response) {
						// network error
						error.value = "Error: Network Error";
					} else {
						if (err.response.data.message === "Unauthorized") {
							window.location.replace("/login");
						}
						error.value = err.message;
					}

					// reset data state..
					data.value = null;
				})
				.finally(() => {
					loading.value = false;
				});
		}
	}

	if (url || isRef(params) || isRef(headers) || isRef(body)) {
		// setup reactive re-fetch if input URL is a ref
		watchEffect(doFetch);
	} else {
		// otherwise, just fetch once
		// and avoid the overhead of a watcher
		doFetch();
	}

	return { data, error, loading, doFetch, totalData, totalPage, filterData };
}
