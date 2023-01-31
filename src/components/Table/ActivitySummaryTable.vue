<template>
	<el-table
		:data="tableData"
		style="width: 100%"
		:header-cell-style="{
			background: colorsTheme.lightGray,
			padding: '8px',
		}"
		:cell-class-name="cellClassChecker"
		row-class-name="no-hover-table"
	>
		<el-table-column
			v-for="item in tableHeader"
			:key="item.prop"
			:prop="item.prop"
			:label="item.label"
			:min-width="item.prop == 'DESKRIPSIACTIVITY' ? '400' : '100'"
		>
		</el-table-column>
	</el-table>
</template>

<script setup>
// Import data
import activitySummary from "@/test/activitySummary.json";
import { stringUtil, colorsTheme } from "@/utils";

// Data
const data = activitySummary.data;

// prepare table header
let tableHeader = [
	{
		label: "Activities",
		prop: "DESKRIPSIACTIVITY",
	},
];

// Get all DO list
data[0]["DO"].map((item) => {
	return tableHeader.push({
		label: stringUtil.toCapitalize(item.namaDO),
		prop: item.namaDO,
	});
});

// push total
tableHeader.push({
	label: "Total",
	prop: "TOTAL",
});

// prepare table data
let tableData = [];

data.map((item, index) => {
	if (index !== data.length - 1) {
		let data = {
			DESKRIPSIACTIVITY: item.deskripsiActivity,
			TOTAL: `${item.totalDoneActivity}/${
				item.totalDoneActivity + item.totalNotYetActivity
			}`,
		};

		// Get all DO list
		item["DO"].map((doItem) => {
			data[doItem.namaDO] = `${doItem.done}/${doItem.done + doItem.notYet}`;
		});

		tableData.push(data);
	} else {
		let data = {
			DESKRIPSIACTIVITY: "Grand Total",
			TOTAL: `${item.totalDoneActivity}/${
				item.totalDoneActivity + item.totalNotYetActivity
			}`,
		};

		// Get all DO list
		item["DO"].map((doItem) => {
			data[doItem.namaDO] = `${doItem.done}/${doItem.done + doItem.notYet}`;
		});

		tableData.push(data);
	}
});

// Define Methods
// cellClassChecker will check the current cell to be highlighted
function cellClassChecker({ row }) {
	if (row.DESKRIPSIACTIVITY == "Grand Total") {
		return "p-0 bg-gray-200  text-gray-500";
	}
	return "p-0 text-gray-500";
}
</script>
