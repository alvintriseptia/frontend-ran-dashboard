<script setup>
import {
	OutlinedButton,
	SearchSelect,
	ActivityTable,
	ImportActivity,
	Card,
} from "@/components";
import activitiesJson from "@/test/activities.json";
import { ref } from "vue";

let activities = new Set(activitiesJson.data.map((item) => item.activity));

activities = Array.from(activities).map((item) => {
	return { value: item, label: item };
});

const isShowImportActivities = ref(false);

const showImportActivities = () => {
	isShowImportActivities.value = true;
};

const closeImportActivities = () => {
	isShowImportActivities.value = false;
};

const dateRange = ref([]);
</script>

<template>
	<Card title="Activites">
		<div>
			<section class="flex gap-x-4 mb-6 justify-between">
				<SearchSelect :options="activities" placeholder="Cari activities" />
				<div class="flex gap-x-4">
					<el-date-picker
						v-model="dateRange"
						type="monthrange"
						start-placeholder="Start month"
						end-placeholder="End month"
					>
					</el-date-picker>
					<!-- <OutlinedButton>Input Activity</OutlinedButton> -->
					<OutlinedButton @onClick="showImportActivities"
						>Import Activities</OutlinedButton
					>
				</div>
			</section>
			<ActivityTable />
			<section class="mt-4">
				<el-pagination
					:page-size="10"
					:pager-count="11"
					layout="prev, pager, next"
					:total="50"
				>
				</el-pagination>
			</section>
			<ImportActivity
				:isShow="isShowImportActivities"
				@closeImportActivities="closeImportActivities"
			/>
		</div>
	</Card>
</template>
