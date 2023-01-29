<template>
	<el-table
		:data="data"
		:fixed="false"
		nowrap="nowrap"
		:style="{ fontSize: '12px' }"
		:header-cell-style="{
			textAlign: 'center',
			background: colorsTheme.lightGray,
		}"
		:cell-class-name="classChecker"
	>
		<el-table-column prop="no" label="NO" :width="50" />
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
				<el-table-column
					v-for="(week, idx) in weekInMonths[index]"
					:key="idx"
					:label="
						(
							week +
							weekInMonths.slice(0, index).reduce((acc, cur) => acc + cur, 0)
						).toString()
					"
					:width="40"
					:header-cell-style="{ background: colorsTheme.primary }"
				>
					<template #default="{ row }">
						<el-tag
							class="text-center"
							size="mini"
							:type="
								row.periods[
									(
										week +
										weekInMonths
											.slice(0, index)
											.reduce((acc, cur) => acc + cur, 0)
									).toString() - 1
								] > 0
									? 'success'
									: 'danger'
							"
						>
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
						</el-tag>
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

const weekInMonths = Array.from({ length: 12 }, (_, i) =>
	dateUtil.getWeekOfMonth(i)
);
const totalWeeks = weekInMonths.reduce((acc, cur) => acc + cur, 0);
const currentWeek = dateUtil.getWeekInYear();
const skippedColumns = 6;

const customProgressColors = [
	{ color: colorsTheme.primary, percentage: 30 },
	{ color: colorsTheme.yellow, percentage: 70 },
	{ color: colorsTheme.green, percentage: 100 },
];

function classChecker({ columnIndex }) {
	if (columnIndex === currentWeek + skippedColumns) {
		return "bg-gray-200";
	}
	return "";
}

const data = [
	{
		no: 1,
		program: "Program 1",
		subProgram: "Sub Program 1",
		activity: "Activity 1",
		target: 100,
		percentage: 50,
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
		periods: Array.from({ length: totalWeeks }, (_, i) =>
			Math.floor(Math.random() * 10)
		),
		pic: "NOS, RTPO",
		budget: "-",
		cost: "",
	},
];
</script>
