<template>
	<el-select
		v-model="value"
		:multiple="isMultiple"
		filterable
		remote
		reserve-keyword
		:placeholder="placeholder"
		remote-show-suffix
		:remote-method="remoteMethod"
		:loading="loading"
		class="w-[300px]"
		@change="onChange"
	>
		<el-option
			v-for="item in options"
			:key="item.value"
			:label="item.label"
			:value="item.value"
			v-loading="loading"
		/>
	</el-select>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, ref } from "vue";

// Define variable
const loading = ref(false);
const list = ref([]);
const options = ref([]);
const value = ref([]);

// Define props
const props = defineProps({
	options: {
		type: Array,
		default: () => [],
	},
	placeholder: {
		type: String,
		default: "Select",
	},
	isMultiple: {
		type: Boolean,
		default: true,
	},
	onUpdate: {
		type: Function,
		default: () => {},
	},
});

// Define emits
const emit = defineEmits(["onUpdate"]);

// onMounted, to set the initial value
onMounted(() => {
	list.value = props.options.map((item) => {
		return { value: `value:${item.value}`, label: `${item.label}` };
	});

	options.value = list.value.slice(0, 5);
});

// Define methods
// remoteMethod is used to search the options
const remoteMethod = (query) => {
	if (query) {
		loading.value = true;
		setTimeout(() => {
			loading.value = false;
			options.value = list.value.filter((item) => {
				return item.label.toLowerCase().includes(query.toLowerCase());
			});
		}, 200);
	} else {
		options.value = list.value.slice(0, 5);
	}
};

// onChange is used to emit the value
const onChange = (val) => {
	emit("onUpdate", val);
};
</script>
