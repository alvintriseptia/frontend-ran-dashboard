import { onMounted, onUnmounted, ref } from "vue";

export function useWindow() {
	// define reactive variables
	const windowWidth = ref(window.innerWidth);
	const isMobile = ref(window.innerWidth <= 1024);

	// define a function to update the reactive variables
	function updateWindow(event) {
		windowWidth.value = window.innerWidth;
		isMobile.value = window.innerWidth <= 1024;
	}

	// add event listeners
	onMounted(() => {
		window.addEventListener("resize", updateWindow);
	});

	onUnmounted(() => {
		window.removeEventListener("resize", updateWindow);
	});

	return { windowWidth, isMobile };
}
