<template>
	<div
		class="w-full md:w-[400px] p-8 h-full fixed top-0 bottom-0 bg-white transition-all duration-500 overflow-y-auto z-40"
		:class="isShowInput ? 'right-0' : '-right-full'"
	>
		<div class="flex justify-between items-center mb-6">
			<h2 class="text-lg lg:text-xl font-bold">Update Plan Activity</h2>
			<OutlinedButton size="sm" @onClick="emit('closeFormUpdateActivity')"
				>&#10006;</OutlinedButton
			>
		</div>
		<el-form
			:model="formUpdateActivity"
			:rules="rules"
			ref="ruleFormRef"
			label-position="top"
		>
			<el-form-item
				label="Activity"
				:label-width="formLabelWidth"
				prop="deskripsiActivity"
			>
				<el-input
					v-model="formUpdateActivity.deskripsiActivity"
					autocomplete="off"
					:disabled="true"
				></el-input>
			</el-form-item>

			<el-form-item label="Site" :label-width="formLabelWidth" prop="siteID">
				<el-input
					v-model="formUpdateActivity.siteID"
					autocomplete="off"
					:disabled="true"
				></el-input>
			</el-form-item>

			<el-form-item label="PIC" :label-width="formLabelWidth" prop="pic">
				<el-input
					v-model="formUpdateActivity.pic"
					autocomplete="off"
				></el-input>
			</el-form-item>

			<el-form-item
				label="Additional Info"
				:label-width="formLabelWidth"
				prop="additionalInfo"
			>
				<el-input
					v-model="formUpdateActivity.additionalInfo"
					autocomplete="off"
					type="textarea"
					:rows="2"
				></el-input>
			</el-form-item>

			<el-form-item label="Remark" :label-width="formLabelWidth" prop="remark">
				<el-input
					v-model="formUpdateActivity.remark"
					autocomplete="off"
				></el-input>
			</el-form-item>

			<el-form-item
				v-if="userStore.getters.role === 'admin'"
				label="Budget"
				:label-width="formLabelWidth"
				prop="budget"
			>
				<el-input
					v-model="formUpdateActivity.budget"
					autocomplete="off"
				></el-input>
			</el-form-item>

			<el-form-item
				v-if="userStore.getters.role === 'admin'"
				type="number"
				label="Cost"
				:label-width="formLabelWidth"
				prop="cost"
			>
				<el-input
					v-model="formUpdateActivity.cost"
					autocomplete="off"
				></el-input>
			</el-form-item>

			<el-form-item
				label="Target Quartal"
				:label-width="formLabelWidth"
				prop="targetQuartal"
			>
				<el-select
					v-model="formUpdateActivity.targetQuartal"
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

			<div class="mt-8">
				<Button @onClick="onSubmit()"> Update Data </Button>
			</div>
		</el-form>
	</div>
</template>

<script setup>
import { OutlinedButton, Button } from "@/components";
import { computed, ref, watch } from "vue";
import { useFetch } from "@/composables";
import { Notification } from "element-ui";
import { userStore } from "@/stores";

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

// Form Input
const formUpdateActivity = ref({
	deskripsiActivity: props.row.deskripsiActivity,
	additionalInfo: props.row.additionalInfo,
	remark: props.row.remark,
	targetQuartal: props.row.targetQuartal,
	activityId: props.row.activityID,
	siteId: props.row.siteID,
	pic: props.row.namaPIC,
	budget: userStore.getters.role === "admin" ? props.row.budget : "",
	cost:
		userStore.getters.role === "admin"
			? props.row.cost == 0
				? ""
				: props.row.cost
			: "",
});

// watch props row
watch(
	() => props.row,
	(newVal) => {
		formUpdateActivity.value = {
			deskripsiActivity: newVal.deskripsiActivity,
			siteID: newVal.siteID,
			additionalInfo: newVal.additionalInfo,
			remark: newVal.remark,
			targetQuartal: newVal.targetQuartal,
			activityId: newVal.activityID,
			siteId: newVal.siteID,
			pic: newVal.namaPIC,
			budget: userStore.getters.role === "admin" ? newVal.budget : "",
			cost:
				userStore.getters.role === "admin"
					? newVal.cost == 0
						? ""
						: newVal.cost
					: "",
		};
	}
);

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
	cost: [
		{
			validator: (rule, value, callback) => {
				if (value && !Number(value)) {
					callback(new Error("Please input number"));
				} else {
					callback();
				}
			},
		},
	],
});

// form label with
const formLabelWidth = "120px";

// define emit
const emit = defineEmits(["closeFormUpdateActivity"]);

// define props
const props = defineProps({
	isShow: {
		type: Boolean,
		default: false,
	},
	row: {
		type: Object,
		required: true,
	},
});
const isShowInput = computed(() => props.isShow);

// methods
function onSubmit() {
	ruleFormRef.value.validate((valid) => {
		if (valid) {
			const body = new FormData();
			body.append("activityId", formUpdateActivity.value.activityId);
			body.append("siteId", formUpdateActivity.value.siteId);
			body.append("additionalInfo", formUpdateActivity.value.additionalInfo);
			body.append("targetQuartal", formUpdateActivity.value.targetQuartal);
			body.append("remark", formUpdateActivity.value.remark);
			body.append("pic", formUpdateActivity.value.pic);

			if (userStore.getters.role === "admin") {
				body.append("budget", formUpdateActivity.value.budget);
				body.append("cost", formUpdateActivity.value.cost);
			}

			const url =
				"/api/activity-plan/" +
				formUpdateActivity.value.activityId +
				"/" +
				formUpdateActivity.value.siteId;

			const { data, status, message } = useFetch({
				url,
				method: "PUT",
				body,
			});

			const unwatch = watch(
				[data, status, message],
				([newData, newStatus, newMessage]) => {
					if (newStatus === "success" && newData) {
						emit("closeFormUpdateActivity", newData);

						unwatch();
					} else if (newStatus === "error" && newMessage) {
						Notification.error({
							title: "Error",
							message: newMessage,
						});

						unwatch();
					}
				}
			);
		} else {
			return false;
		}
	});
}
</script>
