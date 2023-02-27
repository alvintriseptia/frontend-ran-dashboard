<template>
	<el-dialog
		:title="'Edit Account'"
		:visible.sync="dialogFormVisible"
		:close-on-click-modal="false"
		@close="onCancel"
		@closed="() => {}"
	>
		<el-form ref="ruleFormRef" :model="form" :rules="rulesEditAccount">
			<el-form-item
				label="Username"
				:label-width="formLabelWidth"
				prop="username"
			>
				<el-input v-model="form.username" autocomplete="off" />
			</el-form-item>

			<el-form-item
				label="NS Department"
				:label-width="formLabelWidth"
				prop="namaNS"
			>
				<Select
					v-model="form.namaNS"
					:options="nsDepartmentOptions"
					placeholder="Select NS Department"
					:default-value="form.namaNS"
					@onChange="onUpdateNS"
				/>
			</el-form-item>

			<el-form-item label="Status" :label-width="formLabelWidth" prop="active">
				<el-select v-model="form.active" placeholder="Select Status">
					<el-option
						v-for="item in statusOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					/>
				</el-select>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="onCancel">Cancel</el-button>
			<el-button type="primary" @click="onSubmit">Update</el-button>
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
});

function onCancel() {
	emit("onCancel");
}

const dialogFormVisible = computed(() => props.isModalVisible);
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

			body.append("username", username.value);
			body.append("newUsername", form.value.username);
			body.append("ns", form.value.namaNS);
			body.append("active", form.value.active);
			url = "/api/auth/user/" + username.value;

			const { data, status, message } = useFetch({
				url: url,
				method: "PUT",
				body,
			});

			watch([data, status, message], ([newData, newStatus, newMessage]) => {
				if (newStatus === "success" && newData) {
					ruleFormRef.value.model.namaNS = "";
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
