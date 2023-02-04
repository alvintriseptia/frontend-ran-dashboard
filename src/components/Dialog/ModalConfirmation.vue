<template>
	<el-dialog
		:title="title"
		:visible.sync="dialogVisible"
		width="30%"
		@close="emit('onCancel')"
	>
		<span>{{ message }}</span>
		<span>{{ description }}</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="emit('onCancel')">Cancel</el-button>
			<el-button type="primary" @click="emit('onSubmit')">Confirm</el-button>
		</span>
	</el-dialog>
</template>

<script setup>
import { computed } from "vue";

const emit = defineEmits(["onSubmit", "onCancel"]);

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

const dialogVisible = computed(() => props.isModalVisible);
</script>
