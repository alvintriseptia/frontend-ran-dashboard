<template>
	<div
		class="w-full md:w-[400px] p-8 h-full fixed top-0 bottom-0 bg-white transition-all duration-500 overflow-y-auto z-40"
		:class="isShowInput ? 'right-0' : '-right-full'"
	>
		<div class="flex justify-between items-center mb-6">
			<h2 class="text-lg lg:text-xl font-bold">Input Activities</h2>
			<OutlinedButton size="sm" @onClick="emit('closeInputActivities')"
				>&#10006;</OutlinedButton
			>
		</div>
		<el-form
			:model="formInputActivity"
			:rules="rules"
			ref="ruleFormRef"
			label-position="top"
		>
			<el-form-item
				label="Activity"
				:label-width="formLabelWidth"
				prop="deskripsiActivity"
			>
				<RemoteSearchSelect
					:modelValue="formInputActivity.deskripsiActivity"
					:options="unref(searchActivities.data)"
					:isMultiple="false"
					placeholder="Select Activity"
					labelOption="deskripsiActivity"
					valueOption="id"
					@onChange="handleSearchActivities"
					@onUpdate="handleUpdateActivity"
				/>
			</el-form-item>

			<el-form-item label="Site" :label-width="formLabelWidth" prop="siteID">
				<RemoteSearchSelect
					v-model="formInputActivity.siteID"
					:options="unref(searchSites.data)"
					:isMultiple="false"
					placeholder="Select Site"
					@onChange="handleSearchSites"
					@onUpdate="handleUpdateSite"
					labelOption="id,name"
					valueOption="id"
				/>
			</el-form-item>

			<el-form-item label="Remark" :label-width="formLabelWidth" prop="remark">
				<el-input
					v-model="formInputActivity.remark"
					autocomplete="off"
				></el-input>
			</el-form-item>

			<el-form-item
				label="Target Quartal"
				:label-width="formLabelWidth"
				prop="targetQuartal"
			>
				<el-select
					v-model="formInputActivity.targetQuartal"
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

			<el-form-item label="Status" :label-width="formLabelWidth" prop="status">
				<el-select
					v-model="formInputActivity.status"
					placeholder="Select Status"
				>
					<el-option
						v-for="item in statusOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>

			<el-form-item
				label="Week Executed"
				:label-width="formLabelWidth"
				prop="weekExecuted"
				v-if="parseInt(formInputActivity.status) === 1"
			>
				<el-date-picker
					v-model="formInputActivity.weekExecuted"
					type="week"
					format="Week WW"
					placeholder="Pick a week"
				>
				</el-date-picker>
			</el-form-item>

			<div class="mt-8">
				<Button @onClick="onSubmit()"> Input Data </Button>
			</div>
		</el-form>
	</div>
</template>

<script setup>
import { OutlinedButton, Button, RemoteSearchSelect } from "@/components";
import { computed, ref, unref, watch } from "vue";
import { useFetch } from "@/composables";
import { Notification } from "element-ui";

// Target Quartal Options
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

// Status Options
const statusOptions = [
	{
		value: 0,
		label: "Not Yet",
	},
	{
		value: 1,
		label: "Done",
	},
];

// Form Input
const formInputActivity = ref({
	deskripsiActivity: null,
	siteID: null,
	targetQuartal: null,
	remark: null,
	statusActivity: null,
	weekExecuted: null,
});

const ruleFormRef = ref(null);

// Rules Input
const rules = ref({
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
	status: [{ required: true, message: "Please input status", trigger: "blur" }],
	weekExecuted: [
		{
			required: true,
			message: "Please input week executed",
			trigger: "blur",
		},
	],
});

// watch status change to decide week executed
watch(
	() => formInputActivity.value.status,
	(val) => {
		if (val === 0) {
			rules.value.weekExecuted = null;
		} else {
			rules.value.weekExecuted = [
				{
					required: true,
					message: "Please input week executed",
					trigger: "blur",
				},
			];
		}
	}
);

// form label with
const formLabelWidth = "120px";

// define emit
const emit = defineEmits(["closeInputActivities"]);

// define props
const props = defineProps({
	isShow: {
		type: Boolean,
		default: false,
	},
});
const isShowInput = computed(() => props.isShow);

// Activities
// acitivity params
const searchActivityParams = ref({
	deskripsiActivity: "",
});

// fetch first data
const searchActivities = ref(
	useFetch({
		url: "/api/activity/search",
		params: searchActivityParams,
	})
);

// handle search
const handleSearchActivities = (val) => {
	if (val.length >= 1 && val.length <= 2) return;

	if (val && val.length >= 3) {
		searchActivityParams.value.deskripsiActivity = val;
	} else {
		searchActivityParams.value.deskripsiActivity = "";
	}
};

// handle on update
function handleUpdateActivity(value) {
	formInputActivity.deskripsiActivity = value;
	// set manual value deskripsi activity to ruleFormRef
	ruleFormRef.value.model.deskripsiActivity = value;
}

// Sites
// acitivity params
const searchSiteParams = ref({
	site: "",
});

// fetch first data
const searchSites = ref(
	useFetch({
		url: "/api/site/search",
		params: searchSiteParams,
	})
);

// handle search
const handleSearchSites = (val) => {
	if (val.length >= 1 && val.length <= 2) return;

	if (val && val.length >= 3) {
		searchSiteParams.value.site = val;
	} else {
		searchSiteParams.value.site = "";
	}
};

// handle on update
function handleUpdateSite(value) {
	formInputActivity.siteID = value;
	// set manual value deskripsi activity to ruleFormRef
	ruleFormRef.value.model.siteID = value;
}

// methods
function onSubmit() {
	emit("closeInputActivities", {
		status: "Not Yet",
		weekExecuted: null,
		namaProgram: "Power System",
		namaSubprogram: "Short Back Up Battery Time",
		deskripsiActivity: "Activation BBLTI Feature",
		additionalInfo: null,
		siteID: "SMG291",
		siteName: "Lebdosari",
		namaKabupaten: "KOTA SEMARANG",
		namaDO: "SEMARANG",
		namaNS: "SEMARANG",
		namaPIC: "RTPO",
		targetQuartal: "Q1",
		remark: "",
		updatedAt: "0000-00-00 00:00:00",
		activityID: "4",
		budget: null,
		cost: "0",
	});
	// ruleFormRef.value.validate((valid) => {
	// 	if (valid) {
	// 		const body = new FormData();
	// 		body.append(
	// 			"activityId",
	// 			parseInt(formInputActivity.value.deskripsiActivity)
	// 		);
	// 		body.append("siteId", formInputActivity.value.siteID);
	// 		body.append("targetQuartal", formInputActivity.value.targetQuartal);
	// 		body.append("remark", formInputActivity.value.remark);
	// 		body.append("done", parseInt(formInputActivity.value.status));
	// 		if (parseInt(formInputActivity.value.status) === 1) {
	// 			body.append("weekExecuted", formInputActivity.value.weekExecuted);
	// 		}

	// 		// console.log(activityStatusParams);
	// 		const { data, error } = useFetch({
	// 			url: "/api/activity-plan",
	// 			method: "POST",
	// 			body,
	// 		});

	// 		watch(data, (newData) => {
	// 			if (newData) {
	// 				emit("closeInputActivities", newData);
	// 			}
	// 		});

	// 		watch(error, (newError) => {
	// 			if (newError) {
	// 				console.log(newError);
	// 				Notification.error({
	// 					title: "Error",
	// 					message: newError,
	// 				});
	// 			}
	// 		});
	// 	} else {
	// 		return false;
	// 	}
	// });
}
</script>
