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
const userUuid = computed(() => props.row.uuid);

const form = ref({
	username: props.row.username,
	namaNS: props.row.nsID,
});

// Rule Form Ref
const ruleFormRef = ref(null);
const formLabelWidth = "150px";

// Form Rules
const rulesEditAccount = {
	username: [
		{ required: true, message: "Please input username", trigger: "blur" },
	],
	namaNS: [
		{ required: true, message: "Please input NS name", trigger: "blur" },
	],
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

function onUpdateNS(value) {
	form.value.namaNS = value;
	ruleFormRef.value.model.namaNS = value;
}

function onSubmit() {
	ruleFormRef.value.validate((valid) => {
		if (valid) {
			const body = new FormData();
			let url = "";

			body.append("uuid", userUuid.value);
			body.append("oldUsername", username.value);
			body.append("username", form.value.username);
			body.append("ns", form.value.namaNS);
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
