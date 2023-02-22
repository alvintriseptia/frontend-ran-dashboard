<template>
	<el-dialog
		:title="type === 'reset' ? 'Reset Password' : 'Edit Account'"
		:visible.sync="dialogFormVisible"
		@close="onCancel"
		@closed="() => {}"
		:close-on-click-modal="false"
	>
		<el-form
			ref="ruleFormRef"
			:model="form"
			:rules="type === 'reset' ? rulesResetPassword : rulesEditAccount"
		>
			<el-form-item
				label="Username"
				:label-width="formLabelWidth"
				prop="username"
			>
				<el-input
					:disabled="type === 'reset'"
					v-model="form.username"
					autocomplete="off"
				></el-input>
			</el-form-item>

			<el-form-item
				v-if="type === 'reset'"
				label="Password"
				:label-width="formLabelWidth"
				prop="password"
			>
				<el-input
					v-model="form.password"
					autocomplete="off"
					show-password
				></el-input>

				<p class="text-xs">
					<strong>Note: </strong> Make sure your password is saved in your
					password manager.
				</p>
			</el-form-item>

			<el-form-item
				v-if="type === 'reset'"
				label="Confirm Password"
				:label-width="formLabelWidth"
				prop="confirmPassword"
			>
				<el-input
					v-model="form.confirmPassword"
					show-password
					autocomplete="off"
				></el-input>
			</el-form-item>

			<el-form-item
				v-if="type === 'edit'"
				label="NS Department"
				:label-width="formLabelWidth"
				prop="namaNS"
			>
				<Select
					v-model="form.namaNS"
					:options="nsDepartmentOptions"
					placeholder="Select NS Department"
					@onChange="onUpdateNS"
					:defaultValue="form.namaNS"
				/>
			</el-form-item>

			<el-form-item
				v-if="type === 'edit'"
				label="Status"
				:label-width="formLabelWidth"
				prop="active"
			>
				<el-select v-model="form.active" placeholder="Select Status">
					<el-option
						v-for="item in statusOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="onCancel">Cancel</el-button>
			<el-button type="primary" @click="onSubmit">{{
				type === "reset" ? "Reset" : "Update"
			}}</el-button>
		</span>
	</el-dialog>
</template>

<script setup>
import { Select } from "@/components";
import { computed, ref, watch } from "vue";
import { useFetch } from "@/composables";
import { Notification } from "element-ui";

const emit = defineEmits(["onSubmit", "onCancel"]);
const props = defineProps({
	row: {
		type: Object,
		required: true,
	},
	isModalVisible: {
		type: Boolean,
		required: true,
	},
	nsDepartmentOptions: {
		type: Array,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
});

function onCancel() {
	emit("onCancel");
}

const dialogFormVisible = computed(() => props.isModalVisible);
const type = computed(() => props.type);
const username = computed(() => props.row.username);

const form = ref({
	username: props.row.username,
	password: "",
	confirmPassword: "",
	namaNS: props.row.nsID,
	active: parseInt(props.row.active),
});

// Rule Form Ref
const ruleFormRef = ref(null);
const formLabelWidth = "150px";

// Form Rules
const rulesResetPassword = {
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
				if (value === form.value.password) {
					callback();
				} else {
					callback(new Error("Please input same password"));
				}
			},
			trigger: "blur",
		},
	],
};

const rulesEditAccount = {
	username: [
		{ required: true, message: "Please input username", trigger: "blur" },
	],
	namaNS: [
		{ required: true, message: "Please input NS name", trigger: "blur" },
	],
	active: [{ required: true, message: "Please input status", trigger: "blur" }],
};

// watch props row
watch(
	() => props.row,
	(newVal) => {
		form.value = {
			username: newVal.username,
			password: "",
			confirmPassword: "",
			namaNS: newVal.nsID,
			active: parseInt(newVal.active),
		};
		if (ruleFormRef.value) {
			ruleFormRef.value.resetFields();
		}
	}
);
// watch props type
watch(
	() => props.type,
	(newVal) => {
		if (ruleFormRef.value) {
			ruleFormRef.value.resetFields();
		}
	}
);

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

function onUpdateNS(value) {
	form.value.namaNS = value;
	ruleFormRef.value.model.namaNS = value;
}

function onSubmit() {
	ruleFormRef.value.validate((valid) => {
		if (valid) {
			const body = new FormData();
			let url = "";

			if (type.value === "edit") {
				body.append("username", username.value);
				body.append("newUsername", form.value.username);
				body.append("ns", form.value.namaNS);
				body.append("active", form.value.active);
				url = "/api/auth/user/" + username.value;
			} else if (type.value === "reset") {
				body.append("username", username.value);
				body.append("password", form.value.password);
				url = "/api/auth/user/reset-password/" + username.value;
			}

			const { data, status, message } = useFetch({
				url: url,
				method: "PUT",
				body,
			});

			watch([data, status, message], ([newData, newStatus, newMessage]) => {
				if (newStatus === "success" && newData) {
					ruleFormRef.value.model.namaNS = "";
					form.value = {
						username: "",
						password: "",
						confirmPassword: "",
						namaNS: "",
						active: 1,
					};

					emit("onSubmit", newData);
				} else if (newStatus === "error" && newMessage) {
					Notification.error({
						title: "Error",
						message: newMessage,
					});
				}
			});
		} else {
			return false;
		}
	});
}
</script>
