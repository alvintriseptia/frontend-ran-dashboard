<script setup>
import {
	LineChart,
	BarChart,
	PieChart,
	Button,
	OutlinedButton,
	Select,
	SearchSelect,
	Table,
} from "@/components";
import { useCounterStore } from "@/stores";

const chartData = {
	labels: ["10.00", "10.05", "10.10", "10.15", "10.20", "10.25", "10.30"],
	datasets: [
		{
			label: "Dataset 1",
			backgroundColor: "#f87979",
			borderColor: "#f87979",
			data: [40, 39, 10, 40, 39, 80, 40],
		},
	],
};

const pieChartData = {
	labels: ["Dataset 1", "Dataset 2", "Dataset 3"],
	datasets: [
		{
			backgroundColor: ["#f87979", "#f8b379", "#f8f379"],
			borderColor: ["#f87979", "#f8b379", "#f8f379"],
			data: [40, 39, 10],
		},
	],
};

const chartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			display: true,
		},
		title: {
			display: true,
			text: "Chart",
		},
		datalabels: {
			display: false,
		},
	},
};

const horizontalChartOptions = {
	indexAxis: "y",
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		title: {
			display: true,
			text: "Horizontal Chart",
		},
		datalabels: {
			display: false,
		},
	},
};

const pieChartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			display: true,
		},
		title: {
			display: true,
			text: "Pie Chart",
		},
		datalabels: {
			color: "#fff",
		},
	},
};

const selectOptions = [
	{ label: "Option 1", value: "option-1" },
	{ label: "Option 2", value: "option-2" },
	{ label: "Option 3", value: "option-3" },
	{ label: "Option 4", value: "option-4" },
	{ label: "Option 5", value: "option-5" },
	{ label: "Option 6", value: "option-6" },
	{ label: "Option 7", value: "option-7" },
	{ label: "Option 8", value: "option-8" },
	{ label: "Option 9", value: "option-9" },
	{ label: "Option 10", value: "option-10" },
	{ label: "Option 11", value: "option-11" },
	{ label: "Option 12", value: "option-12" },
];

const counterStore = useCounterStore();
</script>

<template>
	<div>
		<h1 class="text-center font-bold text-3xl mt-4">Design System</h1>
		<section class="flex flex-wrap gap-10 p-10 justify-center">
			<div class="w-[400px]">
				<LineChart :chartData="chartData" :chartOptions="chartOptions" />
			</div>
			<div class="w-[400px]">
				<BarChart :chartData="chartData" :chartOptions="chartOptions" />
			</div>
			<div class="w-[400px]">
				<BarChart
					:chartData="chartData"
					:chartOptions="horizontalChartOptions"
				/>
			</div>
			<div class="w-[400px]">
				<PieChart :chartData="pieChartData" :chartOptions="pieChartOptions" />
			</div>
			<div class="flex flex-col gap-y-4 items-center">
				<h2 class="font-semibold">Button</h2>
				<div class="flex gap-x-10">
					<Button> Select </Button>
					<Button :disabled="true"> Select </Button>
				</div>
				<h2 class="font-semibold">Outlined Button</h2>
				<div class="flex gap-x-10">
					<OutlinedButton> Select </OutlinedButton>
					<OutlinedButton :disabled="true"> Select </OutlinedButton>
				</div>
			</div>
			<div class="flex flex-col gap-y-4 items-center"></div>
			<div class="flex flex-col gap-y-4 items-center">
				<h2 class="font-semibold">Select Option</h2>
				<Select :options="selectOptions" />

				<h2 class="font-semibold">Search Select Option</h2>
				<SearchSelect :options="selectOptions" />
			</div>
			<div class="flex flex-col gap-y-4 items-center w-full">
				<h2 class="font-semibold">Counter using Pinia</h2>
				<h3>{{ counterStore }}</h3>

				<router-link class="text-blue-500" to="/count">
					Go to Count View
				</router-link>
			</div>
			<div class="flex flex-col gap-y-4 items-center w-full">
				<h2 class="font-semibold">Google Maps with ThreeJs</h2>

				<router-link class="text-blue-500" to="/maps"> Go to Maps </router-link>
			</div>
			<div class="flex flex-col gap-y-4 items-center w-full">
				<h2 class="font-semibold">Table with API</h2>
				<div class="lg:w-1/2">
					<Table />
				</div>
			</div>
		</section>
	</div>
</template>
