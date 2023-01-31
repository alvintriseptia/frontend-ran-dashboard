<template>
	<div>
		<section class="grid grid-cols-12 gap-y-8 md:gap-8">
			<Card title="Programs Summary" class="col-span-12 lg:col-span-9">
				<el-container
					class="flex flex-wrap gap-y-6 md:gap-6 justify-center items-center min-h-[400px]"
				>
					<div v-if="programs.loading">
						<LoadingSpinner />
					</div>
					<div v-else-if="programs.error">
						<el-result
							icon="error"
							title="Terjadi Kesalahan"
							:subTitle="programs.error"
						>
							<template slot="extra">
								<el-button
									type="primary"
									size="medium"
									@click="programs.doFetch"
								>
									Refresh
								</el-button>
							</template>
						</el-result>
					</div>
					<ProgramChart
						v-else-if="programs.data"
						v-for="(item, index) in programs.data"
						:key="index"
						:chart-id="index.toString()"
						:programName="item.namaProgram"
						:doneActivity="item.done"
						:notYetActivity="item.notYet"
					/>
					<el-empty description="Tidak ada data" v-else> </el-empty>
				</el-container>
			</Card>
			<Card
				title="Weekly Log Activites"
				:subtitle="'Week ' + dateUtil.getWeekInYear()"
				class="col-span-12 lg:col-span-3"
				maxHeight="calc(100vh - 4rem - 2.5rem - 2.5rem - 2.5rem)"
			>
				<div v-if="logActivities.loading">
					<LoadingSpinner />
				</div>
				<div v-else-if="logActivities.error">
					<el-result
						icon="error"
						title="Terjadi Kesalahan"
						:subTitle="logActivities.error"
					>
						<template slot="extra">
							<el-button
								type="primary"
								size="medium"
								@click="logActivities.doFetch"
							>
								Refresh
							</el-button>
						</template>
					</el-result>
				</div>
				<ActivityItem
					v-else-if="logActivities.data"
					v-for="(item, index) in logActivities.data"
					:key="index"
					:program="item.namaProgram"
					:subProgram="item.namaSubprogram"
					:siteId="item.siteID"
					:siteName="item.siteName"
					:isDone="item.status.toLowerCase() === 'done'"
					:activity="item.deskripsiActivity"
					:isLastItem="index === logActivities.data.length - 1"
				/>
				<el-empty description="Tidak ada data" v-else> </el-empty>
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
import { ref } from "vue";
import {
	ProgramChart,
	Card,
	ActivityItem,
	ActivitySummaryTable,
	SearchSelect,
	LoadingSpinner,
} from "@/components";
import { programOptions, subProgramOptions } from "@/test/optionsData";
import { dateUtil } from "@/utils";
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

const programs = ref(useFetch("/api/activity-plan/program-progress"));
const logActivities = ref(useFetch("/api/activity-plan/latest-plan-update"));
</script>
