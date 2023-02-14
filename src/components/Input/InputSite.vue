<template>
	<div
		class="w-full md:w-[400px] p-8 h-full fixed top-0 bottom-0 bg-white transition-all duration-500 overflow-y-auto z-40"
		:class="isShowInput ? 'right-0' : '-right-full'"
	>
		<div class="flex justify-between items-center mb-6">
			<h2 class="text-lg lg:text-xl font-bold">
				{{ type === "input" ? "Input Site" : "Edit Site" }}
			</h2>
			<OutlinedButton size="sm" @onClick="handleCloseInput"
				>&#10006;</OutlinedButton
			>
		</div>
		<el-alert
			v-if="siteCount > 0"
			title="Warning!"
			type="warning"
			show-icon
			@close="siteCount = 0"
		>
			<p>
				There are <strong>{{ siteCount }}</strong> Plan Activity related to this
				site.
			</p>
			<p class="mt-1 mb-2">
				Please make sure you have reviewed all of them before you update this
				site
			</p>
			<router-link
				:to="{ name: 'activities-site', params: { siteId: siteID } }"
				target="_blank"
			>
				<el-button type="warning" size="small">Review</el-button>
			</router-link>
		</el-alert>
		<el-form
			:model="ruleForm"
			:rules="rules"
			ref="ruleFormRef"
			label-position="top"
		>
			<el-form-item label="Site ID" :label-width="formLabelWidth" prop="siteID">
				<el-input v-model="ruleForm.siteID" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item
				label="Site Name"
				:label-width="formLabelWidth"
				prop="siteName"
			>
				<el-input v-model="ruleForm.siteName" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item
				label="NS Department"
				:label-width="formLabelWidth"
				prop="namaNS"
			>
				<Select
					v-model="ruleForm.namaNS"
					:options="nsDepartmentOptions"
					placeholder="Select NS Department"
					@onChange="onUpdateNS"
					:defaultValue="ruleForm.namaNS"
				/>
			</el-form-item>
			<el-form-item
				label="DO Sub-Department"
				:label-width="formLabelWidth"
				prop="namaDO"
				><Select
					v-model="ruleForm.namaDO"
					:options="doSubDepartmentOptions"
					placeholder="Select DO Sub-Department"
					@onChange="onUpdateDO"
					:defaultValue="ruleForm.namaDO"
				/>
			</el-form-item>
			<el-form-item
				label="Kabupaten"
				:label-width="formLabelWidth"
				prop="namaKabupaten"
			>
				<Select
					v-model="ruleForm.namaKabupaten"
					:options="kabupatenOptions"
					:isMultiple="false"
					placeholder="Select Kabupaten"
					@onChange="onUpdateKabupaten"
					:defaultValue="ruleForm.namaKabupaten"
				/>
			</el-form-item>
			<div class="mt-8">
				<Button @onClick="onSubmit()">
					{{ type === "input" ? "Input" : "Update" }} Data
				</Button>
			</div>
		</el-form>
	</div>
</template>

<script setup>
import { OutlinedButton, Button, Select } from "@/components";
import { computed, onMounted, ref, watch } from "vue";
import { useFetch } from "@/composables";
import { Notification } from "element-ui";

// define Emits
const emit = defineEmits(["closeInput"]);

const handleCloseInput = () => {
	emit("closeInput");
};

// define Props
const props = defineProps({
	isShow: {
		type: Boolean,
		default: false,
	},
	type: {
		type: String,
		default: "input",
	},
	currentData: {
		type: Object,
		required: true,
	},
	nsDepartmentOptions: {
		type: Array,
		required: true,
	},
	doSubDepartmentOptions: {
		type: Array,
		required: true,
	},
	kabupatenOptions: {
		type: Array,
		required: true,
	},
});
const isShowInput = computed(() => props.isShow);
const type = computed(() => props.type);

// Form
const ruleForm = ref({
	siteID: "",
	siteName: "",
	namaDO: "",
	namaNS: "",
	namaKabupaten: "",
});
const siteID = ref("");
const siteCount = ref(0);

// watch props currentData
onMounted(() => {
	watch(
		() => props.currentData,
		(newVal) => {
			if (newVal.siteID) {
				if (type.value === "edit") {
					const { data, error } = useFetch({
						url: `/api/activity-plan/count-by-site-id/${newVal.siteID}`,
					});
					watch(data, (newData) => {
						if (newData) {
							siteCount.value = parseInt(newData);
						}
					});
					watch(error, (newError) => {
						if (newError) {
							Notification.error({
								title: "Error",
								message: newError,
							});
						}
					});
				}

				if (newVal.siteID) {
					siteID.value = newVal.siteID;
					ruleForm.value = {
						siteID: newVal.siteID,
						siteName: newVal.siteName,
						namaDO: newVal.doID,
						namaNS: newVal.nsID,
						namaKabupaten: newVal.kabupatenID,
					};
				} else {
					ruleForm.value = {
						siteID: "",
						siteName: "",
						namaDO: "",
						namaNS: "",
						namaKabupaten: "",
					};
					siteCount.value = 0;
					siteID.value = "";
				}
			}
		}
	);
});

// Rule Form Ref
const ruleFormRef = ref(null);
const formLabelWidth = "120px";

// Form Rules
const rules = {
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
};

function onUpdateNS(value) {
	ruleForm.value.namaNS = value;
	ruleFormRef.value.model.namaNS = value;
}
function onUpdateDO(value) {
	ruleForm.value.namaDO = value;
	ruleFormRef.value.model.namaDO = value;
}

function onUpdateKabupaten(value) {
	ruleForm.value.namaKabupaten = value;
	ruleFormRef.value.model.namaKabupaten = value;
}

function onSubmit() {
	ruleFormRef.value.validate((valid) => {
		if (valid) {
			const body = new FormData();
			if (type.value === "input") {
				body.append("id", ruleForm.value.siteID);
			} else {
				body.append("id", siteID.value);
				body.append("newId", ruleForm.value.siteID);
			}
			body.append("name", ruleForm.value.siteName);
			body.append("ns", ruleForm.value.namaNS);
			body.append("do", ruleForm.value.namaDO);
			body.append("kabupaten", ruleForm.value.namaKabupaten);

			// console.log(activityStatusParams);
			const { data, error } = useFetch({
				url: type.value === "input" ? "/api/site" : `/api/site/${siteID.value}`,
				method: type.value === "input" ? "POST" : "PUT",
				body,
			});

			watch(data, (newData) => {
				if (newData) {
					emit("closeInput", { ...newData, type });
				}
			});

			watch(error, (newError) => {
				if (newError) {
					console.log(newError);
					Notification.error({
						title: "Error",
						message: newError,
					});
				}
			});
		} else {
			return false;
		}
	});
}
</script>
