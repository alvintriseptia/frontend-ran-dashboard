<template>
	<section>
		<Card title="Monthly Progress Activity">
			<BarChart :chartOptions="chartOptions" :chartData="chartData" />
		</Card>

		<Card title="Project Planner" class="mt-8">
			<section class="flex gap-x-4 mb-4 items-center">
				<div class="w-32">
					<Select
						placeholder="Select Week"
						:options="totalWeeks"
						@onChange="updateWeekHighlighted"
						:defaultValue="'Week ' + currentWeek.toString()"
					/>
				</div>
				<div
					class="flex items-center gap-x-2"
					v-for="item in dataLabel"
					:key="item.label"
				>
					<div class="w-4 h-4" :class="item.color"></div>
					<span class="text-gray-900">{{ item.label }}</span>
				</div>
			</section>
			<section>
				<div class="h-80" v-if="error">
					<el-result icon="error" title="Terjadi Kesalahan" :subTitle="error">
						<template slot="extra">
							<el-button type="primary" size="medium" @click="doFetch">
								Refresh
							</el-button>
						</template>
					</el-result>
				</div>

				<ProjectTable
					v-else
					:weekHighlighted="weekHighlighted"
					:data="rows"
					:loading="loading"
					:weekInMonths="weekInMonths"
				/>
			</section>
		</Card>
	</section>
</template>

<script setup>
import { ProjectTable, Select, Card, BarChart } from "@/components";
import { dateUtil } from "@/utils";
import { onMounted, ref, watch } from "vue";
import { useFetch } from "@/composables";

// create monthly progres activity chart options
const chartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	aspectRatio: 3 / 2,
	layout: {
		padding: 16,
	},
	scales: {
		x: {
			stacked: true,
		},
		y: {
			stacked: true,
		},
	},
};

// create chart data by program
const monthNames = dateUtil.monthNames.map((item) => item.substring(0, 3));
const chartData = {
	labels: monthNames,
	datasets: [
		{
			label: "Program 1",
			data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
			backgroundColor: "rgba(128, 92, 247, 0.5)",
			borderColor: "rgba(128, 92, 247, 1)",
			borderWidth: 1,
		},
		{
			label: "Program 2",
			data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
			backgroundColor: "rgba(255, 99, 132, 0.5)",
			borderColor: "rgba(255, 99, 132, 1)",
			borderWidth: 1,
		},
		{
			label: "Program 3",
			data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
			backgroundColor: "rgba(54, 162, 235, 0.5)",
			borderColor: "rgba(54, 162, 235, 1)",
			borderWidth: 1,
		},
		{
			label: "Program 4",
			data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
			backgroundColor: "rgba(255, 206, 86, 0.5)",
			borderColor: "rgba(255, 206, 86, 1)",
			borderWidth: 1,
		},
		{
			label: "Program 5",
			data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
			backgroundColor: "rgba(75, 192, 192, 0.5)",
			borderColor: "rgba(75, 192, 192, 1)",
			borderWidth: 1,
		},
		{
			label: "Total",
			data: [
				10 * 5,
				20 * 5,
				30 * 5,
				40 * 5,
				50 * 5,
				60 * 5,
				70 * 5,
				80 * 5,
				90 * 5,
				100 * 5,
				110 * 5,
				120 * 5,
			],
			backgroundColor: "rgba(0,0,0, 0.5)",
			borderColor: "rgba(0,0,0, 0.7)",
			type: "line",
			order: 0,
		},
	],
};

// get project planner from api
const { data, loading, error, doFetch } = useFetch({
	url: "/api/activity-plan/project-planner",
});

const rows = ref([]);
const weekInMonths = ref([]);
const totalWeeks = ref([]);

// watch
onMounted(() => {
	watch(data, (newData) => {
		if (newData) {
			rows.value = newData.rows;
			weekInMonths.value = newData.weeksInMonths;
			if (newData.weeksInMonths && newData.weeksInMonths.length > 0) {
				let total = 0;
				for (let i = 0; i < newData.weeksInMonths.length; i++) {
					total += newData.weeksInMonths[i];
				}
				totalWeeks.value = Array.from({ length: total }, (_, i) => {
					return {
						label: `Week ${i + 1}`,
						value: i + 1,
					};
				});
			}
		}
	});
});

// current week in a year
const currentWeek = dateUtil.getWeekInYear();
const weekHighlighted = ref(currentWeek);

// update week highlighted, when user select week
const updateWeekHighlighted = (value) => {
	weekHighlighted.value = parseInt(value);
};

const dataLabel = [
	{
		label: "Week Highlight",
		color: "bg-yellow-300",
	},
	{
		label: "Plan Duration",
		color: "bg-purple-100",
	},
	{
		label: "Actual Start",
		color: "bg-purple-300",
	},
	{
		label: "Actual Complete",
		color: "bg-purple-600",
	},
	{
		label: "Beyond Plan Start",
		color: "bg-orange-300",
	},
	{
		label: "Beyond Plan Complete",
		color: "bg-orange-600",
	},
];
</script>
