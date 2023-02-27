<template>
	<el-table
		ref="targetEl"
		:data="data"
		:fixed="false"
		nowrap="nowrap"
		:style="`min-height:${
			fixedMinHeight ? fixedMinHeight : minHeight
		}px; font-size: 12px;`"
		:header-cell-style="headerCellStyle"
		:cell-class-name="cellClassChecker"
		row-class-name="no-hover-table"
		max-height="700"
	>
		<slot v-if="shouldRender" />
	</el-table>
</template>

<script>
import { useIntersectionObserver } from "@vueuse/core";
import { ref, nextTick } from "vue";

function onIdle(cb = () => {}) {
	if ("requestIdleCallback" in window) {
		window.requestIdleCallback(cb);
	} else {
		setTimeout(() => {
			nextTick(cb);
		}, 300);
	}
}

export default {
	props: {
		renderOnIdle: Boolean,
		unrender: Boolean,
		minHeight: {
			type: Number,
			default: 400,
		},
		unrenderDelay: {
			type: Number,
			default: 300,
		},
		cellClassChecker: {
			type: Function,
			default: () => {},
		},
		headerCellStyle: {
			type: Object,
			default: () => ({}),
		},
		data: {
			type: Array,
			default: () => [],
		},
	},
	setup(props) {
		const shouldRender = ref(false);
		const targetEl = ref();
		const fixedMinHeight = ref(0);
		let unrenderTimer;
		let renderTimer;

		const { stop } = useIntersectionObserver(
			targetEl,
			([{ isIntersecting }]) => {
				if (isIntersecting) {
					// perhaps the user re-scrolled to a component that was set to unrender. In that case stop the unrendering timer
					clearTimeout(unrenderTimer);
					// if we're dealing underndering lets add a waiting period of 200ms before rendering. If a component enters the viewport and also leaves it within 200ms it will not render at all. This saves work and improves performance when user scrolls very fast
					renderTimer = setTimeout(
						() => (shouldRender.value = true),
						props.unrender ? 300 : 0
					);
					shouldRender.value = true;
					if (!props.unrender) {
						stop();
					}
				} else if (props.unrender) {
					// if the component was set to render, cancel that
					clearTimeout(renderTimer);
					unrenderTimer = setTimeout(() => {
						fixedMinHeight.value = targetEl.value.clientHeight;
						shouldRender.value = false;
					}, props.unrenderDelay);
				}
			},
			{
				rootMargin: "600px",
			}
		);

		if (props.renderOnIdle) {
			onIdle(() => {
				shouldRender.value = true;
				if (!props.unrender) {
					stop();
				}
			});
		}

		return { targetEl, shouldRender, fixedMinHeight };
	},
};
</script>
