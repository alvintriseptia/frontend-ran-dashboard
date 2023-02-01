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
		collapse-tags
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
import { defineProps, defineEmits, onMounted, ref, computed } from "vue";

// Define variable
const loading = ref(false);
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
	onChange: {
		type: Function,
		default: () => {},
	},
});

// Define emits
const emit = defineEmits(["onUpdate", "onChange"]);

// onMounted, to set the initial value
onMounted(() => {
	options.value = computed(() => {
		return props.options.map((item) => {
			return {
				value: item.deskripsiActivity,
				label: item.deskripsiActivity,
			};
		});
	});
});

// check if the value is changed

// Define methods
// remoteMethod is used to search the options
const remoteMethod = (query) => {
	if (query) {
		loading.value = true;
		emit("onChange", query);
		loading.value = false;
	}
};

// onChange is used to emit the value
const onChange = (val) => {
	emit("onUpdate", val);
};
</script>
