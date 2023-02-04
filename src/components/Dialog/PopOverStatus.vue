<template>
	<el-popover placement="bottom" width="100" v-model="visible">
		<div class="flex flex-col gap-y-2 justify-center items-center m-0">
			<button
				class="w-full text-gray-500 text-sm border border-transparent hover:border-green-500 transition-all hover:text-green-500"
				:class="{
					'text-green-500': status === 'Done',
				}"
				size="mini"
				@click="handleClick('Done')"
			>
				Done
			</button>
			<button
				type="danger"
				class="w-full text-gray-500 text-sm border border-transparent hover:border-orange-500 transition-all hover:text-orange-500"
				:class="{
					'text-orange-500': status === 'Not Yet',
				}"
				size="mini"
				@click="handleClick('Not Yet')"
			>
				Not Yet
			</button>
		</div>
		<el-tag
			slot="reference"
			size="small"
			:type="status === 'Done' ? 'success' : 'warning'"
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
	name: "PopOverStatus",
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
	emits: ["onUpdate"],
	methods: {
		handleClick(statusClicked) {
			if (statusClicked === this.status) {
				this.visible = !this.visible;
				return;
			}
			this.visible = !this.visible;
			const status = this.status === "Done" ? "NY" : "Done";
			this.$emit("onUpdate", status);
		},
	},
};
</script>
