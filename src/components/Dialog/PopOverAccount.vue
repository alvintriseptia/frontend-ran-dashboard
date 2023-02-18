<template>
	<el-popover placement="bottom" width="100" v-model="visible">
		<div class="flex flex-col gap-y-2 justify-center items-center m-0">
			<button
				class="w-full text-gray-500 text-sm font-medium border border-transparent hover:border-green-500 transition-all hover:text-green-500"
				:class="{
					'text-green-500': active === '1',
				}"
				@click="handleActive('1')"
			>
				Active
			</button>
			<button
				class="w-full text-gray-500 text-sm font-medium border border-transparent hover:border-red-500 transition-all hover:text-red-500"
				:class="{
					'text-red-500': active === '0',
				}"
				@click="handleActive('0')"
			>
				Deactive
			</button>
		</div>
		<el-tag
			slot="reference"
			size="small"
			:type="active === '1' ? 'success' : 'danger'"
			:style="{
				cursor: 'pointer',
			}"
		>
			{{ active === "1" ? "Active" : "Deactive" }}
		</el-tag>
	</el-popover>
</template>

<script>
export default {
	name: "PopOverAccount",
	data() {
		return {
			visible: false,
		};
	},
	props: {
		active: {
			type: String,
			default: "Done",
		},
	},
	emits: ["onUpdate"],
	methods: {
		handleActive(active) {
			this.visible = !this.visible;
			this.$emit("onUpdate", active);
		},
	},
};
</script>
