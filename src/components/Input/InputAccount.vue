<template>
  <div
    class="w-full md:w-[350px] p-8 h-full fixed top-0 bottom-0 bg-white transition-all duration-500 overflow-y-auto z-40"
    :class="isShowInput ? 'right-0' : '-right-full'"
  >
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg lg:text-xl font-bold">
        Add New Account
      </h2>
      <OutlinedButton
        size="sm"
        @onClick="handleCloseInput"
      >
        &#10006;
      </OutlinedButton>
    </div>

    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-position="top"
    >
      <el-form-item
        label="Username"
        :label-width="formLabelWidth"
        prop="username"
      >
        <el-input
          v-model="ruleForm.username"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="Password"
        :label-width="formLabelWidth"
        prop="password"
      >
        <el-input
          v-model="ruleForm.password"
          autocomplete="off"
          show-password
        />
      </el-form-item>

      <el-form-item
        label="Confirm Password"
        :label-width="formLabelWidth"
        prop="confirmPassword"
      >
        <el-input
          v-model="ruleForm.confirmPassword"
          show-password
          autocomplete="off"
        />
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
          :default-value="ruleForm.namaNS"
          @onChange="onUpdateNS"
        />
      </el-form-item>

      <el-form-item
        label="Status"
        :label-width="formLabelWidth"
        prop="status"
      >
        <el-select
          v-model="ruleForm.active"
          placeholder="Select Status"
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <div class="mt-8">
        <Button @onClick="onSubmit()">
          Add New Account
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

// Status Options
const statusOptions = [
	{
		value: 1,
		label: "Active",
	},
	{
		value: 0,
		label: "Deactive",
	},
];

// define Props
const props = defineProps({
	isShow: {
		type: Boolean,
		default: false,
	},
	nsDepartmentOptions: {
		type: Array,
		required: true,
	},
});
const isShowInput = computed(() => props.isShow);

// Form
const ruleForm = ref({
	username: "",
	password: "",
	confirmPassword: "",
	namaNS: "",
	active: 1,
});

// Rule Form Ref
const ruleFormRef = ref(null);
const formLabelWidth = "120px";

// Form Rules
const rules = {
	username: [
		{ required: true, message: "Please input username", trigger: "blur" },
	],
	password: [
		{ required: true, message: "Please input password", trigger: "blur" },
		{
			validator: (rule, value, callback) => {
				//"Password must contain at least 1 uppercase, 1 lowercase, and 1 number"
				const regexExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
				if (value.length < 8) {
					callback(new Error("Password must be at least 8 characters"));
				} else if (!regexExp.test(value)) {
					callback(
						new Error(
							"Password must contain at least 1 uppercase, 1 lowercase, and 1 number"
						)
					);
				} else {
					callback();
				}
			},
		},
	],
	confirmPassword: [
		{
			required: true,
			message: "Please input confirm password",
			trigger: "blur",
		},
		{
			validator: (rule, value, callback) => {
				if (value === ruleForm.value.password) {
					callback();
				} else {
					callback(new Error("Please input same password"));
				}
			},
			trigger: "blur",
		},
	],
	namaNS: [
		{ required: true, message: "Please input NS name", trigger: "blur" },
	],
};

function onUpdateNS(value) {
	ruleForm.value.namaNS = value;
	ruleFormRef.value.model.namaNS = value;
}

function onSubmit() {
	ruleFormRef.value.validate((valid) => {
		if (valid) {
			const body = new FormData();
			body.append("username", ruleForm.value.username);
			body.append("password", ruleForm.value.password);
			body.append("ns", ruleForm.value.namaNS);
			body.append("active", ruleForm.value.active);

			// console.log(activityStatusParams);
			const { data, status, message } = useFetch({
				url: "/api/auth/user",
				method: "POST",
				body,
			});

			const unwatch = watch(
				[data, status, message],
				([newData, newStatus, newMessage]) => {
					if (newStatus === "success" && newData) {
						// reset form
						ruleForm.value = {
							username: "",
							password: "",
							confirmPassword: "",
							namaNS: "",
							active: 1,
						};

						ruleFormRef.value.model.namaNS = "";

						ruleFormRef.value.resetFields();

						emit("closeInput", newData);

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
