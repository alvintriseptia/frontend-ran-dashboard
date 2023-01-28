<template>
	<div class="p-4 border border-gray-200 rounded-lg bg-white">
		<h2 class="text-xl font-bold mb-4">{{ title }}</h2>
		<slot />
	</div>
</template>

<script setup>
const props = defineProps({
	title: {
		type: String,
		required: true,
	},
});
</script>
