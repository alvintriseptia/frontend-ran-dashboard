<template>
	<el-popover placement="bottom" width="100" v-model="visible">
		<div class="flex flex-col gap-y-2 justify-center items-center m-0">
			<button
				class="w-full text-gray-500 text-sm border border-transparent hover:border-green-500 transition-all hover:text-green-500"
				:class="{
					'text-green-500': status === 'Done',
				}"
				size="mini"
				@click="visible = false"
			>
				Done
			</button>
			<button
				type="danger"
				class="w-full text-gray-500 text-sm border border-transparent hover:border-orange-500 transition-all hover:text-orange-500"
				:class="{
					'text-orange-500': status === 'NY',
				}"
				size="mini"
				@click="visible = false"
			>
				Not Yet
			</button>
		</div>
		<el-tag
			slot="reference"
			size="small"
			:type="status === 'Done' ? 'success' : 'info'"
			:style="{
				cursor: 'pointer',
			}"
		>
			{{ status }}
		</el-tag>
	</el-popover>
</template>

<script>
export default {
	name: "PopOver",
	data() {
		return {
			visible: false,
		};
	},
	props: {
		status: {
			type: String,
			default: "Done",
		},
	},
};
</script>
