<template>
  <Pie
    :chart-data="chartData"
    :chart-options="chartOptions"
  />
</template>

<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

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
