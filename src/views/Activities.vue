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

		<section class="my-4 flex items-center">
			<el-pagination
				:page-size="activitiesParams.limit"
				:pager-count="5"
				layout="prev, pager, next"
				:total="activities.totalData"
				@current-change="handleCurrentChange"
				ref="pagination"
			>
			</el-pagination>
			<div class="flex items-center">
				<div class="max-w-[80px]">
					<Select
						:options="limits"
						@onChange="handleLimitChange"
						placeholder="Rows per page"
						defaultValue="10"
					/>
				</div>
				<p class="text-xs ml-2">Rows per page</p>
			</div>
		</section>
		<section class="min-h-[400px]">
			<ActivityTable
				v-if="activities.data"
				:data="activities.data"
				:loading="activities.loading"
				:filterData="activities.filterData"
				:numberStart="
					activitiesParams.page * activitiesParams.limit -
					activitiesParams.limit +
					1
				"
				@onFilter="handleFilterChange"
				@onSort="handleSortChange"
			/>
			<APIResponseLayout
				v-else
				:loading="activities.loading"
				:error="activities.error"
				:data="activities.data"
				@refreshFunction="activities.doFetch"
			/>
		</section>
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
} from "@/components";
import { ref } from "vue";
import { useFetch } from "@/composables";
import { userStore } from "@/stores";
import { Notification } from "element-ui";

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
	if (result) {
		activities.value.data = [result, ...activities.value.data];
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
	page: 900,
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
</script>
