<template>
	<el-table
		:data="data"
		:style="{ width: '100%', overflow: 'auto' }"
		header-cell-class-name="header-color-activity"
	>
		<el-table-column label="No" width="60">
			<template #default="{ row, $index }">
				{{ numberStart + $index }}
			</template>
		</el-table-column>
		<el-table-column prop="status" label="Status" width="80">
			<template #default="{ row }">
				<PopOver
					:status="row.status"
					@onUpdate="(status) => handleStatusUpdate(row, status)"
				/>
			</template>
		</el-table-column>
		<el-table-column prop="weekExecuted" label="Week Exec" width="80" />
		<el-table-column prop="namaProgram" label="Program" width="200" />
		<el-table-column prop="namaSubprogram" label="Sub Program" width="200" />
		<el-table-column
			prop="deskripsiActivity"
			label="Description Activity"
			width="250"
		/>
		<el-table-column
			prop="additionalInfo"
			label="Additional Information"
			width="250"
		/>
		<el-table-column prop="siteID" label="Site ID" width="100" />
		<el-table-column prop="siteName" label="Site Name" width="150" />
		<!-- <el-table-column prop="kabupaten" label="Kabupaten" width="200" /> -->
		<el-table-column prop="namaDO" label="DO" width="150" />
		<el-table-column prop="namaNS" label="NS" width="150" />
		<el-table-column prop="namaPIC" label="PIC" width="150" />
		<el-table-column prop="targetQuartal" label="Target Q" width="60" />
		<!-- <el-table-column prop="date" label="Date" width="100" /> -->
		<el-table-column prop="remark" label="Remark" width="150" />
		<el-table-column prop="budget" label="Budget" width="150" />
		<el-table-column label="Cost" width="200">
			<template #default="{ row }">
				{{
					row.cost && row.cost !== "0"
						? numberFormat.currencyFormat(row.cost)
						: ""
				}}
			</template>
		</el-table-column>
	</el-table>
</template>

<script setup>
// Import data
import { PopOver } from "@/components";
import { numberFormat } from "@/utils";
import { computed, watch } from "vue";
import { useFetch } from "@/composables";

const props = defineProps({
	data: {
		type: Array,
		default: () => [],
	},
	numberStart: {
		type: Number,
		default: 1,
	},
});

const data = computed(() => props.data);
const numberStart = computed(() => props.numberStart);

const handleStatusUpdate = (row, status) => {
	// console.log(row);
	const body = new FormData();

	const date = new Date();
	const dateNow = date.toISOString().slice(0, 10);

	body.append("activityId", row.activityID);
	body.append("siteId", row.siteID);
	body.append("dateExecuted", dateNow);
	body.append("status", status);

	// console.log(activityStatusParams);
	const { data } = useFetch({
		url: "/api/activity",
		method: "POST",
		body,
	});

	watch(data, (newData) => {
		if (newData >= 0) {
			console.log("success");
			row.status = status;
		}
	});
};
</script>

<style>
.header-color-activity {
	background-color: #f5f5f5 !important;
	padding: 0 !important;
	text-align: center !important;
}

.header-color-activity:nth-child(even) {
	background-color: rgb(229, 231, 235) !important;
	padding: 0 !important;
	text-align: center !important;
}
</style>
