<template>
	<div
		class="p-4 border border-gray-200 rounded-lg bg-white overflow-y-auto"
		:style="{ maxHeight: maxHeight }"
	>
		<div class="mb-4">
			<h2 class="text-xl font-bold">{{ title }}</h2>
			<p v-if="subtitle" class="text-sm text-gray-500">
				{{ subtitle }}
			</p>
		</div>
		<slot />
	</div>
</template>

<script setup>
const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	subtitle: {
		type: String,
		default: "",
	},
	maxHeight: {
		type: String,
		default: "auto",
	},
});
</script>
