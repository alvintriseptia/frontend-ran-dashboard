<template>
	<div
		v-loading="loading"
		class="w-full md:w-[350px] p-8 h-full fixed top-0 bottom-0 bg-white transition-all duration-500 overflow-y-auto z-40 overflow-x-hidden"
		:class="isShowInput ? 'right-0' : '-right-full'"
	>
		<div class="flex justify-between items-center mb-6">
			<h2 class="text-lg lg:text-xl font-bold">Update Plan Activity</h2>
			<OutlinedButton size="sm" @onClick="emit('closeFormUpdateActivity')">
				&#10006;
			</OutlinedButton>
		</div>
		<el-form
			ref="ruleFormRef"
			:model="formUpdateActivity"
			:rules="rules"
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
				/>
			</el-form-item>

			<el-form-item label="Site" :label-width="formLabelWidth" prop="siteId">
				<el-input
					v-model="formUpdateActivity.siteId"
					autocomplete="off"
					:disabled="true"
				/>
			</el-form-item>

			<el-form-item label="PIC" :label-width="formLabelWidth" prop="pic">
				<el-input
					v-model="formUpdateActivity.pic"
					autocomplete="off"
					placeholder="PIC"
				/>
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
					placeholder="Additional Info"
				/>
			</el-form-item>

			<el-form-item label="Remark" :label-width="formLabelWidth" prop="remark">
				<el-input
					v-model="formUpdateActivity.remark"
					autocomplete="off"
					placeholder="Remark"
				/>
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
					placeholder="Budget"
				/>
			</el-form-item>

			<el-form-item
				v-if="userStore.getters.role === 'admin'"
				type="number"
				label="Cost"
				:label-width="formLabelWidth"
				prop="cost"
			>
				<CurrencyInput v-model="formUpdateActivity.cost" />
			</el-form-item>

			<el-form-item
				label="Target Quartal"
				:label-width="formLabelWidth"
				prop="targetQuartal"
			>
				<Select
					v-model="formUpdateActivity.targetQuartal"
					:options="options.quarters"
					:is-multiple="false"
					placeholder="Select Target Quartal"
					:default-value="formUpdateActivity.targetQuartal"
					class="w-full"
					@onChange="onUpdateQuartal"
				/>
			</el-form-item>

			<div class="mt-8">
				<Button @onClick="onSubmit()"> Update Data </Button>
			</div>
		</el-form>
	</div>
</template>

<script setup>
import { OutlinedButton, Button, Select, CurrencyInput } from "@/components";
import { computed, ref, watch } from "vue";
import { useFetch } from "@/composables";
import { Notification } from "element-ui";
import { userStore } from "@/stores";
import { options } from "@/utils";

const loading = ref(false);

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
	cost: userStore.getters.role === "admin" ? props.row.cost : "",
});

// watch props row
watch(
	() => props.row,
	(newVal) => {
		formUpdateActivity.value = {
			deskripsiActivity: newVal.deskripsiActivity,
			siteId: newVal.siteID,
			additionalInfo: newVal.additionalInfo,
			remark: newVal.remark,
			targetQuartal: newVal.targetQuartal,
			activityId: newVal.activityID,
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
	siteId: [
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
				if (value.length > 0 && !Number(value)) {
					callback(new Error("Please input number"));
				} else if (parseInt(value) < 0) {
					callback(new Error("Number must be positive"));
				} else if (value % 1 !== 0) {
					callback(new Error("Number must be integer"));
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

// handle quartal
const onUpdateQuartal = (value) => {
	formUpdateActivity.value.targetQuartal = value;
	ruleFormRef.value.model.targetQuartal = value;
};

// methods
function onSubmit() {
	ruleFormRef.value.validate((valid) => {
		if (valid) {
			loading.value = true;
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
						loading.value = false;

						emit("closeFormUpdateActivity", newData);

						unwatch();
					} else if (newStatus === "error" && newMessage) {
						loading.value = false;
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
