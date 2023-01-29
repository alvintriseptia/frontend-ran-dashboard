<template>
	<el-table
		:data="data"
		:fixed="false"
		nowrap="nowrap"
		:style="{ fontSize: '12px' }"
		:header-cell-style="{
			textAlign: 'center',
			background: colorsTheme.lightGray,
			padding: '0px',
		}"
		:cell-class-name="cellClassChecker"
		row-class-name="no-hover-table"
	>
		<el-table-column label="NO" :width="50">
			<template #default="{ row, $index }">
				<div class="pl-2">
					{{ $index + 1 }}
				</div>
			</template>
		</el-table-column>
		<el-table-column prop="program" label="PROGRAM" :min-width="150" />
		<el-table-column prop="subProgram" label="SUB PROGRAM" :min-width="150" />
		<el-table-column prop="activity" label="ACTIVITY" />
		<el-table-column prop="target" label="TARGET" />
		<el-table-column label="COMPLETE" :width="90">
			<template #default="{ row }">
				<el-progress
					:percentage="row.percentage"
					:stroke-width="4"
					:color="customProgressColors"
				/>
			</template>
		</el-table-column>
		<el-table-column label="PERIODS" :width="1000">
			<el-table-column
				v-for="(month, index) in dateUtil.monthNames"
				:key="index"
				:label="month.substring(0, 3).toUpperCase()"
				:width="40"
			>
				<template #header>
					<div
						:class="
							index % 2 === 0
								? 'bg-red-300 text-gray-800'
								: 'bg-red-200 text-gray-800'
						"
					>
						{{ month.substring(0, 3).toUpperCase() }}
					</div>
				</template>
				<el-table-column
					v-for="(week, idx) in weekInMonths[index]"
					:key="idx"
					:width="40"
				>
					<template #header>
						<div
							:class="
								idx % 2 === 0
									? 'bg-red-50 text-gray-500'
									: 'bg-red-100 text-gray-500'
							"
						>
							{{
								(
									week +
									weekInMonths
										.slice(0, index)
										.reduce((acc, cur) => acc + cur, 0)
								).toString()
							}}
						</div>
					</template>
					<template #default="{ row }">
						<div class="text-center">
							{{
								row.periods[
									(
										week +
										weekInMonths
											.slice(0, index)
											.reduce((acc, cur) => acc + cur, 0)
									).toString() - 1
								]
							}}
						</div>
					</template>
				</el-table-column>
			</el-table-column>
		</el-table-column>
		<el-table-column prop="pic" label="PIC" :width="100" />
		<el-table-column prop="budget" label="BUDGET" :width="100" />
		<el-table-column prop="cost" label="COST" :width="150" />
	</el-table>
</template>

<script setup>
import { dateUtil, colorsTheme } from "@/utils";
import { computed } from "vue";

const weekInMonths = Array.from({ length: 12 }, (_, i) =>
	dateUtil.getWeekOfMonth(i)
);
const totalWeeks = dateUtil.getTotalWeeks();
const skippedColumns = 6;

const props = defineProps({
	weekHighlighted: {
		type: Number,
		default: () => dateUtil.getWeekInYear(),
	},
});

console.log(totalWeeks);

const currentWeek = computed(() => {
	return props.weekHighlighted + skippedColumns - 1;
});

const customProgressColors = [
	{ color: colorsTheme.primary, percentage: 30 },
	{ color: colorsTheme.yellow, percentage: 70 },
	{ color: colorsTheme.green, percentage: 100 },
];

function cellClassChecker({ row, columnIndex }) {
	if (columnIndex === currentWeek.value) {
		return "bg-yellow-200 p-0 hover:bg-transparent";
	} else if (columnIndex === row.weekStart + skippedColumns) {
		return "bg-purple-200 p-0";
	} else if (
		columnIndex > row.weekStart + skippedColumns &&
		columnIndex <= row.weekEnd + skippedColumns
	) {
		return "bg-purple-100 p-0";
	}
	return "p-0";
}

const data = [
	{
		no: 1,
		program: "Program 1",
		subProgram: "Sub Program 1",
		activity: "Activity 1",
		target: 100,
		percentage: 50,
		weekStart: 37,
		weekEnd: 48,
		periods: Array.from({ length: totalWeeks }, (_, i) =>
			Math.floor(Math.random() * 10)
		),
		pic: "NOS, RTPO",
		budget: "-",
		cost: "",
	},
	{
		no: 2,
		program: "Program 2",
		subProgram: "Sub Program 2",
		activity: "Activity 2",
		target: 100,
		percentage: 50,
		weekStart: 1,
		weekEnd: 12,
		periods: Array.from({ length: totalWeeks }, (_, i) =>
			Math.floor(Math.random() * 10)
		),
		pic: "NOS, RTPO",
		budget: "-",
		cost: "",
	},
	{
		no: 3,
		program: "Program 3",
		subProgram: "Sub Program 3",
		activity: "Activity 3",
		target: 100,
		percentage: 70,
		weekStart: 1,
		weekEnd: 12,
		periods: Array.from({ length: totalWeeks }, (_, i) =>
			Math.floor(Math.random() * 10)
		),
		pic: "NOS, RTPO",
		budget: "-",
		cost: "",
	},
	{
		no: 4,
		program: "Program 4",
		subProgram: "Sub Program 4",
		activity: "Activity 4",
		target: 100,
		percentage: 100,
		weekStart: 1,
		weekEnd: 12,
		periods: Array.from({ length: totalWeeks }, (_, i) =>
			Math.floor(Math.random() * 10)
		),
		pic: "NOS, RTPO",
		budget: "-",
		cost: "",
	},
	{
		no: 5,
		program: "Program 5",
		subProgram: "Sub Program 5",
		activity: "Activity 5",
		target: 100,
		percentage: 50,
		weekStart: 1,
		weekEnd: 12,
		periods: Array.from({ length: totalWeeks }, (_, i) =>
			Math.floor(Math.random() * 10)
		),
		pic: "NOS, RTPO",
		budget: "-",
		cost: "",
	},
	{
		no: 6,
		program: "Program 6",
		subProgram: "Sub Program 6",
		activity: "Activity 6",
		target: 100,
		percentage: 10,
		weekStart: 13,
		weekEnd: 24,
		periods: Array.from({ length: totalWeeks }, (_, i) =>
			Math.floor(Math.random() * 10)
		),
		pic: "NOS, RTPO",
		budget: "-",
		cost: "",
	},
	{
		no: 7,
		program: "Program 7",
		subProgram: "Sub Program 7",
		activity: "Activity 7",
		target: 100,
		percentage: 20,
		weekStart: 25,
		weekEnd: 36,
		periods: Array.from({ length: totalWeeks }, (_, i) =>
			Math.floor(Math.random() * 10)
		),
		pic: "NOS, RTPO",
		budget: "-",
		cost: "",
	},
];
</script>

<style>
.el-table th.el-table__cell > .cell {
	padding: 0;
}

.el-table--border .el-table__cell:first-child .cell {
	padding-left: 0;
}

.no-hover-table {
	pointer-events: none;
}

.el-popover {
	min-width: auto;
}
</style>
