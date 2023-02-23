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
			:min-width="item == 'title' ? '320' : '100'"
		>
			<template #header="{ row }">
				<div class="text-center">
					{{ convertLabel(item) }}
				</div>
			</template>
			<template #default="{ row }">
				<div v-if="item === 'title'" v-html="row[item]"></div>
				<div v-else class="relative text-center">
					<div class="absolute h-full w-full bg-green-100 px-4"></div>
					<div
						:class="
							row[item].done === 0
								? 'w-0'
								: row[item].done / (row[item].done + row[item].notYet) === 1
								? 'absolute h-full z-[2] bg-green-300 px-4 w-full'
								: `absolute h-full z-[2] bg-green-300 px-4 w-[${
										(row[item].done / (row[item].done + row[item].notYet)) * 100
								  }%]`
						"
					></div>
					<span class="relative z-10 text-gray-900">
						{{
							typeof row[item] === "object"
								? row[item].done + row[item].notYet !== 0
									? `${row[item].done} / ${row[item].notYet + row[item].done}`
									: ""
								: row[item]
						}}
					</span>
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
		return "p-0 text-gray-900 font-medium";
	}
	return "p-0 text-gray-900";
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
