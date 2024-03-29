<template>
  <el-select
    v-model="value"
    :multiple="isMultiple"
    filterable
    remote
    :allow-create="allowCreate"
    reserve-keyword
    :placeholder="placeholder"
    remote-show-suffix
    :remote-method="remoteMethod"
    :loading="loading"
    autocomplete="off"
    @change="onChange"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      v-loading="loading"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, ref, computed, watch } from "vue";

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
	allowCreate: {
		type: Boolean,
		default: false,
	},
	setDefault: {
		type: Boolean,
		default: true,
	},
});

// Define emits
const emit = defineEmits(["onUpdate"]);

// onMounted, to set the initial value
onMounted(() => {
	list.value = computed(() => props.options);

	watch(
		list,
		() => {
			if (list.value.length > 0) {
				options.value = list.value;
				if (props.setDefault) {
					value.value = list.value[0].value;
				}
			}
		},
		{ immediate: true }
	);
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
