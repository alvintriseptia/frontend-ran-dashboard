<template>
	<el-select v-model="value" filterable placeholder="Select">
		<el-option
			v-for="item in props.options"
			:key="item.value"
			:label="item.label"
			:value="item.value"
		/>
	</el-select>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
	options: {
		type: Array,
		default: () => [],
	},
});

const value = ref("");
</script>
