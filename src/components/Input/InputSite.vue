<template>
  <div
    class="w-full md:w-[350px] p-8 h-full fixed top-0 bottom-0 bg-white transition-all duration-500 overflow-y-auto z-50"
    :class="isShowInput ? 'right-0' : '-right-full'"
  >
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg lg:text-xl font-bold">
        {{ type === "input" ? "Input Site" : "Edit Site" }}
      </h2>
      <OutlinedButton
        size="sm"
        @onClick="handleCloseInput"
      >
        &#10006;
      </OutlinedButton>
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
        :to="{ name: 'plan-activities-site', params: { siteId: siteID } }"
        target="_blank"
      >
        <el-button
          type="warning"
          size="small"
        >
          Review
        </el-button>
      </router-link>
    </el-alert>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-position="top"
    >
      <el-form-item
        label="Site ID"
        :label-width="formLabelWidth"
        prop="siteID"
      >
        <el-input
          v-model="ruleForm.siteID"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="Site Name"
        :label-width="formLabelWidth"
        prop="siteName"
      >
        <el-input
          v-model="ruleForm.siteName"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="NS Department"
        :label-width="formLabelWidth"
        prop="nsId"
      >
        <Select
          v-model="ruleForm.nsId"
          :options="nsDepartmentOptions"
          placeholder="Select NS Department"
          :default-value="ruleForm.nsId"
          @onChange="onUpdateNS"
        />
      </el-form-item>
      <el-form-item
        label="DO Sub-Department"
        :label-width="formLabelWidth"
        prop="doID"
      >
        <Select
          v-model="ruleForm.doID"
          :options="doSubDepartmentOptions"
          placeholder="Select DO Sub-Department"
          :default-value="ruleForm.doID"
          @onChange="onUpdateDO"
        />
      </el-form-item>
      <el-form-item
        label="Kabupaten"
        :label-width="formLabelWidth"
        prop="kabupatenID"
      >
        <Select
          v-model="ruleForm.kabupatenID"
          :options="kabupatenOptions"
          :is-multiple="false"
          placeholder="Select Kabupaten"
          :default-value="ruleForm.kabupatenID"
          @onChange="onUpdateKabupaten"
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
	doID: "",
	nsId: "",
	kabupatenID: "",
});
const siteID = ref("");
const siteCount = ref(0);

// watch props currentData
onMounted(() => {
	watch(
		() => props.currentData,
		(newVal) => {
			if (newVal.siteID && type.value === "edit") {
				const { data, status, message } = useFetch({
					url: `/api/activity-plan/count-by-site-id/${newVal.siteID}`,
				});
				const unwatch = watch(
					[data, status, message],
					([newData, newStatus, newMessage]) => {
						if (newStatus === "success" && (newData || newData === 0)) {
							siteCount.value = parseInt(newData);
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

				siteID.value = newVal.siteID;
				ruleForm.value = {
					siteID: newVal.siteID,
					siteName: newVal.siteName,
					doID: newVal.doID,
					nsId: newVal.nsID,
					kabupatenID: newVal.kabupatenID,
				};
			} else {
				ruleForm.value = {
					siteID: "",
					siteName: "",
					doID: "",
					nsId: "",
					kabupatenID: "",
				};
				siteCount.value = 0;
				siteID.value = "";
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
	doID: [
		{ required: true, message: "Please input DO name", trigger: "blur" },
	],
	nsId: [
		{ required: true, message: "Please input NS name", trigger: "blur" },
	],
	kabupatenID: [
		{
			required: true,
			message: "Please input kabupaten name",
			trigger: "blur",
		},
	],
};

function onUpdateNS(value) {
	ruleForm.value.nsId = value;
	ruleFormRef.value.model.nsId = value;
}
function onUpdateDO(value) {
	ruleForm.value.doID = value;
	ruleFormRef.value.model.doID = value;
}

function onUpdateKabupaten(value) {
	ruleForm.value.kabupatenID = value;
	ruleFormRef.value.model.kabupatenID = value;
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
			body.append("ns", ruleForm.value.nsId);
			body.append("do", ruleForm.value.doID);
			body.append("kabupaten", ruleForm.value.kabupatenID);

			// console.log(activityStatusParams);
			const { data, status, message } = useFetch({
				url: type.value === "input" ? "/api/site" : `/api/site/${siteID.value}`,
				method: type.value === "input" ? "POST" : "PUT",
				body,
			});

			const unwatch = watch(
				[data, status, message],
				([newData, newStatus, newMessage]) => {
					if (newStatus === "success" && newData) {
						// reset form
						ruleForm.value = {
							siteID: "",
							siteName: "",
							doID: "",
							nsId: "",
							kabupatenID: "",
						};

						ruleFormRef.value.model.doID = "";
						ruleFormRef.value.model.nsId = "";
						ruleFormRef.value.model.kabupatenID = "";

						ruleFormRef.value.resetFields();

						emit("closeInput", { ...newData, type: type.value });

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
