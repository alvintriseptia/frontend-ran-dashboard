<template>
	<LineChartGenerator :chart-data="chartData" :chart-options="chartOptions" />
</template>

<script setup>
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	LineElement,
	LinearScale,
	CategoryScale,
	PointElement,
} from "chart.js";
import { Line as LineChartGenerator } from "vue-chartjs/legacy";

ChartJS.register(
	Title,
	Tooltip,
	Legend,
	LineElement,
	LinearScale,
	CategoryScale,
	PointElement
);

const props = defineProps({
	chartData: {
		type: Object,
		required: true,
	},
	chartOptions: {
		type: Object,
		required: true,
	},
});
</script>
