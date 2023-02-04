<template>
	<div
		class="p-4 border border-gray-200 rounded-lg bg-white overflow-auto"
		:style="{ maxHeight: maxHeight }"
	>
		<div class="mb-4">
			<el-alert
				v-if="alert.title"
				:title="alert.title"
				:type="alert.type"
				show-icon
				@close="alert.title = ''"
			>
				<p v-for="(desc, index) in alert.description" :key="index">
					{{ desc }}
				</p>
			</el-alert>
			<div class="flex justify-between items-center">
				<h2
					class="text-xl font-bold"
					:class="{
						'mt-4': alert.title,
					}"
				>
					{{ title }}
				</h2>
				<div>
					<slot name="header" />
				</div>
			</div>

			<p v-if="subtitle" class="text-sm text-gray-500">
				{{ subtitle }}
			</p>
		</div>
		<slot />
	</div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	subtitle: {
		type: String,
		default: "",
	},
	maxHeight: {
		type: String,
		default: "auto",
	},
	alert: {
		type: Object,
		default: null,
	},
});

const alert = computed(() => {
	if (props.alert) {
		return {
			title: props.alert.title,
			type: props.alert.type,
			description: props.alert.description,
		};
	} else {
		return {
			title: "",
			type: "",
			description: "",
		};
	}
});
</script>
