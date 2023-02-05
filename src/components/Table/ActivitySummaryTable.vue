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
		size="mini"
	>
		<el-table-column
			v-for="(item, index) in tableStructure"
			:key="index"
			:min-width="item == 'title' ? '300' : '100'"
		>
			<template #header="{ row }">
				<div class="text-center">
					{{ convertLabel(item) }}
				</div>
			</template>
			<template #default="{ row }">
				<div :class="{ 'text-center': typeof row[item] === 'object' }">
					{{
						typeof row[item] === "object"
							? row[item].done + row[item].notYet !== 0
								? `${row[item].done} / ${row[item].notYet + row[item].done}`
								: ""
							: row[item]
					}}
				</div>
			</template>
		</el-table-column>
	</el-table>
</template>

<script setup>
// Import data
import { colorsTheme, stringUtil } from "@/utils";
import { computed } from "vue";

// Data
const props = defineProps({
	data: {
		type: Object,
		default: () => ({
			tableStructure: [],
			tableData: [],
		}),
	},
});

const tableStructure = computed(() => {
	if (props.data) {
		return props.data.tableStructure;
	}
});
const tableData = computed(() => {
	if (props.data) {
		return props.data.tableData;
	}
});

// Define Methods
// cellClassChecker will check the current cell to be highlighted
function cellClassChecker({ row }) {
	if (row.title == "Grand Total") {
		return "p-0 bg-gray-200  text-gray-500 font-medium";
	}
	return "p-0 text-gray-500";
}

function convertLabel(title) {
	if (title === "title") {
		return "Activity";
	} else if (title === "grandTotal") {
		return "Grand Total";
	}
	return stringUtil.toCapitalize(title);
}
</script>
