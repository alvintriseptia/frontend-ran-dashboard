<!-- eslint-disable vue/no-v-html -->
<template>
	<LazyTable
		v-loading="loading"
		:data="data"
		:headerCellStyle="{
			textAlign: 'center',
			background: colorsTheme.lightGray,
			padding: '0px',
		}"
		:cellClassChecker="cellClassChecker"
		:unrender="true"
		:renderOnIdle="true"
	>
		<el-table-column label="NO" :width="40" fixed="left">
			<template #default="{ $index }">
				<div class="text-center">
					{{ $index + 1 }}
				</div>
			</template>
		</el-table-column>
		<el-table-column label="ACTIVITY" :width="300" fixed>
			<template #default="{ row }">
				<div class="px-2 break-all" v-html="row.activity" />
			</template>
		</el-table-column>
		<el-table-column prop="program" label="PROGRAM" :width="150" />
		<el-table-column label="SUB PROGRAM" :width="200">
			<template #default="{ row }">
				<div v-html="row.subProgram" />
			</template>
		</el-table-column>
		<el-table-column label="TARGET">
			<template #default="{ row }">
				<div class="text-center">
					{{ row.target }}
				</div>
			</template>
		</el-table-column>
		<el-table-column label="COMPLETE" :width="90">
			<template #default="{ row }">
				<el-progress
					:percentage="parseInt(row.percentage)"
					:stroke-width="4"
					:color="customProgressColors"
				/>
			</template>
		</el-table-column>
		<el-table-column label="PERIODS" :width="1000">
			<el-table-column
				v-for="(month, index) in dateUtil.monthNames"
				:key="index"
				:width="40"
			>
				<template #header>
					<div :class="getMonthBgColor(index)">
						{{ convertMonthToMMM(month) }}
					</div>
				</template>
				<el-table-column
					v-for="(week, idx) in weekInMonths[index]"
					:key="idx"
					:width="40"
				>
					<template #header>
						<div :class="getPeriodBgColor(idx)">
							{{ getWeekInYear(week, index) }}
						</div>
					</template>
					<template #default="{ row }">
						<div class="text-center">
							{{
								row.periods[getWeekInYear(week, index) - 1] === 0
									? ""
									: row.periods[getWeekInYear(week, index) - 1]
							}}
						</div>
					</template>
				</el-table-column>
			</el-table-column>
		</el-table-column>
		<el-table-column prop="pic" label="PIC" :width="150" />
		<el-table-column
			v-if="userStore.getters.role === 'admin'"
			prop="budget"
			label="BUDGET"
			:width="100"
		/>
		<el-table-column
			v-if="userStore.getters.role === 'admin'"
			prop="cost"
			label="COST"
			:width="150"
		>
			<template #default="{ row }">
				<div class="text-right">
					{{
						row.cost && row.cost !== 0
							? numberFormat.currencyFormat(row.cost)
							: ""
					}}
				</div>
			</template>
		</el-table-column>
	</LazyTable>
</template>

<script setup>
// Import Data
import { dateUtil, colorsTheme, numberFormat } from "@/utils";
import { computed } from "vue";
import { userStore } from "@/stores";
import { LazyTable } from "@/components";

// Define Props
const props = defineProps({
	weekHighlighted: {
		type: Number,
		default: () => dateUtil.getWeekInYear(),
	},
	data: {
		type: Array,
		default: () => [],
	},
	weekInMonths: {
		type: Array,
		default: () => [],
	},
	loading: {
		type: Boolean,
		default: () => false,
	},
});

const currentWeek = computed(() => {
	return props.weekHighlighted + skippedColumns - 1;
});

const weekInMonths = computed(() => {
	return props.weekInMonths;
});

// Define how many columns to skip,
// to get periods column to be first column
const skippedColumns = 6;

// Progress colors, based on percentage
// if percentage lower than 30, color will be red
// if percentage lower than 70, color will be yellow
// if percentage lower than 100, color will be green
const customProgressColors = [
	{ color: colorsTheme.primary, percentage: 30 },
	{ color: colorsTheme.yellow, percentage: 70 },
	{ color: colorsTheme.green, percentage: 100 },
];

// Define Methods
// cellClassChecker will check the current cell to be highlighted
function cellClassChecker({ row, columnIndex }) {
	// Actual Complete
	if (
		row.weekCompleteActual !== null &&
		columnIndex === parseInt(row.weekCompleteActual) + (skippedColumns - 1)
	) {
		return "bg-purple-600 p-0 text-white border border-gray-300";
	}

	// Actual Start
	else if (
		row.weekStartActual &&
		columnIndex === parseInt(row.weekStartActual) + (skippedColumns - 1)
	) {
		return "bg-purple-300 p-0 border border-gray-300";
	}

	// Actual Complete Beyond
	else if (
		row.weekCompleteBeyond &&
		columnIndex === parseInt(row.weekCompleteBeyond) + (skippedColumns - 1)
	) {
		return "bg-orange-600 p-0 border border-gray-300 text-white";
	}

	// Actual Start Beyond
	else if (
		row.weekStartBeyond &&
		columnIndex === parseInt(row.weekStartBeyond) + (skippedColumns - 1)
	) {
		return "bg-orange-300 p-0 border border-gray-300";
	}

	// Week Highlighted
	else if (columnIndex === currentWeek.value) {
		return "bg-yellow-200 p-0 border border-gray-300";
	}

	// Plan Duration Highlited
	else if (
		columnIndex >= parseInt(row.weekStart) + (skippedColumns - 1) &&
		columnIndex <= parseInt(row.weekEnd) + (skippedColumns - 1)
	) {
		return "bg-purple-100 p-0 border border-gray-300";
	}

	// Column Index in range periods
	else if (
		columnIndex >= skippedColumns &&
		columnIndex <= skippedColumns + parseInt(row.periods.length) - 1
	) {
		return "p-0 border border-gray-300";
	}

	return "p-0";
}

// convert monthName to 3 letter and uppercase
function convertMonthToMMM(monthName) {
	return monthName.substring(0, 3).toUpperCase();
}

// get week in year from week in month
function getWeekInYear(week, monthNumber) {
	const weekInYear =
		week +
		props.weekInMonths
			.slice(0, monthNumber)
			.reduce((acc, cur) => parseInt(acc) + parseInt(cur), 0);
	return weekInYear;
}

// Get period header bg color
function getPeriodBgColor(index) {
	if (index % 2 === 0) {
		return "bg-red-50 text-gray-500";
	} else {
		return "bg-red-100 text-gray-500";
	}
}

// Get month header bg color
function getMonthBgColor(index) {
	if (index % 2 === 0) {
		return "bg-red-300 text-gray-800";
	} else {
		return "bg-red-200 text-gray-800";
	}
}
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
