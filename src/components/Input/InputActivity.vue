<template>
	<div
		class="w-full md:w-[400px] p-8 h-full fixed top-0 bottom-0 bg-white transition-all duration-500 overflow-y-auto"
		:class="isShow ? 'right-0' : '-right-full'"
	>
		<div class="flex justify-between items-center mb-6">
			<h2 class="text-lg lg:text-xl font-bold">Input Activities</h2>
			<OutlinedButton size="sm" @onClick="$emit('closeInputActivities')"
				>&#10006;</OutlinedButton
			>
		</div>
		<el-form :model="form" label-position="top">
			<el-form-item label="Remark" :label-width="formLabelWidth">
				<el-input v-model="form.remark" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="Target Quartal" :label-width="formLabelWidth">
				<el-select v-model="form.targetQuartal" placeholder="Select Quartal">
					<el-option
						v-for="item in quarterOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<section class="mt-4">
			<Button @onClick="onSubmit">Input Data</Button>
		</section>
	</div>
</template>

<script setup>
import { OutlinedButton, Button } from "@/components";
import { computed, ref } from "vue";

const form = ref({});
const formLabelWidth = "120px";
const quarterOptions = [
	{
		value: "All",
		label: "All",
	},
	{
		value: "Q1",
		label: "Q1",
	},
	{
		value: "Q2",
		label: "Q2",
	},
	{
		value: "Q3",
		label: "Q3",
	},
	{
		value: "Q4",
		label: "Q4",
	},
];
const emit = defineEmits(["onSubmit", "onCancel"]);
const props = defineProps({
	isShow: {
		type: Boolean,
		default: false,
	},
});

function onSubmit() {
	emit("onSubmit", form.value);
}

const isShow = computed(() => props.isShow);
</script>
