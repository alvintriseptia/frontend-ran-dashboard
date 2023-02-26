<template>
  <main>
    <Card title="Accounts">
      <template #header>
        <OutlinedButton
          class="mr-4"
          @onClick="showInput()"
        >
          Add Account
        </OutlinedButton>
      </template>
      <AccountTable
        :data="accounts.data"
        @onSelect="handleRemoveButton"
        @onReset="handleShowModalAccount"
        @onEdit="handleShowModalAccount"
      />
    </Card>

    <ModalAccount
      :is-modal-visible="isShowModalAccount"
      :ns-department-options="nsDepartmentOptions"
      :row="row"
      :type="type"
      @onSubmit="handleConfirmModal"
      @onCancel="handleCancelModal"
    />

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
} from "@/components";
import { ref, onMounted, watch } from "vue";
import { Notification } from "element-ui";
import { useFetch } from "@/composables";

// Sites
const accounts = ref(
	useFetch({
		url: "/api/auth/user/all",
	})
);

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

// ==========================
// Delete Button
const removeButtonDisabled = ref(null);
const multipleSelection = ref([]);

const handleRemoveButton = (data) => {
	if (data.multipleSelection.length > 0) {
		removeButtonDisabled.value = data.type;
		multipleSelection.value = data.multipleSelection;
	} else {
		removeButtonDisabled.value = null;
		multipleSelection.value = [];
	}
};

// Modal Confirmation
const isShowModalAccount = ref(false);
const row = ref({});
const index = ref(null);
const type = ref("");

const handleShowModalAccount = (result) => {
	if (result) {
		row.value = result.row;
		index.value = result.index;
		type.value = result.type;
		isShowModalAccount.value = true;
	}
};

const handleCancelModal = () => {
	isShowModalAccount.value = false;
};

const handleConfirmModal = (result) => {
	if (type.value === "edit") {
		accounts.value.data[index.value].username = result.username;
		accounts.value.data[index.value].nsID = result.nsID;
		accounts.value.data[index.value].namaNS = result.namaNS;
		accounts.value.data[index.value].active = result.active;

		Notification.success({
			title: "Success",
			message: "Account has been updated",
		});
	} else {
		Notification.success({
			title: "Success",
			message: "Password has been reset",
		});
	}

	isShowModalAccount.value = false;
};

// ==========================

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
</script>
