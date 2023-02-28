<template>
	<main>
		<Card id="account-table" v-loading="isLoading" title="Accounts">
			<template #header>
				<OutlinedButton class="mr-4" @onClick="showInput()">
					Add Account
				</OutlinedButton>
				<Button @onClick="handleExportAccounts"> Export </Button>
			</template>
			<AccountTable
				:data="accounts.data"
				@onReset="handleShowModalConfirmation"
				@onEdit="handleShowModalAccount"
				@onActive="handleActiveAccount"
			/>
		</Card>

		<!-- DIALOG -->
		<ModalAccount
			:is-modal-visible="isShowModalAccount"
			:ns-department-options="nsDepartmentOptions"
			:row="rowEdit"
			@onSubmit="handleConfirmModalAccount"
			@onCancel="handleCancelModal"
		/>

		<!-- Reset Confirmation -->
		<ModalConfirmation
			title="Confirmation"
			:is-modal-visible="isShowModalConfirmation"
			:message="messageModalConfirmation"
			@onSubmit="handleConfirmModalConfirmation"
			@onCancel="handleCancelModalConfirmation"
		/>

		<!-- FORM INPUT -->
		<InputAccount
			:is-show="isShowInput"
			:ns-department-options="nsDepartmentOptions"
			@closeInput="closeInput"
		/>
	</main>
</template>

<script setup>
import {
	AccountTable,
	Card,
	ModalAccount,
	OutlinedButton,
	InputAccount,
	ModalConfirmation,
	Button,
} from "@/components";
import { ref, onMounted, watch } from "vue";
import { Loading, Notification } from "element-ui";
import { useFetch } from "@/composables";
import { convertUtil } from "@/utils";
import axios from "axios";

// ====================================== ACCOUNTS DATA ======================================
// Data
const accounts = ref(
	useFetch({
		url: "/api/auth/user/all",
	})
);

const isLoading = ref(false);

// ====================================== ADD ACCOUNT ======================================
// Menu Input
const isShowInput = ref(false);
const isEdit = ref(false);
const showInput = () => {
	isEdit.value = false;
	isShowInput.value = true;
};

const closeInput = (result) => {
	isShowInput.value = false;
	if (result) {
		accounts.value.data.push(result);
		accounts.value.data.sort((a, b) => {
			if (a.username < b.username) {
				return -1;
			}
			if (a.username > b.username) {
				return 1;
			}
			return 0;
		});

		Notification.success({
			title: "Success",
			message: "Account has been added",
		});
	}
};

// ====================================== RESET ACCOUNT ======================================
const isShowModalConfirmation = ref(false);
const rowReset = ref({});
const indexReset = ref(null);
const messageModalConfirmation = ref("");

const handleShowModalConfirmation = (result) => {
	if (result) {
		rowReset.value = result.row;
		indexReset.value = result.index;
		isShowModalConfirmation.value = true;

		const reset = convertUtil.toBoolean(rowReset.value.reset) ? 0 : 1;

		if (reset) {
			messageModalConfirmation.value = `Are you sure to reset <em>'${rowReset.value.username}'</em> account?`;
		} else {
			messageModalConfirmation.value = `Are you sure to cancel reset <em>'${rowReset.value.username}'</em> account?`;
		}
	}
};

const handleCancelModalConfirmation = () => {
	isShowModalConfirmation.value = false;
};

const handleConfirmModalConfirmation = () => {
	isLoading.value = true;
	const body = new FormData();
	const reset = convertUtil.toBoolean(rowReset.value.reset) ? false : true;
	body.append("reset", reset);

	const { data, status, message } = useFetch({
		url: "/api/auth/user/account-reset-by-admin/" + rowReset.value.uuid,
		method: "PUT",
		body,
	});

	const unwatch = watch(
		[data, status, message],
		([newData, newStatus, newMessage]) => {
			if (newStatus === "success" && newData) {
				isLoading.value = false;

				Notification.success({
					title: "Success",
					message: reset
						? "Account has been reset"
						: "Account has been unreset",
				});

				isShowModalConfirmation.value = false;

				console.log(newData);

				const newReset = convertUtil.toBoolean(rowReset.value.reset) ? 0 : 1;
				accounts.value.data[indexReset.value].reset = newReset;
				accounts.value.data[indexReset.value].updatedAt = newData.updatedAt;
				unwatch();
			} else if (newStatus === "error" && newMessage) {
				isLoading.value = false;

				Notification.error({
					title: "Error",
					message: newMessage,
				});

				isShowModalConfirmation.value = false;

				unwatch();
			}
		}
	);
};

// ===================================== EDIT ACCOUNT =====================================
const isShowModalAccount = ref(false);
const rowEdit = ref({});
const indexEdit = ref(null);

const handleShowModalAccount = (result) => {
	if (result) {
		rowEdit.value = result.row;
		indexEdit.value = result.index;
		isShowModalAccount.value = true;
	}
};

const handleCancelModal = () => {
	isShowModalAccount.value = false;
};

const handleConfirmModalAccount = (result) => {
	isLoading.value = true;
	const { data, status, message } = useFetch({
		url: result.url,
		method: "PUT",
		body: result.body,
	});

	watch([data, status, message], ([newData, newStatus, newMessage]) => {
		if (newStatus === "success" && newData) {
			isLoading.value = false;
			accounts.value.data[indexEdit.value].username = newData.username;
			accounts.value.data[indexEdit.value].nsID = newData.nsID;
			accounts.value.data[indexEdit.value].namaNS = newData.namaNS;
			accounts.value.data[indexEdit.value].updatedAt = newData.updatedAt;

			rowEdit.value = {};
			indexEdit.value = null;

			isShowModalAccount.value = false;
			Notification.success({
				title: "Success",
				message: "Account has been updated",
			});
		} else if (newStatus === "error" && newMessage) {
			isLoading.value = false;
			Notification.error({
				title: "Error",
				message: newMessage,
			});
		}
	});
};

// ================================ NS Department ================================
// NS Department
const urlNsDepartment = ref(null);
const nsDepartment = useFetch({
	url: urlNsDepartment,
});
const nsDepartmentOptions = ref([]);

onMounted(async () => {
	urlNsDepartment.value = "/api/ns-departemen";
	nsDepartment.doFetch();

	watch(nsDepartment.data, () => {
		if (nsDepartment.data !== null && nsDepartment.data.value !== []) {
			nsDepartmentOptions.value = nsDepartment.data.value.map((item) => {
				return {
					label: item.nama,
					value: item.id,
				};
			});
		}
	});
});

// ========================= HANDLE ACTIVE ACCOUNT =====================================
const handleActiveAccount = (result) => {
	isLoading.value = true;
	const { data, status, message } = useFetch({
		url: result.url,
		method: "PUT",
		body: result.body,
	});

	const unwatch = watch(
		[data, status, message],
		([newData, newStatus, newMessage]) => {
			if (newStatus === "success" && newData) {
				isLoading.value = false;
				accounts.value.data[result.index].active = newData.active;
				accounts.value.data[result.index].updatedAt = newData.updatedAt;

				Notification.success({
					title: "Success",
					message: "Account status has been updated",
				});
				unwatch();
			} else if (newStatus === "error" && newMessage) {
				isLoading.value = false;
				Notification.error({
					title: "Error",
					message: newMessage,
				});

				unwatch();
			}
		}
	);
};

// ========================= EXPORT EXCEL =========================
const handleExportAccounts = async () => {
	try {
		Loading.service({
			lock: true,
			text: "Loading...",
			spinner: "el-icon-loading",
			background: "rgba(0, 0, 0, 0.7)",
		});
		const url = "/api/auth/user/download";
		const response = await axios({
			url,
			method: "GET",
			responseType: "blob",
			timeout: 60000, // wait 60 seconds before timing out
		});

		const blob = new Blob([response.data], {
			type: "application/vnd.ms-excel",
		});
		const link = document.createElement("a");

		link.href = window.URL.createObjectURL(blob);

		const currentDate = new Date();
		const date = currentDate.getDate();
		const month = currentDate.getMonth() + 1;
		const year = currentDate.getFullYear();

		const filename = `accounts-${month}-${date}-${year}.xlsx`;
		link.download = filename;
		link.click();

		Loading.service().close();
		Notification.success({
			title: "Success",
			message: "Data site successfully exported",
		});
	} catch (error) {
		Loading.service().close();
		Notification.error({
			title: "Error",
			message: error,
		});
	}
};
</script>
