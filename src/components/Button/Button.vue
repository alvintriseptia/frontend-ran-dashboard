<template>
	<button
		v-on:click="$emit('onClick')"
		class="px-4 py-2 rounded-lg text-white bg-primary hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition-all"
		:class="{
			'opacity-50 cursor-not-allowed': props.disabled,
			'px-4 py-2': props.size === 'md',
			'px-2 py-1 text-xs': props.size === 'sm',
		}"
		:disabled="disabled"
		:type="type"
	>
		<slot />
	</button>
</template>

<script setup>
import { computed } from "vue";

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

const disabled = computed(() => props.disabled);
</script>
