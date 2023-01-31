<template>
	<el-table
		:data="data"
		:style="{ width: '100%', overflowX: 'auto' }"
		header-cell-class-name="header-color-activity"
	>
		<el-table-column label="No" width="60">
			<template #default="{ row, $index }">
				{{ $index + 1 }}
			</template>
		</el-table-column>
		<el-table-column prop="status" label="Status" width="80">
			<template #default="{ row }">
				<PopOver :status="row.status" />
			</template>
		</el-table-column>
		<el-table-column prop="weekExecution" label="Week Exec" width="80" />
		<el-table-column prop="directorat" label="Directorat" width="150" />
		<el-table-column prop="program" label="Program" width="200" />
		<el-table-column prop="subProgram" label="Sub Program" width="200" />
		<el-table-column
			prop="descriptionActivity"
			label="Description Activity"
			width="250"
		/>
		<el-table-column
			prop="additionalInformation"
			label="Additional Information"
			width="250"
		/>
		<el-table-column prop="siteId" label="Site ID" width="60" />
		<el-table-column prop="siteName" label="Site Name" width="150" />
		<el-table-column prop="kabupaten" label="Kabupaten" width="200" />
		<el-table-column prop="do" label="DO" width="150" />
		<el-table-column prop="ns" label="NS" width="150" />
		<el-table-column prop="pic" label="PIC" width="150" />
		<el-table-column prop="targetQuarter" label="Target Q" width="60" />
		<el-table-column prop="date" label="Date" width="100" />
		<el-table-column prop="remark" label="Remark" width="150" />
		<el-table-column prop="budget" label="Budget" width="150" />
		<el-table-column label="Cost" width="200">
			<template #default="{ row }">
				{{ numberFormat.currencyFormat(row.cost) }}
			</template>
		</el-table-column>
	</el-table>
</template>

<script setup>
// Import data
import allActivities from "@/test/allActivities.json";
import { PopOver } from "@/components";
import { numberFormat } from "@/utils";
const data = allActivities.data;
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
