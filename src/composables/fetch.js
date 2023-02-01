import { ref, isRef, unref, watchEffect } from "vue";
import axios from "axios";

export function useFetch({
	url,
	params = null,
	headers = null,
	method = "GET",
}) {
	const loading = ref(true);
	const data = ref([]);
	const error = ref(null);
	const totalData = ref(null);
	const totalPage = ref(null);

	function doFetch() {
		// set state loading before fetching..
		loading.value = true;
		// unref() unwraps potential refs
		axios({
			url: unref(url),
			params: unref(params),
			headers: unref(headers),
			method,
			baseURL: "http://localhost:8080",
		})
			.then((res) => {
				data.value = res.data.data;

				// if status error
				if (res.data.status === "error") {
					error.value = res.data.message;
				} else {
					if (res.data.totalData) {
						totalData.value = res.data.totalData;
					}
					if (res.data.totalPage) {
						totalPage.value = res.data.totalPage;
					}
					error.value = null;
				}
			})
			.catch((err) => {
				error.value = err.message;

				// reset state before fetching..
				data.value = null;
			})
			.finally(() => {
				loading.value = false;
			});
	}

	if (isRef(url) || isRef(params) || isRef(headers)) {
		// setup reactive re-fetch if input URL is a ref
		watchEffect(doFetch);
	} else {
		// otherwise, just fetch once
		// and avoid the overhead of a watcher
		doFetch();
	}

	return { data, error, loading, doFetch, totalData, totalPage };
}
