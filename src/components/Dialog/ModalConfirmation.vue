<template>
	<el-dialog
		:title="title"
		:visible.sync="dialogVisible"
		width="30%"
		@close="emit('onCancel')"
	>
		<p class="font-semibold text-sm mb-4 text-center">{{ message }}</p>
		<p class="text-center">{{ description }}</p>
		<span slot="footer" class="dialog-footer">
			<el-button @click="emit('onCancel')">Cancel</el-button>
			<el-button
				:disabled="isDisabled"
				type="primary"
				@click="emit('onSubmit')"
				>{{ count > 0 ? count : "Confirm" }}</el-button
			>
		</span>
	</el-dialog>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";

const emit = defineEmits(["onSubmit", "onCancel"]);
const isDisabled = ref(true);
const count = ref(0);

const props = defineProps({
	isModalVisible: {
		type: Boolean,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		default: "",
	},
	description: {
		type: String,
		default: "",
	},
});

const message = computed(() => props.message);
const description = computed(() => props.description);

const dialogVisible = computed(() => props.isModalVisible);

onMounted(() => {
	watch(
		() => props.isModalVisible,
		(val) => {
			if (val) {
				isDisabled.value = true;
				count.value = 3;
				const interval = setInterval(() => {
					count.value--;
					if (count.value === 0) {
						clearInterval(interval);
					}
				}, 1000);
				setTimeout(() => {
					isDisabled.value = false;
				}, 3000);
			}
		}
	);
});
</script>
