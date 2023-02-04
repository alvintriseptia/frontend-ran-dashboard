<template>
	<div
		class="w-full md:w-[400px] p-8 h-full fixed top-0 bottom-0 bg-white transition-all duration-500 overflow-y-auto"
		:class="isShowInput ? 'right-0' : '-right-full'"
	>
		<div class="flex justify-between items-center mb-6">
			<h2 class="text-lg lg:text-xl font-bold">Input Activities</h2>
			<OutlinedButton size="sm" @onClick="$emit('closeInputActivities')"
				>&#10006;</OutlinedButton
			>
		</div>
		<el-form
			:model="ruleForm"
			:rules="rules"
			ref="ruleForm"
			label-position="top"
		>
			<el-form-item
				label="Activity"
				:label-width="formLabelWidth"
				prop="deskripsiActivity"
			>
				<SearchSelect
					v-model="ruleForm.deskripsiActivity"
					:options="activityOptions"
					:isMultiple="false"
					placeholder="Select Activity"
					@onUpdate="onUpdateActivity"
					:setDefault="false"
				/>
			</el-form-item>
			<el-form-item label="Remark" :label-width="formLabelWidth" prop="remark">
				<el-input v-model="ruleForm.remark" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item
				label="Target Quartal"
				:label-width="formLabelWidth"
				prop="targetQuartal"
			>
				<el-select
					v-model="ruleForm.targetQuartal"
					placeholder="Select Quartal"
				>
					<el-option
						v-for="item in quarterOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="Site" :label-width="formLabelWidth" prop="siteID">
				<SearchSelect
					v-model="ruleForm.siteID"
					:options="siteOptions"
					:isMultiple="false"
					:allowCreate="true"
					placeholder="Select or Create a Site"
					@onUpdate="onUpdateSite"
					:setDefault="false"
				/>
			</el-form-item>
			<div class="mt-8">
				<Button @onClick="onSubmit('ruleForm')"> Input Data </Button>
			</div>
		</el-form>
	</div>
</template>

<script>
import { OutlinedButton, Button, SearchSelect } from "@/components";

export default {
	data() {
		return {
			ruleForm: {
				deskripsiActivity: "",
				siteID: "",
				namaDO: "",
				namaNS: "",
				namaKabupaten: "",
				targetQuartal: "",
				remark: "",
			},
			rules: {
				deskripsiActivity: [
					{
						required: true,
						message: "Please input deskripsi activity",
						trigger: "blur",
					},
				],
				siteID: [
					{ required: true, message: "Please input site ID", trigger: "blur" },
				],
				targetQuartal: [
					{
						required: true,
						message: "Please input target quartal",
						trigger: "blur",
					},
				],
				remark: [
					{ required: true, message: "Please input remark", trigger: "blur" },
				],
			},
			quarterOptions: [
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
			],
			formLabelWidth: "120px",
			activityOptions: [
				{
					value: "Activity 1",
					label: "Activity 1",
				},
				{
					value: "Activity 2",
					label: "Activity 2",
				},
				{
					value: "Activity 3",
					label: "Activity 3",
				},
				{
					value: "Activity 4",
					label: "Activity 4",
				},
				{
					value: "Activity 5",
					label: "Activity 5",
				},
			],
			siteOptions: [
				{
					value: "Site 1",
					label: "Site 1",
				},
				{
					value: "Site 2",
					label: "Site 2",
				},
				{
					value: "Site 3",
					label: "Site 3",
				},
				{
					value: "Site 4",
					label: "Site 4",
				},
				{
					value: "Site 5",
					label: "Site 5",
				},
			],
		};
	},
	emits: ["closeInputActivities"],
	props: {
		isShow: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		isShowInput() {
			return this.isShow;
		},
	},
	methods: {
		onSubmit(formName) {
			console.log(this.ruleForm);
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log("submitted");
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		onUpdateSite(value) {
			this.ruleForm.siteID = value;
		},
		onUpdateActivity(value) {
			this.ruleForm.deskripsiActivity = value;
		},
	},
	components: {
		OutlinedButton,
		Button,
		SearchSelect,
	},
};
</script>
