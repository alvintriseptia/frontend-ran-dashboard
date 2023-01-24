<template>
	<button
		class="px-4 py-2 rounded-lg text-primary border border-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition-all"
		:class="{ 'opacity-50 cursor-not-allowed': props.disabled }"
		:disabled="props.disabled"
		:type="props.type"
	>
		<slot />
	</button>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
	type: {
		type: String,
		default: "button",
	},
	disabled: {
		type: Boolean,
		default: false,
	},
});
</script>
