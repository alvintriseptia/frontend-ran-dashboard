<template>
	<el-select
		v-model="value"
		filterable
		:placeholder="placeholder"
		autocomplete="off"
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
import { computed, onMounted, ref, watch } from "vue";

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
	defaultValue: {
		type: String,
		default: "",
	},
});

const options = computed(() => {
	if (props.options.length === 0) {
		value.value = "";
	}
	return props.options;
});

const value = ref("");

onMounted(() => {
	if (props.defaultValue) {
		value.value = props.defaultValue;
	}

	computed(
		() => props.defaultValue,
		(newVal) => {
			value.value = newVal;
		}
	);
});

const emit = defineEmits(["onChange"]);

// handle change
const handleChange = (val) => {
	emit("onChange", val);
};
</script>
