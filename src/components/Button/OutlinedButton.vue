<template>
	<button
		v-on:click="$emit('onClick')"
		class="font-medium rounded-lg text-primary border border-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition-all"
		:class="{
			'opacity-50 cursor-not-allowed': props.disabled,
			'px-4 py-2': props.size === 'md',
			'px-2 py-1 text-sm': props.size === 'sm',
		}"
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
	size: {
		type: String,
		default: "md",
	},
});
</script>
