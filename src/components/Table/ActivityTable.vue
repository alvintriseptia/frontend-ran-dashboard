<template>
	<el-table
		:data="data"
		style="width: 100%"
		:header-cell-style="{
			textAlign: 'center',
			background: colorsTheme.lightGray,
			padding: '0px',
		}"
	>
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
		<el-table-column prop="targetQuarterStart" label="Start Q" width="60" />
		<el-table-column prop="targetQuarterEnd" label="End Q" width="60" />
		<el-table-column prop="date" label="Date" width="100" />
		<el-table-column prop="remark" label="Remark" width="150" />
		<el-table-column prop="budget" label="Budget" width="150" />
		<el-table-column prop="cost" label="Cost" width="200" />
	</el-table>
</template>

<script setup>
import allActivities from "@/test/allActivities.json";
import { colorsTheme } from "@/utils";
import { PopOver } from "@/components";

const data = allActivities.data;
</script>
