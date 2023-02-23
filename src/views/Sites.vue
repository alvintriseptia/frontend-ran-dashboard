<template>
	<div>
		<Card title="Sites" :alert="alertCard">
			<template #header>
				<OutlinedButton @onClick="showInput('input')" class="mr-4"
					>Input
				</OutlinedButton>
				<OutlinedButton @onClick="showImportSites">Import</OutlinedButton>
			</template>

			<section class="my-4 flex items-center justify-between">
				<el-input
					class="max-w-[200px]"
					placeholder="Search Site"
					v-model="searchSite"
					@input="handleSearchSites"
					clearable
				>
				</el-input>
				<div class="flex items-center">
					<div class="flex items-center">
						<p class="text-xs mr-2">Rows per page</p>
						<div class="max-w-[80px]">
							<Select
								:options="limits"
								@onChange="handleLimitChange"
								placeholder="Rows per page"
								defaultValue="10"
							/>
						</div>
					</div>
					<el-pagination
						:page-size="sitesParams.limit"
						:pager-count="5"
						layout="prev, pager, next"
						:total="sites.totalData"
						@current-change="handleCurrentChange"
					>
					</el-pagination>
				</div>
			</section>
			<section>
				<SiteTable
					@onSelect="handleRemoveButton"
					:data="sites.data"
					@onRemove="handleShowModalConfirmation"
					@onEdit="handleEdit"
					:loading="sites.loading"
					@onSort="handleSitesSortChange"
					:numberStart="
						sitesParams.page * sitesParams.limit - sitesParams.limit + 1
					"
				/>
			</section>
		</Card>

		<!-- Dialog -->
		<ImportExcel
			:isShow="isShowImportSites"
			title="Import Sites"
			url="/api/site/upload"
			@closeImportExcel="closeImportSites"
			urlTemplate="Site Template.xlsx"
		/>

		<ModalConfirmation
			title="Confirmation"
			:isModalVisible="isShowModalConfirmation"
			:message="messageDialog"
			:description="descriptionDialog"
			@onSubmit="handleConfirmModal"
			@onCancel="handleCancelModal"
		/>

		<InputSite
			:isShow="isShowInput"
			@closeInput="closeInput"
			:type="isEdit ? 'edit' : 'input'"
			:currentData="currentData"
			:nsDepartmentOptions="nsDepartmentOptions"
			:doSubDepartmentOptions="doSubDepartmentOptions"
			:kabupatenOptions="kabupatenOptions"
		/>
	</div>
</template>

<script setup>
import {
	SiteTable,
	Card,
	OutlinedButton,
	ImportExcel,
	ModalConfirmation,
	InputSite,
	Select,
} from "@/components";
import { ref, unref, onMounted, watch } from "vue";
import { Notification } from "element-ui";
import { useFetch } from "@/composables";
import { debounce } from "vue-debounce";

// Sites
const sitesParams = ref({
	site: "",
	sortBy: null,
	orderBy: null,
	page: 1,
	limit: 10,
});
const sites = ref(
	useFetch({
		url: "/api/site",
		params: sitesParams,
	})
);

// handle sort change
const handleSitesSortChange = (sort) => {
	if (sort) {
		sitesParams.value = {
			...sitesParams.value,
			sortBy: sort.sortBy,
			orderBy: sort.orderBy,
		};
	} else {
		sitesParams.value = {
			...sitesParams.value,
			sortBy: null,
			orderBy: null,
		};
	}
};

// handle limit change
const handleLimitChange = (val) => {
	// get current page
	const currentPage = Math.ceil(
		(sitesParams.value.page * sitesParams.value.limit) / val
	);
	if (currentPage > sites.value.totalPage) {
		sitesParams.value = {
			...sitesParams.value,
			limit: val,
			page: sites.value.totalPage,
		};
	} else {
		sitesParams.value = {
			...sitesParams.value,
			limit: val,
			page: currentPage,
		};
	}
};

// handle pagination
const handleCurrentChange = (val) => {
	sitesParams.value.page = val;
};

const limits = [
	{
		value: 10,
		label: "10",
	},
	{
		value: 20,
		label: "20",
	},
	{
		value: 50,
		label: "50",
	},
	{
		value: 100,
		label: "100",
	},
];

// handle search
const searchSite = ref("");
const handleSearchSites = debounce((val) => {
	if (val.length === 1) return;

	if (val && val.length >= 3) {
		sitesParams.value = {
			...sitesParams.value,
			site: val,
			page: 1,
		};
	} else {
		sitesParams.value = {
			...sitesParams.value,
			site: "",
			page: 1,
		};
	}
}, "400ms");

// Menu Input
const isShowInput = ref(false);
const isEdit = ref(false);
const showInput = (type) => {
	if (type === "edit") {
		isEdit.value = true;
		isShowInput.value = true;
	} else {
		isEdit.value = false;
		isShowInput.value = true;
		currentData.value = {};
		indexSite.value = null;
	}
};

const closeInput = (result) => {
	isShowInput.value = false;
	if (result) {
		if (result.type === "input") {
			sites.value.data = [result, ...sites.value.data];

			Notification.success({
				title: "Success",
				message: "Site has been added",
			});
		} else {
			Notification.success({
				title: "Success",
				message: `Site ${
					sites.value.data[indexSite.value].siteID
				} has been updated`,
			});

			sites.value.data[indexSite.value].siteID = result.siteID;
			sites.value.data[indexSite.value].siteName = result.siteName;
			sites.value.data[indexSite.value].nsID = result.nsID;
			sites.value.data[indexSite.value].namaNS = result.namaNS;
			sites.value.data[indexSite.value].doID = result.doID;
			sites.value.data[indexSite.value].namaDO = result.namaDO;
			sites.value.data[indexSite.value].kabupatenID = result.kabupatenID;
			sites.value.data[indexSite.value].namaKabupaten = result.namaKabupaten;
		}

		//reset state
		currentData.value = {};
		indexSite.value = null;
	}
};

// Form
const currentData = ref({});
const indexSite = ref(null);
const handleEdit = (data) => {
	if (data.row.siteID) {
		currentData.value = data.row;
		indexSite.value = data.index;
		showInput("edit");
	}
};

// Menu Import Sites
const isShowImportSites = ref(false);
const alertCard = ref(null);

const showImportSites = () => {
	if (isShowImportSites) {
		isShowImportSites.value = false;
	}
	isShowImportSites.value = true;
};

const closeImportSites = (result) => {
	isShowImportSites.value = false;
	if (result) {
		// console.log(result);
		if (result.isRefresh) {
			alertCard.value = {
				type:
					!result.message || result.message.length === 0
						? "success"
						: "warning",
				title: result.data,
				description: result.message,
			};
			sitesParams.value = {
				...sitesParams.value,
				page: 1,
			};
		} else if (result.message) {
			alertCard.value = {
				type: "warning",
				title: result.data,
				description: result.message,
			};
		}
	} else {
		alertCard.value = null;
	}
};

// ==========================
// Delete Button
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
const isShowModalConfirmation = ref(false);
const row = ref(null);
const index = ref(null);
const type = ref(null);
const typeDialog = ref(null);
const messageDialog = ref(null);
const descriptionDialog = ref(null);
const deletedCount = ref(0);

const handleShowModalConfirmation = (result) => {
	if (result) {
		console.log(result);
		row.value = result.row;
		index.value = result.index;
		type.value = result.type;
		typeDialog.value = result.typeDialog;

		if (typeDialog.value === "delete") {
			let url = "";

			messageDialog.value = "Are you sure want to delete this site?";
			url = `/api/activity-plan/count-by-site-id/${result.row.siteID}`;

			const { data, status, message } = useFetch({
				url,
			});
			const unwatch = watch(
				[data, status, message],
				([newData, newStatus, newMessage]) => {
					if (newStatus === "success" && newData) {
						if (parseInt(newData) > 0) {
							deletedCount.value = parseInt(newData);
							if (result.type === "site") {
								descriptionDialog.value = `There are ${newData} activity plans related to this site will be deleted.`;
							} else {
								descriptionDialog.value = `There are ${newData} sites that use this ${type.value.toUpperCase()} will be deleted.`;
							}
						} else {
							deletedCount.value = 0;
						}
						isShowModalConfirmation.value = true;

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
		} else if (typeDialog.value === "edit") {
			messageDialog.value = "Are you sure want to update this data?";
			const { data, status, message } = useFetch({
				url: `/api/site/count-by-${result.type}/${result.row.value}`,
			});
			const unwatch = watch(
				[data, status, message],
				([newData, newStatus, newMessage]) => {
					if (newStatus === "success" && newData) {
						if (parseInt(newData) > 0) {
							deletedCount.value = parseInt(newData);
							descriptionDialog.value = `There are ${newData} sites that use this ${type.value.toUpperCase()} will be updated.`;
						} else {
							deletedCount.value = 0;
						}
						isShowModalConfirmation.value = true;

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
		}
	} else {
		Nofitication.error({
			title: "Error",
			message: "Please try again",
		});
	}
};

const handleCancelModal = () => {
	isShowModalConfirmation.value = false;
	messageDialog.value = null;
	descriptionDialog.value = null;
};

const handleConfirmModal = () => {
	if (typeDialog.value === "delete") {
		handleDelete();
		isShowModalConfirmation.value = false;
	}
};

const handleDelete = () => {
	isShowModalConfirmation.value = false;
	const url = "/api/site/" + row.value.siteID;

	const { status, message } = useFetch({
		url: url,
		method: "DELETE",
	});

	const unwatch = watch([status, message], ([newStatus, newMessage]) => {
		if (newStatus === "success") {
			sites.value.data.splice(index.value, 1);

			const message = `Site ${row.value.siteID} has been deleted`;

			// reset modal
			deletedCount.value = 0;
			row.value = null;
			index.value = null;
			type.value = null;

			Notification.success({
				title: "Success",
				message: message,
			});

			unwatch();
		} else if (newStatus === "error" && newMessage) {
			Notification.error({
				title: "Error",
				message: newError,
			});

			unwatch();
		}
	});
};

// ==========================

// NS Department
const urlNsDepartment = ref(null);
const nsDepartment = useFetch({
	url: urlNsDepartment,
});
const nsDepartmentOptions = ref([]);

// DO Sub-Department
const urlDoSubDepartment = ref(null);
const doSubDepartment = useFetch({
	url: urlDoSubDepartment,
});
const doSubDepartmentOptions = ref([]);

// Kabupaten
const urlKabupaten = ref(null);
const kabupaten = useFetch({
	url: urlKabupaten,
});
const kabupatenOptions = ref([]);

onMounted(async () => {
	urlNsDepartment.value = "/api/ns-departemen";
	urlDoSubDepartment.value = "/api/do-subdepartemen";
	urlKabupaten.value = "/api/kabupaten";
	nsDepartment.doFetch();
	doSubDepartment.doFetch();
	kabupaten.doFetch();

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

	watch(doSubDepartment.data, () => {
		if (doSubDepartment.data !== null && doSubDepartment.data.value !== []) {
			doSubDepartmentOptions.value = doSubDepartment.data.value.map((item) => {
				return {
					label: item.nama,
					value: item.id,
				};
			});
		}
	});

	watch(kabupaten.data, () => {
		if (kabupaten.data !== null && kabupaten.data.value !== []) {
			kabupatenOptions.value = kabupaten.data.value.map((item) => {
				return {
					label: item.nama,
					value: item.id,
				};
			});
		}
	});
});
</script>
