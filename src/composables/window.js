import { onMounted, onUnmounted, ref } from "vue";

export function useWindow() {
	const windowWidth = ref(window.innerWidth);
	const isMobile = ref(window.innerWidth < 768);

	function updateWindow(event) {
		windowWidth.value = window.innerWidth;
		isMobile.value = window.innerWidth < 768;
	}

	onMounted(() => {
		window.addEventListener("resize", updateWindow);
	});

	onUnmounted(() => {
		window.removeEventListener("resize", updateWindow);
	});

	return { windowWidth, isMobile };
}
