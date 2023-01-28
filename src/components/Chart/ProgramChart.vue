<template>
	<div
		class="shadow-lg px-4 py-2 border border-gray-200 rounded-lg w-[250px] bg-white"
	>
		<h2 class="text-lg font-semibold mb-2">{{ props.programName }}</h2>
		<Doughnut
			:chart-options="chartOptions"
			:chart-data="chartData"
			:chart-id="chartId"
			:width="120"
			:height="120"
		/>
	</div>
</template>

<script setup>
import { Doughnut } from "vue-chartjs/legacy";
import colorsTheme from "@/styles/colorsTheme";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	CategoryScale,
} from "chart.js";

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
			cutout: "70%",
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
						offset: 5,
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
		datalabels: {
			color: "white",
			display: function (ctx) {
				return ctx.dataset.data[ctx.dataIndex] > 10;
			},
			offset: 0,
			padding: 0,
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

const centerDoughnutPlugin = {
	id: "center-text",
	beforeDraw: (chart) => {
		// get canvas width and height
		const width = chart.width;
		const height = chart.height;
		const ctx = chart.ctx;

		// get text to display
		ctx.restore();
		let fontSize = (height / 114).toFixed(2);
		ctx.font = "bold " + fontSize + "em helvetica";
		ctx.textBaseline = "middle";

		// get total done and not done
		const totalDone = chart.config.data.datasets[0].data[0];
		const totalNotDone = chart.config.data.datasets[0].data[1];
		let percentage = ((totalDone / (totalDone + totalNotDone)) * 100).toFixed(
			1
		);

		// if last digit is 0, remove it
		if (percentage % 1 === 0) {
			percentage = Math.round(percentage);
		}

		// display text
		let text = "";
		if (isNaN(percentage)) {
			text = "Tidak ada data";
			ctx.font = fontSize + "em helvetica";
			ctx.fillStyle = colorsTheme.gray;
		} else {
			text = percentage + "%";
		}

		let textX = Math.round((width - ctx.measureText(text).width) / 2);
		let textY = height / 1.87;

		ctx.fillText(text, textX, textY);
		ctx.save();
	},
};

ChartJS.register(
	Title,
	Tooltip,
	Legend,
	ArcElement,
	CategoryScale,
	ChartDataLabels,
	centerDoughnutPlugin
);
</script>
