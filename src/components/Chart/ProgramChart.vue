<template>
	<div
		class="shadow-lg px-4 py-2 border border-gray-200 rounded-lg w-[250px] bg-white"
	>
		<h2 class="text-lg font-semibold mb-2">{{ props.programName }}</h2>
		<Doughnut
			:chart-options="chartOptions"
			:chart-data="chartData"
			:chart-id="chartId"
			:width="100"
			:height="100"
			:plugins="chartPlugins"
		/>
	</div>
</template>

<script setup>
import { Doughnut } from "vue-chartjs/legacy";
import { colorsTheme, centerDoughnutPlugin } from "@/utils";

const props = defineProps({
	chartId: {
		type: String,
		default: "doughnut-chart",
	},
	doneActivity: {
		type: Number,
		default: 0,
	},
	notYetActivity: {
		type: Number,
		default: 0,
	},
	programName: {
		type: String,
		default: "",
	},
});

const chartData = {
	labels: ["Done", "Not Yet"],
	datasets: [
		{
			backgroundColor: [colorsTheme.green, colorsTheme.orange],
			data: [props.doneActivity, props.notYetActivity],
			cutout: "75%",
			borderWidth: 1,
			datalabels: {
				labels: {
					index: {
						align: "end",
						anchor: "end",
						color: function (ctx) {
							return ctx.dataset.backgroundColor;
						},
						font: { size: 12 },
						offset: 0,
						formatter: function (value, ctx) {
							return ctx.chart.data.labels[ctx.dataIndex] + ": " + value;
						},
					},
				},
			},
		},
	],
};

const chartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			display: false,
		},
	},
	aspectRatio: 3 / 2,
	layout: {
		padding: 16,
	},
	elements: {
		line: {
			fill: false,
			tension: 0.4,
		},
		point: {
			hoverRadius: 7,
			radius: 5,
		},
	},
};

const chartPlugins = [centerDoughnutPlugin];
</script>
