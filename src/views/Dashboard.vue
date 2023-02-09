<template>
	<div>
		<section class="grid grid-cols-12 gap-y-8 md:gap-4">
			<Card title="Programs Summary" class="col-span-12 lg:col-span-9">
				<template #header
					><el-tooltip
						class="item"
						effect="dark"
						content="Reload"
						placement="top-start"
					>
						<el-button
							size="small"
							@click="programSummary.doFetch"
							icon="el-icon-refresh-right"
							class="bg-red-500 text-white"
							circle
						></el-button>
					</el-tooltip>
				</template>
				<el-container
					class="flex flex-wrap gap-y-6 md:gap-6 justify-center items-center min-h-[400px]"
				>
					<APIResponseLayout
						v-if="
							programSummary.data === null || programSummary.data.length === 0
						"
						:error="programSummary.error"
						:loading="programSummary.loading"
						@refreshFunction="programSummary.doFetch"
						:data="programSummary.data"
					/>
					<ProgramChart
						v-else
						v-for="(item, index) in programSummary.data"
						:key="index"
						:chart-id="index.toString()"
						:programName="item.namaProgram"
						:doneActivity="item.done"
						:notYetActivity="item.notYet"
					/>
				</el-container>
			</Card>
			<Card
				title="Top 10 Recent Activities"
				class="col-span-12 lg:col-span-3"
				maxHeight="calc(100vh - 4rem - 2.5rem - 2.5rem - 2.5rem)"
			>
				<template #header
					><el-tooltip
						class="item"
						effect="dark"
						content="Reload"
						placement="top-start"
					>
						<el-button
							size="small"
							@click="logActivities.doFetch"
							icon="el-icon-refresh-right"
							circle
							class="bg-red-500 text-white"
						></el-button>
					</el-tooltip>
				</template>
				<APIResponseLayout
					v-if="logActivities.data === null || logActivities.data.length === 0"
					:error="logActivities.error"
					:loading="logActivities.loading"
					@refreshFunction="logActivities.doFetch"
					:data="logActivities.data"
				/>
				<ActivityItem
					v-else
					v-for="(item, index) in logActivities.data"
					:key="index"
					:program="item.namaProgram"
					:subProgram="item.namaSubprogram"
					:siteId="item.siteID"
					:siteName="item.siteName"
					:isDone="item.status.toLowerCase() === 'done'"
					:activity="item.deskripsiActivity"
					:updatedAt="item.updatedAt"
					:isLastItem="index === logActivities.data.length - 1"
				/>
			</Card>
		</section>

		<section class="my-10">
			<Card title="Activities Summary">
				<template #header
					><el-tooltip
						class="item"
						effect="dark"
						content="Reload"
						placement="top-start"
					>
						<el-button
							size="small"
							@click="activitySummary.doFetch"
							icon="el-icon-refresh-right"
							circle
							class="bg-red-500 text-white"
						></el-button>
					</el-tooltip>
				</template>
				<div class="flex gap-x-4 mb-6">
					<SearchSelect
						:options="programOptions"
						:isMultiple="false"
						placeholder="Pilih Program"
						@onUpdate="handleProgramUpdate"
					/>
					<SearchSelect
						:options="subProgramOptions"
						:isMultiple="false"
						placeholder="Pilih Sub Program"
						@onUpdate="handleSubProgramUpdate"
					/>
					<Select
						:options="quarters"
						placeholder="Pilih Kuartal"
						@onChange="handleQuarterUpdate"
					/>
				</div>
				<ActivitySummaryTable
					v-if="activitySummary.data"
					:data="activitySummary.data"
				/>
				<APIResponseLayout
					v-else
					:error="activitySummary.error"
					:loading="activitySummary.loading"
					@refreshFunction="activitySummary.doFetch"
					:data="activitySummary.data"
				/>
			</Card>
		</section>
	</div>
</template>

<script setup>
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ref, onMounted, watch, unref } from "vue";
import {
	ProgramChart,
	Card,
	ActivityItem,
	ActivitySummaryTable,
	SearchSelect,
	APIResponseLayout,
	Select,
} from "@/components";
import { useFetch } from "@/composables";

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

// Program Summary
const programSummary = ref(
	useFetch({ url: "/api/activity-plan/program-progress" })
);

// Weekly Log Activities
const logActivities = ref(
	useFetch({ url: "/api/activity-plan/latest-plan-update" })
);

// Activity Summary
// Activity summary params
const activitySummaryParams = ref({
	program: "1",
	subprogram: "",
	target_quartal: "",
});

const activitySummary = useFetch({
	url: "/api/activity-plan/activity-progress-by-do",
	params: activitySummaryParams,
});

// Quarter options
const quarters = [
	{
		label: "All Q",
		value: "",
	},
	{
		label: "Q1",
		value: "Q1",
	},
	{
		label: "Q2",
		value: "Q2",
	},
	{
		label: "Q3",
		value: "Q3",
	},
	{
		label: "Q4",
		value: "Q4",
	},
];

// handle quarter change
const handleQuarterUpdate = (value) => {
	activitySummaryParams.value.target_quartal = value;
};

// Programs
const programs = useFetch({ url: "/api/program" });
// get program options by mapping programs
const programOptions = ref([]);

// handle program change
const handleProgramUpdate = (value) => {
	activitySummaryParams.value.program = value;
	subProgramParams.value.programId = value;
};

// Get all sub programs
const subProgramParams = ref({ programId: "1" });
const subPrograms = useFetch({
	url: "/api/subprogram",
	params: subProgramParams,
});

// // get sub program options by mapping sub programs
const subProgramOptions = ref([]);

// handle sub program change
const handleSubProgramUpdate = (value) => {
	activitySummaryParams.value.subprogram = value;
};

onMounted(() => {
	// watch programs
	watch(programs.data, () => {
		if (programs.data) {
			programOptions.value = programs.data.value.map((item) => {
				return {
					label: "Program " + item.nama,
					value: item.id,
				};
			});

			subProgramParams.value.programId = programOptions.value[0].value;
		}
	});

	// watch sub programs
	watch(subPrograms.data, () => {
		if (subPrograms.data) {
			subProgramOptions.value = subPrograms.data.value.map((item) => {
				return {
					label: "Subprogram " + item.nama,
					value: item.id,
				};
			});
			subProgramOptions.value.unshift({
				label: "All Subprogram",
				value: "",
			});
			activitySummaryParams.value.subprogram = subProgramOptions.value[0].value;
		}
	});
});
</script>
