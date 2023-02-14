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
	<div v-else-if="!data || data.length === 0 || data === {}">
		<el-empty description="No Data"> </el-empty>
	</div>
</template>

<script setup>
import { computed } from "vue";
import LoadingSpinner from "./LoadingSpinner.vue";

const props = defineProps({
	loading: {
		type: Boolean | Object,
		required: true,
	},
	data: {
		type: Array | Object,
		default: () => [],
	},
	error: {
		type: String | Object,
		default: null,
	},
});

// Check if the props is changed
const loading = computed(() => props.loading);
const data = computed(() => props.data);
const error = computed(() => props.error);

const emit = defineEmits(["refreshFunction"]);

const refreshFunction = () => {
	emit("refreshFunction");
};
</script>
