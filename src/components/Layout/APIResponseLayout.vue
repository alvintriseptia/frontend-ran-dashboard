<template>
	<div v-if="loading">
		<LoadingSpinner />
	</div>
	<div v-else-if="error">
		<el-result icon="error" title="Terjadi Kesalahan" :subTitle="error">
			<template slot="extra">
				<el-button type="primary" size="medium" @click="refreshFunction">
					Refresh
				</el-button>
			</template>
		</el-result>
	</div>
	<el-empty description="Tidak ada data" v-else-if="!data"> </el-empty>
</template>

<script setup>
import { computed } from "vue";
import LoadingSpinner from "./LoadingSpinner.vue";

const props = defineProps({
	loading: {
		type: Boolean,
		required: true,
	},
	data: {
		type: Array,
		default: () => [],
	},
	error: {
		type: String,
		default: null,
	},
	refreshFunction: {
		type: Function,
		required: true,
	},
});

// Check if the props is changed
computed(() => props.loading);
computed(() => props.data);
computed(() => props.error);
</script>
