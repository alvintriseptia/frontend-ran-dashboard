<!-- eslint-disable vue/no-v-html -->
<template>
	<section v-loading="loading" class="overflow-x-auto min-h-[300px] w-full">
		<table class="table-fixed">
			<thead class="bg-gray-100 border-b">
				<tr>
					<th
						v-for="(header, index) in tableStructure"
						:key="header"
						class="text-xs font-medium text-gray-600 text-left mx-4 px-4 py-2 relative"
						:class="{
							'min-w-[300px]': header === 'title',
							'bg-gray-200': index % 2 === 0,
						}"
					>
						{{ convertLabel(header) }}
					</th>
				</tr>
			</thead>

			<!-- IF EMPTY -->
			<div
				v-if="!tableData || tableData.length === 0"
				class="absolute left-1/2"
			>
				<el-empty description="No Data" />
			</div>

			<!-- IF NOT EMPTY -->
			<tbody v-else-if="tableData && tableData.length > 0">
				<tr v-for="(row, index) in tableData" :key="index" class="border-b">
					<!-- Site ID -->
					<td
						v-for="(header, idx) in tableStructure"
						:key="idx"
						class="text-xs text-gray-900 p-2 whitespace-nowrap border-r"
					>
						<div
							v-if="header === 'title'"
							:class="{ 'font-semibold': row[header] === 'Grand Total' }"
							v-html="row[header]"
						/>
						<div v-else class="relative text-center w-[120px]">
							<div class="absolute h-full w-full bg-green-100 px-4" />
							<div
								:style="{
									position: 'absolute',
									zIndex: 10,
									height: '100%',
									width: `${
										(row[header].done /
											(row[header].notYet + row[header].done)) *
										100
									}%`,
								}"
								class="bg-green-300"
							/>
							<span
								class="relative z-10 text-gray-900"
								:class="{
									'font-semibold': index === tableData.length - 1,
								}"
							>
								{{
									row[header].done + row[header].notYet !== 0
										? `${row[header].done} / ${
												row[header].notYet + row[header].done
										  }`
										: ""
								}}
							</span>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script setup>
// Import data
import { colorsTheme, stringUtil } from "@/utils";
import { computed } from "vue";

// Data
const props = defineProps({
	tableStructure: {
		type: Array,
		default: () => [],
	},
	tableData: {
		type: Array,
		default: () => [],
	},
	loading: {
		type: Boolean,
		default: false,
	},
});

const tableStructure = computed(() => props.tableStructure);
const tableData = computed(() => props.tableData);
const loading = computed(() => props.loading);

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
