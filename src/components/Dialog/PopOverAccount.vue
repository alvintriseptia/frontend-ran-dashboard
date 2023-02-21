<template>
	<el-popover placement="bottom" width="100" v-model="visible">
		<div class="flex flex-col gap-y-2 justify-center items-center m-0">
			<button
				class="w-full text-gray-500 text-sm font-medium border border-transparent hover:border-green-500 transition-all hover:text-green-500"
				:class="{
					'text-green-500': convertUtil.toBoolean(active) === true,
				}"
				@click="handleActive('1')"
			>
				Active
			</button>
			<button
				class="w-full text-gray-500 text-sm font-medium border border-transparent hover:border-red-500 transition-all hover:text-red-500"
				:class="{
					'text-red-500': convertUtil.toBoolean(active) === false,
				}"
				@click="handleActive('0')"
			>
				Deactive
			</button>
		</div>
		<el-tag
			slot="reference"
			size="small"
			:type="convertUtil.toBoolean(active) === true ? 'success' : 'danger'"
			:style="{
				cursor: 'pointer',
			}"
		>
			{{ convertUtil.toBoolean(active) === true ? "Active" : "Deactive" }}
		</el-tag>
	</el-popover>
</template>

<script>
import { convertUtil } from "@/utils";

export default {
	name: "PopOverAccount",
	data() {
		return {
			visible: false,
			convertUtil,
		};
	},
	props: {
		active: {
			type: Boolean | String,
			default: false,
		},
	},
	emits: ["onUpdate"],
	methods: {
		handleActive(active) {
			this.visible = !this.visible;
			if (active !== this.active) this.$emit("onUpdate", active);
		},
	},
};
</script>
