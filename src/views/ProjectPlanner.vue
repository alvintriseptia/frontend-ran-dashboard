<template>
	<section>
		<Card title="Monthly Progress Activity" class="min-h-[400px]">
			<APIResponseLayout
				v-if="
					progressActivity.data.value === null ||
					progressActivity.data.value === []
				"
				:loading="progressActivity.loading"
				:error="progressActivity.message"
				:data="progressActivity.data"
			/>
			<BarChart v-else :chart-options="chartOptions" :chart-data="chartData" />
		</Card>

		<Card title="Project Planner" class="mt-8">
			<section
				class="flex flex-col gap-y-4 md:flex-row md:gap-x-4 mb-4 items-center"
			>
				<div class="w-32">
					<Select
						placeholder="Select Week"
						:options="totalWeeks"
						:default-value="'Week ' + currentWeek.toString()"
						@onChange="updateWeekHighlighted"
					/>
				</div>
				<div
					v-for="item in dataLabel"
					:key="item.label"
					class="flex items-center gap-x-2"
				>
					<div class="w-4 h-4" :class="item.color" />
					<span class="text-gray-900">{{ item.label }}</span>
				</div>
			</section>
			<section class="min-h-[400px]">
				<APIResponseLayout
					v-if="rows.length === 0"
					:error="projectPlanner.message"
					:loading="projectPlanner.loading.value"
					@refreshFunction="projectPlanner.doFetch"
				/>
				<transition v-else name="el-fade-in">
					<ProjectTable
						:week-highlighted="weekHighlighted"
						:data="rows"
						:loading="projectPlanner.loading.value"
						:week-in-months="weekInMonths"
					/>
				</transition>
			</section>
		</Card>
	</section>
</template>

<script setup>
import {
	ProjectTable,
	Select,
	Card,
	BarChart,
	APIResponseLayout,
} from "@/components";
import { dateUtil } from "@/utils";
import { onMounted, ref, watch } from "vue";
import { useFetch } from "@/composables";
import colorsTheme from "../utils/colorsTheme";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { Chart as ChartJS, LogarithmicScale } from "chart.js";
ChartJS.register(ChartDataLabels, LogarithmicScale);
// create monthly progres activity chart options
const chartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	aspectRatio: 3 / 2,
	layout: {
		padding: 16,
	},
	scale: {
		x: {
			stacked: true,
		},
		y: {
			type: "logarithmic",
			stacked: true,
			ticks: {
				beginAtZero: true,
			},
		},
	},
	plugins: {
		datalabels: {
			color: "black",
			font: {
				size: 10,
				weight: "bold",
			},
			labels: {
				index: {
					formatter: function (value, ctx) {
						return value === 0 ? "" : value;
					},
				},
			},
		},
	},
};

// create chart data by program
const monthNames = dateUtil.monthNames.map((item) => item.substring(0, 3));
const progressActivityUrl = ref(null);
const progressActivity = useFetch({
	url: progressActivityUrl,
});
const chartData = ref({
	labels: monthNames,
	datasets: [],
});

// get project planner from api
const projectPlannerUrl = ref(null);
const projectPlanner = useFetch({
	url: projectPlannerUrl,
});

const rows = ref([]);
const weekInMonths = ref([]);
const totalWeeks = ref([]);

// watch
onMounted(async () => {
	progressActivityUrl.value = "/api/activity-plan/program-progress-by-month";
	projectPlannerUrl.value = "/api/activity-plan/project-planner";
	progressActivity.doFetch();
	setTimeout(() => {
		projectPlanner.doFetch();
	}, 1000);

	watch(projectPlanner.data, (newData) => {
		if (newData.weeksPerMonth && newData.rows) {
			rows.value = newData.rows;
			weekInMonths.value = newData.weeksPerMonth.map((item) => parseInt(item));
			if (newData.weeksPerMonth && newData.weeksPerMonth.length > 0) {
				let total = 0;
				for (let i = 0; i < newData.weeksPerMonth.length; i++) {
					total += parseInt(newData.weeksPerMonth[i]);
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

	watch(progressActivity.data, (newData) => {
		if (newData && newData !== []) {
			chartData.value = {
				labels: monthNames,
				datasets: newData.map((item, index) => {
					const color = colorsTheme.getPastelColor(index);
					if (item.namaProgram === "Total") {
						return {
							label: item.namaProgram,
							data: item.data,
							backgroundColor: "#000",
							type: "line",
							datalabels: {
								color: "#FFFFFF",
								anchor: "end",
								align: "end",
								offset: 0,
								borderRadius: 4,
								backgroundColor: "#000000",
								font: {
									size: 12,
									weight: "bold",
								},
							},
						};
					} else {
						return {
							label: item.namaProgram,
							data: item.data,
							backgroundColor: color,
							borderColor: color,
							borderWidth: 1,
						};
					}
				}),
			};
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
