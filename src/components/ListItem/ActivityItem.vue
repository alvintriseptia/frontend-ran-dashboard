<template>
	<div>
		<p class="text-sm mb-0.5">
			<strong>{{ props.program }}</strong> - {{ props.subProgram }}
		</p>
		<div class="flex gap-x-2 text-xs items-center mb-1">
			<p class="text-gray-500">{{ props.siteId }} - {{ props.subDept }}</p>
			<el-tag size="mini" :type="props.isDone ? 'success' : 'info'">{{
				props.isDone ? "Done" : "Not Yet"
			}}</el-tag>
		</div>
		<p class="text-sm">{{ props.activity }}</p>
		<el-divider v-show="!props.isLastItem" class="my-2"></el-divider>
	</div>
</template>

<script setup>
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
	subDept: {
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
	isLastItem: {
		type: Boolean,
		required: true,
	},
});
</script>
