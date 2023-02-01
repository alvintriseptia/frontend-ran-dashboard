<template>
	<Card title="Activites">
		<div>
			<section class="flex gap-x-4 mb-6 justify-between items-center">
				<RemoteSearchSelect
					:options="unref(searchActivitiesName.data)"
					placeholder="Cari activities"
					@onChange="handleSearchActivitiesName"
					@onUpdate="handleUpdateActivitiesName"
				/>
				<div class="flex gap-x-4">
					<el-date-picker
						v-model="dateRange"
						type="monthrange"
						start-placeholder="Start month"
						end-placeholder="End month"
						@change="handleDateRangeChange"
					>
					</el-date-picker>
					<!-- <OutlinedButton>Input Activity</OutlinedButton> -->
					<OutlinedButton @onClick="showImportActivities"
						>Import Activities</OutlinedButton
					>
				</div>
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
			<ActivityTable
				v-if="activities.data"
				:data="activities.data"
				:numberStart="
					activitiesParams.page * activitiesParams.limit -
					activitiesParams.limit +
					1
				"
			/>
			<ImportActivity
				:isShow="isShowImportActivities"
				@closeImportActivities="closeImportActivities"
			/>
		</div>
	</Card>
</template>

<script setup>
import {
	OutlinedButton,
	RemoteSearchSelect,
	ActivityTable,
	ImportActivity,
	Card,
	Select,
} from "@/components";
import { ref, unref } from "vue";
import { useFetch } from "@/composables";

// Menu Import Activities
const isShowImportActivities = ref(false);

const showImportActivities = () => {
	isShowImportActivities.value = true;
};

const closeImportActivities = () => {
	isShowImportActivities.value = false;
};

// =================== Activities ===================

// Activities
const activitiesParams = ref({
	activityName: [],
	startDate: "",
	endDate: "",
	page: 1,
	limit: 10,
});
const dateRange = ref([]);
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
		url: "/api/activity-plan/all-activity",
		params: activitiesParams,
	})
);

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

// handle date range
const handleDateRangeChange = (dateRange) => {
	if (dateRange) {
		// add 1 day to start date and end date
		// because by default date range will return 1 day before to fit BE requirement
		const startDate = new Date(dateRange[0]);
		startDate.setDate(startDate.getDate() + 1);
		activitiesParams.value.startDate = startDate;

		const endDate = new Date(dateRange[1]);
		endDate.setDate(endDate.getDate() + 1);
		activitiesParams.value.endDate = endDate;
	} else {
		activitiesParams.value.startDate = "";
		activitiesParams.value.endDate = "";
	}
};

// handle activities name update
const handleUpdateActivitiesName = (val) => {
	activitiesParams.value.activityName = val;
};

// =================== Search Activities ===================

// Search activities name
const searchActivitiesParams = ref({
	activityName: "",
});

const searchActivitiesName = ref(
	useFetch({
		url: "/api/activity/search",
		params: searchActivitiesParams,
	})
);

// handle search
const handleSearchActivitiesName = (val) => {
	if (val.length >= 1 && val.length <= 2) return;

	if (val && val.length >= 3) {
		searchActivitiesParams.value.activityName = val;
	} else {
		searchActivitiesParams.value.activityName = "";
	}
};
</script>
