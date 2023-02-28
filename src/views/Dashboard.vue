<template>
	<div>
		<section class="grid grid-cols-12 gap-y-8 md:gap-4">
			<Card title="Programs Summary" class="col-span-12 lg:col-span-9">
				<template #header>
					<el-tooltip
						class="item"
						effect="dark"
						:content="lastUpdatedProgramSummary"
						placement="top-start"
					>
						<el-button
							size="small"
							icon="el-icon-refresh-right"
							class="bg-red-500 text-white"
							circle
							@click="reloadProgramSummary"
						/>
					</el-tooltip>
				</template>
				<el-container
					class="flex flex-wrap gap-y-6 md:gap-6 justify-center items-center min-h-[400px]"
				>
					<APIResponseLayout
						v-if="!programSummary.data || programSummary.data.length === 0"
						:error="programSummary.message"
						:loading="programSummary.loading"
						:data="programSummary.data"
						@refreshFunction="programSummary.doFetch"
					/>
					<ProgramChart
						v-for="(item, index) in programSummary.data"
						v-else
						:key="index"
						:chart-id="index.toString()"
						:program-name="item.namaProgram"
						:done-activity="parseInt(item.done)"
						:not-yet-activity="parseInt(item.notYet)"
					/>
				</el-container>
			</Card>
			<Card
				title="Top 10 Recent Activities"
				class="col-span-12 lg:col-span-3"
				max-height="calc(100vh - 4rem - 2.5rem - 2.5rem - 2.5rem)"
			>
				<template #header>
					<el-tooltip
						class="item"
						effect="dark"
						:content="lastUpdatedLogActivities"
						placement="top-start"
					>
						<el-button
							size="small"
							icon="el-icon-refresh-right"
							circle
							class="bg-red-500 text-white"
							@click="reloadLogActivities"
						/>
					</el-tooltip>
				</template>
				<APIResponseLayout
					v-if="!logActivities.data || logActivities.data.length === 0"
					:error="logActivities.message"
					:loading="logActivities.loading"
					:data="logActivities.data"
					@refreshFunction="logActivities.doFetch"
				/>
				<ActivityItem
					v-for="(item, index) in logActivities.data"
					v-else
					:key="index"
					:program="item.namaProgram"
					:sub-program="item.namaSubprogram ? item.namaSubprogram : ''"
					:site-id="item.siteID"
					:site-name="item.siteName"
					:is-done="item.status.toLowerCase() === 'done'"
					:activity="item.deskripsiActivity"
					:updated-at="item.updatedAt"
					:is-last-item="index === logActivities.data.length - 1"
				/>
			</Card>
		</section>

		<section class="my-10">
			<Card
				title="Activities Summary"
				subtitle="Note: the value represents → done activities/target activities"
			>
				<template #header>
					<el-tooltip
						class="item"
						effect="dark"
						:content="lastUpdatedActivitySummary"
						placement="top-start"
					>
						<el-button
							size="small"
							icon="el-icon-refresh-right"
							circle
							class="bg-red-500 text-white"
							@click="reloadActivitySummary"
						/>
					</el-tooltip>
				</template>
				<div class="flex gap-x-4 mb-6">
					<SearchSelect
						:options="programOptions"
						:is-multiple="false"
						placeholder="Pilih Program"
						@onUpdate="handleProgramUpdate"
					/>
					<SearchSelect
						:options="subProgramOptions"
						:is-multiple="false"
						placeholder="Pilih Sub Program"
						@onUpdate="handleSubProgramUpdate"
					/>
					<Select
						:options="quarterOptions"
						placeholder="Pilih Kuartal"
						@onChange="handleQuarterUpdate"
					/>
				</div>
				<ActivitySummaryTable
					v-if="
						activitySummary.data.value || activitySummary.data.value === null
					"
					:tableData="activitySummary.data.value?.tableData || []"
					:tableStructure="activitySummary.data.value?.tableStructure || []"
					:loading="activitySummary.loading.value"
				/>
				<APIResponseLayout
					v-else
					:error="activitySummary.message"
					:loading="activitySummary.loading"
					:data="activitySummary.data"
					@refreshFunction="activitySummary.doFetch"
				/>
			</Card>
		</section>
	</div>
</template>

<script setup>
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ref, onMounted, watch } from "vue";
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
import { dateUtil, options } from "@/utils";

// ====================================== ChartJS ===============================================
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

// ====================================== Program Summary ===============================================

// Program Summary
const programSummary = ref(
	useFetch({ url: "/api/activity-plan/program-progress" })
);

// Last updated
const lastUpdatedProgramSummary = ref(
	"Reloaded at " + dateUtil.convertDateToLocaleString(new Date())
);

// Reload program summary
const reloadProgramSummary = () => {
	programSummary.value.doFetch();
	lastUpdatedProgramSummary.value =
		"Reloaded at " + dateUtil.convertDateToLocaleString(new Date());
};

// ====================================== Top 10 Recent Activities ===============================================

// Weekly Log Activities
const logActivities = ref(
	useFetch({ url: "/api/activity-plan/latest-plan-update" })
);

// Last updated
const lastUpdatedLogActivities = ref(
	"Reloaded at " + dateUtil.convertDateToLocaleString(new Date())
);

// Reload log activities
const reloadLogActivities = () => {
	logActivities.value.doFetch();
	lastUpdatedLogActivities.value =
		"Reloaded at " + dateUtil.convertDateToLocaleString(new Date());
};

// ====================================== Activity Summary ===============================================
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

const tableData = ref([]);
const tableStructure = ref([]);

watch(activitySummary.data, (newVal) => {
	if (newVal) {
		tableData.value = [];
		tableStructure.value = [];

		setTimeout(() => {
			tableData.value = newVal.tableData;
			tableStructure.value = newVal.tableStructure;
		}, 100);
	} else {
		tableData.value = [];
		tableStructure.value = [];
	}
});

// Last updated
const lastUpdatedActivitySummary = ref(
	"Reloaded at " + dateUtil.convertDateToLocaleString(new Date())
);

// Reload activity summary
const reloadActivitySummary = () => {
	activitySummary.doFetch();
	lastUpdatedActivitySummary.value =
		"Reloaded at " + dateUtil.convertDateToLocaleString(new Date());
};

const quarterOptions = ref([]);

watch(activitySummary.data, (newVal) => {
	if (newVal) {
		console.log(newVal);
		quarterOptions.value = newVal.filters.targetQuartal.map((item) => {
			return {
				label: item,
				value: item,
			};
		});
	} else {
		quarterOptions.value = [];
	}

	console.log(quarterOptions);
});

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
