<!-- eslint-disable vue/no-v-html -->
<template>
	<div>
		<p class="text-sm">
			<strong>{{ props.program }}</strong> - {{ props.subProgram }}
		</p>
		<p class="text-sm text-gray-500 mb-0.5">
			{{ props.siteId }} - {{ props.siteName }}
		</p>
		<p class="text-sm mb-1" v-html="props.activity" />

		<div class="flex justify-between items-center">
			<p class="text-xs text-gray-500">
				{{
					props.updatedAt ? dateUtil.convertDateToMMMDDYY(props.updatedAt) : "-"
				}}
			</p>
			<el-tag size="mini" :type="getTagItemColor(props.isDone)">
				{{ props.isDone ? "Done" : "Not Yet" }}
			</el-tag>
		</div>

		<el-divider v-if="!props.isLastItem" class="my-2" />
	</div>
</template>

<script setup>
import { dateUtil } from "@/utils";

const props = defineProps({
	program: {
		type: String,
		required: true,
	},
	subProgram: {
		type: String,
		required: true,
	},
	siteId: {
		type: String,
		required: true,
	},
	siteName: {
		type: String,
		required: true,
	},
	isDone: {
		type: Boolean,
		required: true,
	},
	activity: {
		type: String,
		required: true,
	},
	updatedAt: {
		type: String,
		default: "-",
	},
	isLastItem: {
		type: Boolean,
		required: true,
	},
});

function getTagItemColor(isDone) {
	return isDone ? "success" : "warning";
}
</script>
