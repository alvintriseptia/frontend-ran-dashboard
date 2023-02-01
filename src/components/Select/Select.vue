<template>
	<el-select
		v-model="value"
		filterable
		:placeholder="placeholder"
		@change="handleChange"
	>
		<el-option
			v-for="item in options"
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
	onChange: {
		type: Function,
		default: () => {},
	},
	placeholder: {
		type: String,
		default: "Select",
	},
});

const value = ref(props.options[0].value);

const emit = defineEmits(["onChange"]);

// handle change
const handleChange = (val) => {
	emit("onChange", val);
};
</script>
