<template>
	<div>
		<p class="text-sm font-semibold mb-1">eGBTS Program</p>
		<Bar
			:chart-data="chartData"
			:chart-options="chartOptions"
			class="h-[300px] w-[200px] md:w-[250px]"
		/>
	</div>
</template>

<script setup>
import { Bar } from "vue-chartjs";
import { colorsTheme } from "@/utils";

const chartData = {
	labels: [
		"Banjarnegara",
		"Demak",
		"Magelang",
		"Pati",
		"Pekalongan",
		"Purworkerto",
		"Semarang",
		"Seragen",
		"Surakarta",
		"Tegal",
		"Yogyakarta",
	],
	datasets: [
		{
			label: "Done Activity",
			backgroundColor: colorsTheme.green,
			data: [15, 5, 4, 10, 15, 5, 4, 10, 15, 5, 4],
			datalabels: {
				labels: {
					index: {
						align: "end",
						anchor: "end",
						color: function (ctx) {
							return colorsTheme.dark;
						},
						font: { size: 14, weight: "bold" },
						offset: 5,
						formatter: function (value, ctx) {
							return (
								value + "/" + ctx.chart.data.datasets[1].data[ctx.dataIndex]
							);
						},
					},
				},
			},
		},
		{
			label: "Total Activity",
			backgroundColor: "rgba(22, 163, 74,0.2)",
			data: [85, 95, 19, 45, 85, 95, 19, 45, 85, 95, 19],
			datalabels: {
				labels: {
					index: {
						color: function (ctx) {
							return "transparent";
						},
						formatter: function (value, ctx) {
							return "";
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
	indexAxis: "y",
	scales: {
		x: {
			stacked: true,
		},
		y: {
			stacked: true,
		},
	},
	plugins: {
		legend: {
			display: false,
		},
		title: {
			enabled: false,
		},
		chartDataPlugin: {
			display: false,
		},
		tooltip: {
			enabled: false,
		},
	},
};
</script>
