<template>
	<Card title="Activites" :alert="alertCard">
		<template #header>
			<OutlinedButton
				v-if="userStore.getters.role === 'admin'"
				@onClick="showInputActivities"
				class="mr-4"
				>Input Activities</OutlinedButton
			>
			<OutlinedButton
				v-if="userStore.getters.role === 'admin'"
				@onClick="showImportActivities"
				>Import Activities</OutlinedButton
			>
		</template>

		<section class="my-4 flex justify-between items-center">
			<transition name="el-fade-in">
				<div class="flex items-center -mb-4 gap-x-2">
					<div class="flex items-start justify-start gap-x-1">
						<el-button
							@click="selectAllPlanActivity"
							icon="el-icon-success"
							size="mini"
							type="success"
						>
							Select All
						</el-button>

						<el-button
							@click="resetPlanActivityChecked"
							icon="el-icon-remove"
							size="mini"
							type="danger"
						>
							Reset
						</el-button>
					</div>
					<el-button
						@click="showModalStatus"
						icon="el-icon-magic-stick"
						size="mini"
						v-show="isShowBulkUpdate"
					>
						Update Status
					</el-button>
				</div>
			</transition>
			<div class="flex items-center ml-auto">
				<p class="text-xs mr-2">Rows per page</p>
				<div class="max-w-[80px]">
					<Select
						:options="limits"
						@onChange="handleLimitChange"
						placeholder="Rows per page"
						defaultValue="10"
					/>
				</div>
				<el-pagination
					:page-size="activitiesParams.limit"
					:pager-count="5"
					layout="prev, pager, next"
					:total="activities.totalData"
					@current-change="handleCurrentChange"
					ref="pagination"
				>
				</el-pagination>
			</div>
		</section>

		<section class="min-h-[400px]">
			<ActivityTable
				ref="activityTable"
				v-if="activities.data"
				:data="activities.data"
				:loading="activities.loading"
				:filterData="activities.filterData"
				:numberStart="
					activitiesParams.page * activitiesParams.limit -
					activitiesParams.limit +
					1
				"
				:planActivityChecked="planActivityChecked"
				@onFilter="handleFilterChange"
				@onSort="handleSortChange"
				@onBulkUpdate="handlePlanActivityChecked"
			/>
			<APIResponseLayout
				v-else
				:loading="activities.loading"
				:error="activities.error"
				:data="activities.data"
				@refreshFunction="activities.doFetch"
			/>
		</section>
		<ModalStatus
			:isModalVisible="isShowModalStatus"
			@onCancel="closeModalStatus"
			@onSubmit="updatePlanActivityChecked"
			:activities="planActivityChecked"
			@onBulkUpdate="handlePlanActivityChecked"
		/>
		<InputActivity
			v-if="userStore.getters.role === 'admin'"
			:isShow="isShowInputActivities"
			@closeInputActivities="closeInputActivities"
		/>
		<ImportExcel
			v-if="userStore.getters.role === 'admin'"
			:isShow="isShowImportActivities"
			title="Import Activities"
			url="/api/activity-plan/upload"
			@closeImportExcel="closeImportActivities"
			urlTemplate="/Activity Template.xlsx"
		/>
	</Card>
</template>

<script setup>
import {
	OutlinedButton,
	APIResponseLayout,
	ActivityTable,
	ImportExcel,
	InputActivity,
	Card,
	Select,
	ModalStatus,
} from "@/components";
import { ref, watch } from "vue";
import { useFetch } from "@/composables";
import { userStore } from "@/stores";
import { Notification, Loading } from "element-ui";

// Menu Import Activities
const isShowImportActivities = ref(false);
const alertCard = ref(null);

const showImportActivities = () => {
	if (isShowInputActivities) {
		isShowInputActivities.value = false;
	}
	isShowImportActivities.value = true;
};

const closeImportActivities = (result) => {
	isShowImportActivities.value = false;
	if (result) {
		// console.log(result);
		if (result.isRefresh) {
			alertCard.value = {
				type: !result.message ? "success" : "warning",
				title: result.data,
				description: result.message,
			};
			activitiesParams.value = {
				...activitiesParams.value,
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

// Menu Input Activities
const isShowInputActivities = ref(false);

const showInputActivities = () => {
	if (isShowImportActivities) {
		isShowImportActivities.value = false;
	}
	isShowInputActivities.value = true;
};

const closeInputActivities = (result) => {
	isShowInputActivities.value = false;
	console.log(result);
	if (result) {
		activities.value.data.unshift(result);
		Notification.success({
			title: "Success",
			message: "Activity has been added",
		});
	}
};

// =================== Activities ===================

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
		url: "/api/activity",
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

// handle bulk update
const isShowBulkUpdate = ref(false);
const toggleBulkUpdate = () => {
	if (planActivityChecked.value.size > 0) {
		isShowBulkUpdate.value = true;
	} else {
		isShowBulkUpdate.value = false;
	}

	console.log(planActivityChecked.value);
};

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
	toggleBulkUpdate();
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

	toggleBulkUpdate();
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

	toggleBulkUpdate();
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

	toggleBulkUpdate();
};

// update plan activity
const updatePlanActivityChecked = (result) => {
	Loading.service({
		lock: true,
		text: "Loading...",
		spinner: "el-icon-loading",
		background: "rgba(0, 0, 0, 0.7)",
	});

	// console.log(activityStatusParams);
	const { data, status, error } = useFetch({
		url: "/api/activity-plan/bulk-update-status",
		method: "PUT",
		body: {
			data: result,
		},
	});

	watch([data, status, error], ([newData, newStatus, newError]) => {
		if (newStatus === "success" && newData) {
			// Update all checked data with response
			activities.value.data.forEach((row) => {
				const filterData = newData.filter(
					(item) => item.activityId === row.activityID
				);
				if (
					filterData.length > 0 &&
					filterData[0].sitesUpdated.includes(row.siteID)
				) {
					const result = filterData[0];
					row.status = result.status;
					row.weekExecuted = result.weekExecuted
						? parseInt(result.weekExecuted)
						: "";
					row.dateExecuted = result.dateExecuted ? result.dateExecuted : "";
					row.updatedBy = result.updatedBy;
				}
			});

			resetPlanActivityChecked();

			Loading.service().close();
			closeModalStatus();
			Notification.success({
				title: "Success",
				message: "Plan activity successfully updated",
			});
		} else if (newStatus === "error" && newError) {
			Loading.service().close();
			Notification.error({
				title: "Error",
				message: newError,
			});
		}
	});
};
</script>
