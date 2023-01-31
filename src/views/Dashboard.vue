<template>
	<div>
		<section class="grid grid-cols-12 gap-y-8 md:gap-8">
			<Card title="Programs Summary" class="col-span-12 lg:col-span-9">
				<div class="flex flex-wrap gap-y-6 md:gap-6 justify-center">
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
				<ActivitySummaryTable />
			</Card>
		</section>
	</div>
</template>

<script setup>
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
	ProgramChart,
	Card,
	ActivityItem,
	ActivitySummaryTable,
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
