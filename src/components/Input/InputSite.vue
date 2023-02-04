<template>
	<div
		class="w-full md:w-[400px] p-8 h-full fixed top-0 bottom-0 bg-white transition-all duration-500 overflow-y-auto z-40"
		:class="isShowInput ? 'right-0' : '-right-full'"
	>
		<div class="flex justify-between items-center mb-6">
			<h2 class="text-lg lg:text-xl font-bold">{{ title }}</h2>
			<OutlinedButton size="sm" @onClick="$emit('closeInput')"
				>&#10006;</OutlinedButton
			>
		</div>
		<el-form
			:model="ruleForm"
			:rules="rules"
			ref="ruleForm"
			label-position="top"
		>
			<el-form-item label="Site ID" :label-width="formLabelWidth" prop="siteID">
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
			<el-form-item
				label="Site Name"
				:label-width="formLabelWidth"
				prop="Site Name"
			>
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
			<el-form-item
				label="NS Department"
				:label-width="formLabelWidth"
				prop="namaNS"
			>
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
			<el-form-item
				label="DO Sub-Department"
				:label-width="formLabelWidth"
				prop="namaDO"
			>
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
			<el-form-item
				label="Kabupaten"
				:label-width="formLabelWidth"
				prop="namaKabupaten"
			>
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
				siteID: "",
				siteName: "",
				namaDO: "",
				namaNS: "",
				namaKabupaten: "",
			},
			rules: {
				siteID: [
					{ required: true, message: "Please input site ID", trigger: "blur" },
				],
				siteName: [
					{
						required: true,
						message: "Please input site name",
						trigger: "blur",
					},
				],
				namaDO: [
					{ required: true, message: "Please input DO name", trigger: "blur" },
				],
				namaNS: [
					{ required: true, message: "Please input NS name", trigger: "blur" },
				],
				namaKabupaten: [
					{
						required: true,
						message: "Please input kabupaten name",
						trigger: "blur",
					},
				],
			},
			formLabelWidth: "120px",
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
	emits: ["closeInput"],
	props: {
		isShow: {
			type: Boolean,
			default: false,
		},
		title: {
			type: String,
			default: "",
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
