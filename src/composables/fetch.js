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
	const message = ref(null);
	const status = ref(null);
	const totalData = ref(null);
	const totalPage = ref(null);
	const filterData = ref(null);

	function doFetch() {
		if (unref(url) || (method !== "GET" && body !== null)) {
			console.log("fetching..." + unref(url));
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
						message.value = res.data.message;
						data.value = null;
					} else {
						data.value = res.data.data;
						if (res.data.hasOwnProperty("totalData")) {
							totalData.value = res.data.totalData;
						}
						if (res.data.hasOwnProperty("totalPage")) {
							totalPage.value = res.data.totalPage;
						}
						if (res.data.filters) {
							filterData.value = res.data.filters;
						}

						if (res.data.message) {
							message.value = res.data.message;
						} else {
							message.value = null;
						}
					}

					status.value = res.data.status;
				})
				.catch((err) => {
					if (!err.response) {
						// network error
						message.value = "Error: Network Error";
					} else {
						if (err.response.data.message === "Unauthorized") {
							window.location.replace("/login");
						}
						message.value = err.response.data.message;
					}

					// reset data state..
					data.value = null;
					status.value = "error";
				})
				.finally(() => {
					loading.value = false;
				});
		}
	}

	if (isRef(params) || isRef(headers) || isRef(body)) {
		// setup reactive re-fetch if input URL is a ref
		watchEffect(doFetch);
	} else {
		// otherwise, just fetch once
		// and avoid the overhead of a watcher
		doFetch();
	}

	return {
		data,
		status,
		message,
		loading,
		doFetch,
		totalData,
		totalPage,
		filterData,
	};
}
