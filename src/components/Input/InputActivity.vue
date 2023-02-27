<template>
  <div
    class="w-full md:w-[350px] p-8 h-full fixed top-0 bottom-0 bg-white transition-all duration-500 overflow-y-auto z-50"
    :class="isShowInput ? 'right-0' : '-right-full'"
  >
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg lg:text-xl font-bold">
        Input Plan Activity
      </h2>
      <OutlinedButton
        size="sm"
        @onClick="emit('closeInputActivities')"
      >
        &#10006;
      </OutlinedButton>
    </div>
    <el-form
      ref="ruleFormRef"
      :model="formInputActivity"
      :rules="rules"
      label-position="top"
    >
      <el-form-item
        label="Activity"
        :label-width="formLabelWidth"
        prop="deskripsiActivity"
      >
        <RemoteSearchSelect
          :model-value="formInputActivity.deskripsiActivity"
          :options="unref(searchActivities.data)"
          class="w-full"
          :is-multiple="false"
          placeholder="Select Activity"
          label-option="deskripsiActivity"
          value-option="id"
          @onChange="handleSearchActivities"
          @onUpdate="handleUpdateActivity"
        />
      </el-form-item>

      <el-form-item
        label="Site"
        :label-width="formLabelWidth"
        prop="siteId"
      >
        <RemoteSearchSelect
          :model-value="formInputActivity.siteId"
          :options="unref(searchSites.data)"
          class="w-full"
          :is-multiple="false"
          placeholder="Select Site"
          label-option="id,name"
          value-option="id"
          @onChange="handleSearchSites"
          @onUpdate="handleUpdateSite"
        />
      </el-form-item>

      <el-form-item
        label="PIC"
        :label-width="formLabelWidth"
        prop="pic"
      >
        <el-input
          v-model="formInputActivity.pic"
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
          v-model="formInputActivity.additionalInfo"
          autocomplete="off"
          placeholder="Additional Info"
          type="textarea"
          :rows="2"
        />
      </el-form-item>

      <el-form-item
        label="Remark"
        :label-width="formLabelWidth"
        prop="remark"
      >
        <el-input
          v-model="formInputActivity.remark"
          autocomplete="off"
          placeholder="Remark"
        />
      </el-form-item>

      <el-form-item
        label="Budget"
        :label-width="formLabelWidth"
        prop="budget"
      >
        <el-input
          v-model="formInputActivity.budget"
          autocomplete="off"
          placeholder="Budget"
        />
      </el-form-item>

      <el-form-item
        type="number"
        label="Cost"
        :label-width="formLabelWidth"
        prop="cost"
      >
        <el-input
          v-model="formInputActivity.cost"
          autocomplete="off"
          placeholder="Cost"
        />
      </el-form-item>

      <el-form-item
        label="Target Quartal"
        :label-width="formLabelWidth"
        prop="targetQuartal"
      >
        <Select
          v-model="formInputActivity.targetQuartal"
          :options="options.quarters"
          :is-multiple="false"
          placeholder="Select Target Quartal"
          class="w-full"
          @onChange="onUpdateQuartal"
        />
      </el-form-item>

      <el-form-item
        label="Status"
        :label-width="formLabelWidth"
        prop="status"
      >
        <el-select
          v-model="formInputActivity.status"
          placeholder="Select Status"
          class="w-full"
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        v-if="parseInt(formInputActivity.status) === 1"
        label="Date Executed"
        :label-width="formLabelWidth"
        prop="dateExecuted"
      >
        <el-date-picker
          v-model="formInputActivity.dateExecuted"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="Pick a day"
          :picker-options="pickerOptions"
        />
      </el-form-item>

      <div class="mt-8">
        <Button @onClick="onSubmit()">
          Input Data
        </Button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import {
	OutlinedButton,
	Button,
	RemoteSearchSelect,
	Select,
} from "@/components";
import { computed, onMounted, ref, unref, watch } from "vue";
import { useFetch } from "@/composables";
import { Notification } from "element-ui";
import { debounce } from "vue-debounce";
import { options } from "@/utils";

const pickerOptions = {
	disabledDate(time) {
		return time.getTime() > Date.now();
	},
};

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
	deskripsiActivity: "",
	additionalInfo: "",
	remark: "",
	targetQuartal: "",
	siteId: "",
	pic: "",
	budget: "",
	cost: "",
	status: "",
	dateExecuted: "",
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
	status: [{ required: true, message: "Please input status", trigger: "blur" }],
	dateExecuted: [
		{
			required: true,
			message: "Please input week executed",
			trigger: "blur",
		},
	],
	cost: [
		{
			validator: (rule, value, callback) => {
				if(parseInt(value) === 0 || Number(value)){
					callback();
				} else {
					callback(new Error("Please input number"));
					callback();
				}
			},
		},
	],
});

// watch status change to decide week executed
watch(
	() => formInputActivity.value.status,
	(val) => {
		if (val === 0) {
			rules.value.dateExecuted = null;
		} else {
			rules.value.dateExecuted = [
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
const urlSearchActivity = ref(null);
const searchActivities = ref(
	useFetch({
		url: urlSearchActivity,
		params: searchActivityParams,
	})
);

// handle search
const handleSearchActivities = debounce((val) => {
	if (val.length >= 1 && val.length <= 2) return;

	if (val && val.length >= 3) {
		searchActivityParams.value.deskripsiActivity = val;
	} else {
		searchActivityParams.value.deskripsiActivity = "";
	}
}, "400ms");

// handle on update
function handleUpdateActivity(value) {
	formInputActivity.value.deskripsiActivity = value;
	// set manual value deskripsi activity to ruleFormRef
	ruleFormRef.value.model.deskripsiActivity = value;
}

const onUpdateQuartal = (value) => {
	formInputActivity.value.targetQuartal = value;
	ruleFormRef.value.model.targetQuartal = value;
};

// Sites
// acitivity params
const searchSiteParams = ref({
	site: "",
});

// fetch first data
const urlSearchSite = ref(null);
const searchSites = ref(
	useFetch({
		url: urlSearchSite,
		params: searchSiteParams,
	})
);

// handle search
const handleSearchSites = debounce((val) => {
	if (val.length >= 1 && val.length <= 2) return;

	if (val && val.length >= 3) {
		searchSiteParams.value.site = val;
	} else {
		searchSiteParams.value.site = "";
	}
}, "400ms");

// onMounted
onMounted(async () => {
	urlSearchActivity.value = "/api/activity/search";
	urlSearchSite.value = "/api/site/search";
});

// handle on update
function handleUpdateSite(value) {
	formInputActivity.value.siteId = value;
	// set manual value deskripsi activity to ruleFormRef
	ruleFormRef.value.model.siteId = value;
}

// methods
function onSubmit() {
	ruleFormRef.value.validate((valid) => {
		if (valid) {
			const body = new FormData();
			body.append(
				"activityId",
				parseInt(formInputActivity.value.deskripsiActivity)
			);
			body.append("siteId", formInputActivity.value.siteId);
			body.append("additionalInfo", formInputActivity.value.additionalInfo);
			body.append("pic", formInputActivity.value.pic);
			body.append("budget", formInputActivity.value.budget);
			body.append("cost", formInputActivity.value.cost);
			body.append("targetQuartal", formInputActivity.value.targetQuartal);
			body.append("remark", formInputActivity.value.remark);
			body.append("done", parseInt(formInputActivity.value.status));
			if (parseInt(formInputActivity.value.status) === 1) {
				body.append("dateExecuted", formInputActivity.value.dateExecuted);
			}

			// console.log(activityStatusParams);
			const { data, status, message } = useFetch({
				url: "/api/activity-plan",
				method: "POST",
				body,
			});

			const unwatch = watch(
				[data, status, message],
				([newData, newStatus, newMessage]) => {
					if (newStatus === "success" && newData) {
						//reset form
						formInputActivity.value = {
							deskripsiActivity: "",
							additionalInfo: "",
							remark: "",
							targetQuartal: "",
							siteId: "",
							pic: "",
							budget: "",
							cost: "",
							status: "",
							dateExecuted: "",
						};
						ruleFormRef.value.model.deskripsiActivity = "";
						ruleFormRef.value.model.siteId = "";
						ruleFormRef.value.resetFields();

						emit("closeInputActivities", newData);

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
