<template>
	<Pie :data="chartData" :options="chartOptions" />
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default {
	name: "PieChart",
	components: {
		Pie,
	},
	props: {
		chartData: {
			type: Object,
			required: true,
		},
		chartOptions: {
			type: Object,
			required: true,
		},
	},
};
</script>
