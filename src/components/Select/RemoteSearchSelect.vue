<template>
  <el-select
    v-model="value"
    :multiple="isMultiple"
    filterable
    remote
    reserve-keyword
    :placeholder="placeholder"
    remote-show-suffix
    autocomplete="off"
    :remote-method="remoteMethod"
    :loading="loading"
    :collapse-tags="collapseTags"
    @change="onChange"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      v-loading="loading"
      :label="item.label"
      :value="item.value"
      type
    />
  </el-select>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, ref, computed, watch } from "vue";

// Define variable
const loading = ref(false);
const options = ref([]);
const value = ref(props.modelValue);

// Define props
const props = defineProps({
	options: {
		type: Array,
		default: () => [],
	},
	defaultValue: {
		type: [Array, String],
		default: () => [],
	},
	modelValue: {
		type: [Array, String],
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
	labelOption: {
		type: String,
		required: true,
	},
	valueOption: {
		type: String,
		required: true,
	},
	onUpdate: {
		type: Function,
		default: () => { },
	},
	onChange: {
		type: Function,
		default: () => { },
	},
	collapseTags: {
		type: Boolean,
		default: true,
	},
});

// Define emits
const emit = defineEmits(["onUpdate", "onChange"]);

// onMounted, to set the initial value
onMounted(() => {
	options.value = computed(() => {
		if (props.options && props.defaultValue.length > 0) {
			// eslint-disable-next-line vue/no-side-effects-in-computed-properties
			value.value = props.defaultValue;
		}
		return props.options
			? props.options.map((item) => {
				const label = props.labelOption
					.split(",")
					.map((e) => item[e])
					.join(" - ");
				return {
					value: item[props.valueOption],
					label: label,
				};
			})
			: [];
	});

	watch(
		() => props.modelValue,
		(val) => {
			if (val) {
				value.value = val;
			}
		}
	);
});

// Define methods
// remoteMethod is used to search the options
const remoteMethod = (query) => {
	if (query && query.length >= 2) {
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
