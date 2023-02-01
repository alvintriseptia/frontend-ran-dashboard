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
	width: {
		type: String,
		default: "100px",
	},
});

const value = ref(props.options[0].value);

console.log(props.value);

const emit = defineEmits(["onChange"]);

// handle change
const handleChange = (val) => {
	emit("onChange", val);
};
</script>
