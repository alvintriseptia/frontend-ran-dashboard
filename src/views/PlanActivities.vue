<template>
  <Card
    title="Plan Activites"
    :alert="alertCard"
  >
    <template #header>
      <OutlinedButton
        v-if="userStore.getters.role === 'admin'"
        class="mr-4"
        @onClick="showInputActivities"
      >
        Input
      </OutlinedButton>
      <OutlinedButton
        v-if="userStore.getters.role === 'admin'"
        @onClick="showImportActivities"
      >
        Import
      </OutlinedButton>
      <Button
        v-if="userStore.getters.role === 'admin'"
        class="ml-4"
        @onClick="handleExportPlanActivities"
      >
        Export
      </Button>
    </template>

    <section class="my-4 flex justify-between items-center">
      <div class="flex items-center gap-x-2">
        <el-button
          icon="el-icon-success"
          size="mini"
          type="success"
          @click="selectAllPlanActivity"
        >
          Select All
        </el-button>
        <el-button
          icon="el-icon-remove"
          size="mini"
          type="danger"
          @click="resetPlanActivityChecked"
        >
          Reset Checkbox
        </el-button>
        <transition name="el-fade-in">
          <el-button
            v-show="isShowButtonCheckbox"
            icon="el-icon-magic-stick"
            size="mini"
            type="warning"
            @click="showModalStatus"
          >
            Update Status
          </el-button>
        </transition>
        <transition name="el-fade-in">
          <el-button
            v-show="isShowButtonCheckbox"
            icon="el-icon-delete"
            size="mini"
            type="danger"
            @click="showModalBulkDelete"
          >
            Delete Selected
          </el-button>
        </transition>
      </div>
      <div class="flex items-center ml-auto">
        <p class="text-xs mr-2">
          Rows per page
        </p>
        <div class="max-w-[80px]">
          <Select
            :options="limits"
            placeholder="Rows per page"
            default-value="10"
            @onChange="handleLimitChange"
          />
        </div>
        <el-pagination
          ref="pagination"
          :page-size="activitiesParams.limit"
          :pager-count="5"
          layout="prev, pager, next"
          :total="activities.totalData"
          @current-change="handleCurrentChange"
        />
      </div>
    </section>

    <section class="min-h-[400px]">
      <ActivityTable
        v-if="activities.data"
        ref="activityTable"
        :data="activities.data"
        :loading="activities.loading"
        :filter-data="activities.filterData"
        :number-start="
          activitiesParams.page * activitiesParams.limit -
            activitiesParams.limit +
            1
        "
        :plan-activity-checked="planActivityChecked"
        @onFilter="handleFilterChange"
        @onSort="handleSortChange"
        @onBulkUpdate="handlePlanActivityChecked"
        @onRemove="handleShowModalConfirmation"
        @onEdit="handleShowFormUpdateActivity"
      />
      <APIResponseLayout
        v-else
        :loading="activities.loading"
        :error="activities.message"
        :data="activities.data"
        @refreshFunction="activities.doFetch"
      />
    </section>

    <!-- DIALOG -->
    <!-- Bulk Update -->
    <ModalStatus
      :is-modal-visible="isShowModalStatus"
      :activities="planActivityChecked"
      @onCancel="closeModalStatus"
      @onSubmit="updatePlanActivityChecked"
      @onBulkUpdate="handlePlanActivityChecked"
    />

    <!-- Bulk Delete -->
    <ModalBulkDelete
      :is-modal-visible="isShowModalBulkDelete"
      :activities="planActivityChecked"
      @onCancel="closeModalBulkDelete"
      @onSubmit="deletePlanActivityChecked"
      @onBulkUpdate="handlePlanActivityChecked"
    />

    <!-- Bulk Update -->
    <ModalBulkUpdatePlan
      :is-modal-visible="isShowModalBulkUpdatePlan"
      :data="dataBulkUpdate"
      @onCancel="closeModalBulkUpdatePlan"
      @onSubmit="bulkUpdatePlanActivity"
    />

    <!-- Delete Confirmation -->
    <ModalConfirmation
      v-if="userStore.getters.role === 'admin'"
      title="Confirmation"
      :is-modal-visible="isShowModalConfirmation"
      message="Are you sure want to delete this plan?"
      @onSubmit="handleConfirmModalConfirmation"
      @onCancel="handleCancelModalConfirmation"
    >
      <template #content>
        <section v-if="rowModalConfirmation">
          <div class="flex gap-x-4 font-semibold text-xs">
            <div>
              <p>Program</p>
              <p>Sub Program</p>
              <p>Site ID</p>
              <p>Site Name</p>
              <p>Activity</p>
            </div>
            <div>
              <p>:</p>
              <p>:</p>
              <p>:</p>
              <p>:</p>
              <p>:</p>
            </div>
            <div class="font-normal">
              <p>
                {{ rowModalConfirmation.namaProgram }}
              </p>
              <p>
                {{ rowModalConfirmation.namaSubprogram }}
              </p>
              <p>{{ rowModalConfirmation.siteID }}</p>
              <p>{{ rowModalConfirmation.siteName }}</p>
              <p>
                {{ rowModalConfirmation.deskripsiActivity }}
              </p>
            </div>
          </div>
        </section>
      </template>
    </ModalConfirmation>

    <!-- Form Activity -->
    <InputActivity
      v-if="userStore.getters.role === 'admin'"
      :is-show="isShowInputActivities"
      @closeInputActivities="closeInputActivities"
    />

    <!-- Form Activity -->
    <UpdateActivity
      v-if="userStore.getters.role === 'admin'"
      :is-show="isShowFormUpdateActivity"
      :row="formUpdateActivity"
      @closeFormUpdateActivity="closeFormUpdateActivity"
    />

    <!-- Import Activities -->
    <ImportExcel
      v-if="userStore.getters.role === 'admin'"
      :is-show="isShowImportActivities"
      title="Import Plan Activities"
      url="/api/activity-plan/upload"
      url-template="/Plan Activity Template.xlsx"
      @closeImportExcel="closeImportActivities"
    />
  </Card>
</template>

<script setup>
import {
	Button,
	OutlinedButton,
	APIResponseLayout,
	ActivityTable,
	ImportExcel,
	InputActivity,
	UpdateActivity,
	Card,
	Select,
	ModalStatus,
	ModalConfirmation,
	ModalBulkDelete,
	ModalBulkUpdatePlan,
} from "@/components";
import { ref, watch } from "vue";
import { useFetch } from "@/composables";
import { userStore } from "@/stores";
import { Notification, Loading } from "element-ui";
import axios from "axios";

// ==============================================================================================
// Menu Import Activities

const isShowImportActivities = ref(false);
const alertCard = ref(null);

const showImportActivities = () => {
	if (isShowInputActivities.value) {
		isShowInputActivities.value = false;
	}
	isShowImportActivities.value = true;
};

const closeImportActivities = (result) => {
	isShowImportActivities.value = false;
	console.log(result);
	if (result) {
		if (result.data.updateable.length > 0) {
			dataBulkUpdate.value = result.data.updateable;
			showModalBulkUpdatePlan();
		}

		if (result.isRefresh) {
			alertCard.value = {
				type:
					!result.message || result.message.length === 0
						? "success"
						: "warning",
				title: result.data.successMessage,
				description: result.message,
			};
			activitiesParams.value = {
				...activitiesParams.value,
				page: 1,
			};
		} else if (result.message) {
			alertCard.value = {
				type: "warning",
				title: result.data.successMessage,
				description: result.message,
			};
		}
	} else {
		alertCard.value = null;
	}
};

// ==============================================================================
// Menu Input Activities
const isShowInputActivities = ref(false);

const showInputActivities = () => {
	if (isShowImportActivities.value) {
		isShowImportActivities.value = false;
	}
	isShowInputActivities.value = true;
};

const closeInputActivities = (result) => {
	isShowInputActivities.value = false;
	if (result) {
		activities.value.data.unshift(result);
		Notification.success({
			title: "Success",
			message: "Activity has been added",
		});
	}
};

// =================== Activities Data ===================
// Activities
// ["status", "weekExecuted", "deskripsiActivity", "namaProgram", "namaSubprogram", "additionalInfo", "siteID", "siteName", "namaKabupaten", "namaDO", "namaNS", "namaPIC", "targetQuartal", "remark", "budget", "cost"]
const props = defineProps({
	siteId: {
		type: String,
		default: "",
	},
});

const activitiesParams = ref({
	status: [],
	weekExecuted: [],
	dateExecuted: [],
	deskripsiActivity: [],
	namaProgram: [],
	namaSubprogram: [],
	additionalInfo: [],
	siteID: props.siteId ? [props.siteId] : [],
	siteName: [],
	namaKabupaten: [],
	namaDO: [],
	namaNS: [],
	namaPIC: [],
	targetQuartal: [],
	remark: [],
	budget: [],
	cost: [],
	page: 1,
	limit: 10,
	sortBy: null,
	orderBy: null,
});

const pagination = ref(null);

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
	{
		value: 250,
		label: "250",
	},
	{
		value: 500,
		label: "500",
	},
];

const activities = ref(
	useFetch({
		url: "/api/activity-plan",
		params: activitiesParams,
	})
);

// handle filter change
const handleFilterChange = (filter) => {
	if (filter) {
		pagination.value.internalCurrentPage = 1;
		activitiesParams.value = {
			...activitiesParams.value,
			[Object.keys(filter)[0]]: Object.values(filter)[0],
			page: 1,
		};
	}
};

// handle sort change
const handleSortChange = (data) => {
	if (data) {
		activitiesParams.value = {
			...activitiesParams.value,
			sortBy: data.sortBy,
			orderBy: data.orderBy,
		};
	} else {
		activitiesParams.value = {
			...activitiesParams.value,
			sortBy: null,
			orderBy: null,
		};
	}
};

// handle limit change
const handleLimitChange = (val) => {
	// get current page
	const currentPage = Math.ceil(
		(activitiesParams.value.page * activitiesParams.value.limit) / val
	);
	if (currentPage > activities.value.totalPage) {
		activitiesParams.value = {
			...activitiesParams.value,
			limit: val,
			page: activities.value.totalPage,
		};
	} else {
		activitiesParams.value = {
			...activitiesParams.value,
			limit: val,
			page: currentPage,
		};
	}
};

// handle pagination
const handleCurrentChange = (val) => {
	activitiesParams.value.page = val;
};

// ============================== CHECKBOX ==============================
// handle button checkbox
const isShowButtonCheckbox = ref(false);
const toggleButtonCheckbox = () => {
	if (planActivityChecked.value.size > 0) {
		isShowButtonCheckbox.value = true;
	} else {
		isShowButtonCheckbox.value = false;
	}

	console.log(planActivityChecked.value);
};

const planActivityChecked = ref(new Map());
const handlePlanActivityChecked = (row) => {
	const key = row.activityID;
	if (planActivityChecked.value.has(key)) {
		const sites = planActivityChecked.value.get(key).sites;
		const isExist = sites.findIndex((site) => site === row.siteID);
		if (isExist !== -1) {
			// remove site
			if (sites.length === 1) {
				planActivityChecked.value.delete(key);
			} else {
				const newSites = sites.splice(isExist, 1);

				planActivityChecked.value.set(key, {
					...planActivityChecked.value.get(key),
					sites: newSites,
				});
			}
		} else {
			// add site
			planActivityChecked.value.set(key, {
				...planActivityChecked.value.get(key),
				sites: [...planActivityChecked.value.get(key).sites, row.siteID],
			});
		}
	} else {
		const data = {
			namaProgram: row.namaProgram,
			namaSubprogram: row.namaSubprogram,
			activityId: row.activityID,
			deskripsiActivity: row.deskripsiActivity,
			dateExecuted: ref(null),
			status: ref(null),
			sites: [row.siteID],
		};
		planActivityChecked.value.set(key, data);
	}

	toggleButtonCheckbox();
};

const activityTable = ref(null);

// select all checkbox
const selectAllPlanActivity = () => {
	activities.value.data.forEach((row) => {
		const key = row.activityID;
		// check if plan activity checked has key
		if (planActivityChecked.value.has(key)) {
			const sites = planActivityChecked.value.get(key).sites;
			const isExist = sites.findIndex((site) => site === row.siteID);
			// if not exist, then add site
			if (isExist === -1) {
				// add site
				planActivityChecked.value.set(key, {
					...planActivityChecked.value.get(key),
					sites: [...planActivityChecked.value.get(key).sites, row.siteID],
				});
			}
		} else {
			const data = {
				namaProgram: row.namaProgram,
				namaSubprogram: row.namaSubprogram,
				activityId: row.activityID,
				deskripsiActivity: row.deskripsiActivity,
				dateExecuted: ref(null),
				status: ref(null),
				sites: [row.siteID],
			};
			planActivityChecked.value.set(key, data);
		}
	});

	const allCheckbox =
		activityTable.value.$el.querySelectorAll(".checkbox_activity");

	// check all checkbox
	allCheckbox.forEach((checkbox) => {
		checkbox.checked = true;
	});

	toggleButtonCheckbox();
};

// reset all checkbox
const resetPlanActivityChecked = () => {
	activities.value.data.forEach((row) => {
		const key = row.activityID;
		// check if plan activity checked has key
		if (planActivityChecked.value.has(key)) {
			const sites = planActivityChecked.value.get(key).sites;
			const isExist = sites.findIndex((site) => site === row.siteID);
			// if exist, then remove site
			if (isExist !== 1) {
				if (sites.length === 1) {
					planActivityChecked.value.delete(key);
				} else {
					const newSites = sites.splice(isExist, 1);

					planActivityChecked.value.set(key, {
						...planActivityChecked.value.get(key),
						sites: newSites,
					});
				}
			}
		}
	});

	const allCheckbox =
		activityTable.value.$el.querySelectorAll(".checkbox_activity");

	// reset all checkbox
	allCheckbox.forEach((checkbox) => {
		checkbox.checked = false;
	});

	toggleButtonCheckbox();
};

// =================== BULK UPDATE STATUS ===================
const isShowModalStatus = ref(false);

const showModalStatus = () => {
	isShowModalStatus.value = true;
};

const closeModalStatus = () => {
	// delete plan activity where sites is empty
	planActivityChecked.value.forEach((value, key) => {
		const sites = value.sites;
		if (sites.length === 0) {
			planActivityChecked.value.delete(key);

			// remove checked
			const allCheckbox = activityTable.value.$el.querySelectorAll(
				`input[type="checkbox"][name="checkbox-${key}"]`
			);
			allCheckbox.forEach((checkbox) => {
				checkbox.checked = false;
			});
		} else {
			// adjust checked with new respose
			const allCheckbox = activityTable.value.$el.querySelectorAll(
				`input[type="checkbox"][name="checkbox-${key}"]`
			);

			allCheckbox.forEach((checkbox) => {
				if (sites.includes(checkbox.value)) {
					checkbox.checked = true;
				} else {
					checkbox.checked = false;
				}
			});
		}
	});

	isShowModalStatus.value = false;

	// decide toggle bulk update
	toggleButtonCheckbox();
};

// bulk update plan activity
const updatePlanActivityChecked = (result) => {
	Loading.service({
		lock: true,
		text: "Loading...",
		spinner: "el-icon-loading",
		background: "rgba(0, 0, 0, 0.7)",
	});

	// console.log(activityStatusParams);
	const { data, status, message } = useFetch({
		url: "/api/activity-plan/bulk-update-status",
		method: "PUT",
		body: {
			data: result,
		},
	});

	const unwatch = watch(
		[data, status, message],
		([newData, newStatus, newMessage]) => {
			if (newStatus === "success" && newData) {
				// Update all checked data with response
				activities.value.data.forEach((row) => {
					const filterData = newData.find(
						(item) => item.activityId === row.activityID
					);
					if (
						filterData &&
						filterData.sitesUpdated.includes(row.siteID)
					) {
						row.status = filterData.status;
						row.weekExecuted = filterData.weekExecuted
							? parseInt(filterData.weekExecuted)
							: "";
						row.dateExecuted = filterData.dateExecuted ? filterData.dateExecuted : "";
						row.updatedBy = filterData.updatedBy;
					}
				});

				resetPlanActivityChecked();

				Loading.service().close();
				closeModalStatus();
				Notification.success({
					title: "Success",
					message: "Plan activity successfully updated",
				});

				unwatch();
			} else if (newStatus === "error" && newMessage) {
				Loading.service().close();
				Notification.error({
					title: "Error",
					message: newMessage,
				});

				unwatch();
			}
		}
	);
};

// ========================= BULK UPDATE PLAN ACTIVITY =========================
const dataBulkUpdate = ref([]);
const isShowModalBulkUpdatePlan = ref(false);

const showModalBulkUpdatePlan = () => {
	isShowModalBulkUpdatePlan.value = true;
};

const closeModalBulkUpdatePlan = () => {
	// reset data bulk update
	dataBulkUpdate.value = [];
	isShowModalBulkUpdatePlan.value = false;
};

// bulk update plan activity
const bulkUpdatePlanActivity = (result) => {
	Loading.service({
		lock: true,
		text: "Loading...",
		spinner: "el-icon-loading",
		background: "rgba(0, 0, 0, 0.7)",
	});

	// console.log(activityStatusParams);
	const { data, status, message } = useFetch({
		url: "/api/activity-plan/bulk-update",
		method: "PUT",
		body: {
			data: result,
		},
	});

	const unwatch = watch([data, status, message], ([newData, newStatus, newMessage]) => {
		if (newStatus === "success" && newData) {
			dataBulkUpdate.value = [];
			Loading.service().close();
			closeModalBulkUpdatePlan();
			Notification.success({
				title: "Success",
				message: newData,
			});

			unwatch();
		} else if (newStatus === "error" && newMessage) {
			Loading.service().close();
			Notification.error({
				title: "Error",
				message: newMessage,
			});

			unwatch();
		}
	});
};

// ========================= UPDATE PLAN ACTIVITY =========================
// Form Update Activity
const isShowFormUpdateActivity = ref(false);
const formUpdateActivity = ref({});
const indexFormUpdateActivity = ref(null);

const handleShowFormUpdateActivity = (result) => {
	isShowFormUpdateActivity.value = true;
	formUpdateActivity.value = result.row;
	indexFormUpdateActivity.value = result.index;
};

const closeFormUpdateActivity = (result) => {
	isShowFormUpdateActivity.value = false;
	if (result) {
		Notification.success({
			title: "Success",
			message: "Plan activity successfully updated",
		});

		activities.value.data[indexFormUpdateActivity.value].additionalInfo =
			result.additionalInfo;
		activities.value.data[indexFormUpdateActivity.value].remark = result.remark;
		activities.value.data[indexFormUpdateActivity.value].targetQuartal =
			result.targetQuartal;
		activities.value.data[indexFormUpdateActivity.value].namaPIC = result.pic;

		if (userStore.getters.role === "admin") {
			activities.value.data[indexFormUpdateActivity.value].budget =
				result.budget;
			activities.value.data[indexFormUpdateActivity.value].cost = result.cost;
		}
	}
};

// =================== BULK DELETE ===================
const isShowModalBulkDelete = ref(false);

const showModalBulkDelete = () => {
	isShowModalBulkDelete.value = true;
};

const closeModalBulkDelete = () => {
	// delete plan activity where sites is empty
	planActivityChecked.value.forEach((value, key) => {
		const sites = value.sites;
		if (sites.length === 0) {
			planActivityChecked.value.delete(key);

			// remove checked
			const allCheckbox = activityTable.value.$el.querySelectorAll(
				`input[type="checkbox"][name="checkbox-${key}"]`
			);
			allCheckbox.forEach((checkbox) => {
				checkbox.checked = false;
			});
		} else {
			// adjust checked with new respose
			const allCheckbox = activityTable.value.$el.querySelectorAll(
				`input[type="checkbox"][name="checkbox-${key}"]`
			);

			allCheckbox.forEach((checkbox) => {
				if (sites.includes(checkbox.value)) {
					checkbox.checked = true;
				} else {
					checkbox.checked = false;
				}
			});
		}
	});

	isShowModalBulkDelete.value = false;

	// decide toggle bulk update
	toggleButtonCheckbox();
};

// bulk update plan activity
const deletePlanActivityChecked = (result) => {
	Loading.service({
		lock: true,
		text: "Loading...",
		spinner: "el-icon-loading",
		background: "rgba(0, 0, 0, 0.7)",
	});

	// console.log(activityStatusParams);
	const { status, message } = useFetch({
		url: "/api/activity-plan",
		method: "DELETE",
		body: {
			data: result,
		},
	});

	const unwatch = watch([status, message], ([newStatus, newMessage]) => {
		if (newStatus === "success") {
			// if page is last page and only one page
			if (
				activitiesParams.value.page === activities.value.totalPage &&
				activitiesParams.value.page === 1
			) {
				activities.value.data = [];
			} else {
				if (activitiesParams.value.page === activities.value.totalPage) {
					handleCurrentChange(activitiesParams.value.page - 1);
				} else {
					activities.value.doFetch();
				}
			}

			planActivityChecked.value = new Map();

			const allCheckbox =
				activityTable.value.$el.querySelectorAll(".checkbox_activity");

			// reset all checkbox
			allCheckbox.forEach((checkbox) => {
				checkbox.checked = false;
			});

			toggleButtonCheckbox();

			Loading.service().close();
			closeModalBulkDelete();
			Notification.success({
				title: "Success",
				message: "Plan activity successfully deleted",
			});

			unwatch();
		} else if (newStatus === "error" && newMessage) {
			Loading.service().close();
			Notification.error({
				title: "Error",
				message: newMessage,
			});

			unwatch();
		}
	});
};

// ========================= DELETE PLAN ACTIVITY =========================
const isShowModalConfirmation = ref(false);
const rowModalConfirmation = ref(null);
const indexModalConfirmation = ref(null);

const handleShowModalConfirmation = (result) => {
	console.log(result);
	isShowModalConfirmation.value = true;
	rowModalConfirmation.value = result.row;
	indexModalConfirmation.value = result.index;
};

const handleCancelModalConfirmation = () => {
	isShowModalConfirmation.value = false;
};

const handleConfirmModalConfirmation = () => {
	const url =
		"/api/activity-plan/" +
		rowModalConfirmation.value.activityID +
		"/" +
		rowModalConfirmation.value.siteID;

	const { status, message } = useFetch({
		url: url,
		method: "DELETE",
	});

	const unwatch = watch([status, message], ([newStatus, newMessage]) => {
		if (newStatus === "success") {
			activities.value.data.splice(indexModalConfirmation.value, 1);
			const message = `Plan ${rowModalConfirmation.value.deskripsiActivity} with site ${rowModalConfirmation.value.siteID} successfully deleted`;

			// reset modal
			rowModalConfirmation.value = null;
			indexModalConfirmation.value = null;
			isShowModalConfirmation.value = false;

			Notification.success({
				title: "Success",
				message: message,
			});

			unwatch();
		} else if (newStatus === "error" && newMessage) {
			isShowModalConfirmation.value = false;

			Notification.error({
				title: "Error",
				message: newError,
			});

			unwatch();
		}
	});
};

// ========================= EXPORT EXCEL =========================
const handleExportPlanActivities = async () => {
	try {
		Loading.service({
			lock: true,
			text: "Loading...",
			spinner: "el-icon-loading",
			background: "rgba(0, 0, 0, 0.7)",
		});
		const url = "/api/activity-plan/download";
		const response = await axios.get(url, {
			responseType: "blob",
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

		const filename = `plan-activity-${month}-${date}-${year}`;
		link.download = filename;
		link.click();

		Loading.service().close();
		Notification.success({
			title: "Success",
			message: "Plan activity successfully exported",
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
