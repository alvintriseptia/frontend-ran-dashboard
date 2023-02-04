<template>
	<Card title="Activites" :alert="alertCard">
		<div>
			<section class="flex gap-x-4 mb-6 items-center">
				<OutlinedButton
					v-if="userStore.getters.role === 'admin'"
					@onClick="showInputActivities"
					>Input Activities</OutlinedButton
				>
				<OutlinedButton
					v-if="userStore.getters.role === 'admin'"
					@onClick="showImportActivities"
					>Import Activities</OutlinedButton
				>
			</section>
			<section class="my-4 flex items-center">
				<el-pagination
					:page-size="activitiesParams.limit"
					:pager-count="5"
					layout="prev, pager, next"
					:total="activities.totalData"
					@current-change="handleCurrentChange"
				>
				</el-pagination>
				<div class="flex items-center">
					<div class="max-w-[80px]">
						<Select
							:options="limits"
							@onChange="handleLimitChange"
							placeholder="Rows per page"
						/>
					</div>
					<p class="text-xs ml-2">Rows per page</p>
				</div>
			</section>
			<section class="min-h-[400px]">
				<ActivityTable
					v-if="activities.data"
					:data="activities.data"
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
			/>
		</div>
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
	if (result !== null) {
		// console.log(result);
		if (result.isRefresh) {
			const title = result.data[1]
				? "Import Activities Success"
				: "Some activities success imported, but the other is not imported";
			alertCard.value = {
				type: result.data[1] ? "success" : "warning",
				title: title,
				description: result.data[1],
			};
			activitiesParams.value = {
				...activitiesParams.value,
				page: 1,
			};
		} else if (result.data[1]) {
			alertCard.value = {
				type: "warning",
				title:
					"Some activities success imported, but the other is not imported",
				description: result.data[1],
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
	// if (result !== null) {
	// 	console.log(result);
	// 	if (result.isRefresh) {
	// 		const title = result.data[1]
	// 			? "Input Activities Success"
	// 			: "Some activities success inputted, but the other is not inputted";
	// 		alertCard.value = {
	// 			type: result.data[1] ? "success" : "warning",
	// 			title: title,
	// 			description: result.data[1],
	// 		};
	// 		activitiesParams.value = {
	// 			...activitiesParams.value,
	// 			page: 1,
	// 		};
	// 	} else if (result.data[1]) {
	// 		alertCard.value = {
	// 			type: "warning",
	// 			title:
	// 				"Some activities success inputted, but the other is not inputted",
	// 			description: result.data[1],
	// 		};
	// 	}
	// } else {
	// 	alertCard.value = null;
	// }
};

// =================== Activities ===================

// Activities
// ["status", "weekExecuted", "deskripsiActivity", "namaProgram", "namaSubprogram", "additionalInfo", "siteID", "siteName", "namaKabupaten", "namaDO", "namaNS", "namaPIC", "targetQuartal", "remark", "budget", "cost"]
const activitiesParams = ref({
	status: [],
	weekExecuted: [],
	deskripsiActivity: [],
	namaProgram: [],
	namaSubprogram: [],
	additionalInfo: [],
	siteID: [],
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
		activitiesParams.value[Object.keys(filter)[0]] = Object.values(filter)[0];
	}
};

// handle sort change
const handleSortChange = (sort) => {
	if (sort.order) {
		activitiesParams.value = {
			...activitiesParams.value,
			sortBy: sort.order === "ascending" ? "ASC" : "DESC",
			orderBy: sort.prop,
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
