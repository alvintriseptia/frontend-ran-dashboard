<script setup>
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
	ProgramChart,
	Card,
	ActivityItem,
	HorizontalBarChart,
	SearchSelect,
} from "@/components";
import programs from "@/test/programs.json";
import activites from "@/test/activities.json";
import { programOptions, subProgramOptions } from "@/test/optionsData";
import { dateUtil } from "@/utils";

import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	BarElement,
	CategoryScale,
	LinearScale,
} from "chart.js";

ChartJS.register(
	Title,
	Tooltip,
	Legend,
	ArcElement,
	BarElement,
	CategoryScale,
	LinearScale,
	ChartDataLabels
);

const programData = programs.data;
const activityData = activites.data;
</script>

<template>
	<div class="container mx-auto px-4 py-2">
		<h1 class="text-3xl font-bold mb-4">
			Dashboard Squad Operation & Availability 2023
		</h1>
		<section class="grid grid-cols-12 gap-8">
			<Card title="Programs Summary" class="col-span-12 lg:col-span-9">
				<div class="flex flex-wrap gap-6">
					<ProgramChart
						v-for="item in programData"
						:key="item.id"
						:chart-id="item.id"
						:programName="item.programName"
						:doneActivity="item.doneActivity"
						:notYetActivity="item.totalActivity - item.doneActivity"
					/>
				</div>
			</Card>
			<Card
				title="Weekly Log Activites"
				:subtitle="'Week ' + dateUtil.getWeekInYear()"
				class="col-span-12 lg:col-span-3"
				maxHeight="calc(100vh - 4rem - 2.5rem - 2.5rem - 2.5rem)"
			>
				<ActivityItem
					v-for="(item, index) in activityData"
					:key="item.id"
					:program="item.program"
					:subProgram="item.subProgram"
					:siteId="item.siteId"
					:subDept="item.subDept"
					:isDone="item.isDone"
					:activity="item.activity"
					:isLastItem="index === activityData.length - 1"
				/>
			</Card>
		</section>
		<section class="my-10">
			<Card title="Activities Summary">
				<div class="flex gap-x-4 mb-6">
					<SearchSelect
						:options="programOptions"
						:isMultiple="false"
						placeholder="Pilih Program"
					/>
					<SearchSelect
						:options="subProgramOptions[0].data"
						:isMultiple="false"
						placeholder="Pilih Sub Program"
					/>
				</div>
				<div class="m-10 flex gap-6 flex-wrap justify-center">
					<HorizontalBarChart />
					<HorizontalBarChart />
					<HorizontalBarChart />
					<HorizontalBarChart />
					<HorizontalBarChart />
					<HorizontalBarChart />
					<HorizontalBarChart />
				</div>
			</Card>
		</section>
	</div>
</template>
