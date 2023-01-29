<script setup>
import { ProjectTable, SearchSelect, Card } from "@/components";
import { dateUtil } from "@/utils";
import { ref } from "vue";

const totalWeeks = dateUtil.getTotalWeeks();
const currentWeek = dateUtil.getWeekInYear();
const weekHighlighted = ref(currentWeek);

const updateWeekHighlighted = (value) => {
	const week = value.split(":")[1];
	weekHighlighted.value = parseInt(week);
};
</script>

<template>
	<Card title="Project Planner">
		<section class="flex gap-x-4 mb-4 items-center">
			<SearchSelect
				placeholder="Select Week"
				:options="
					Array.from({ length: totalWeeks }, (_, i) => {
						return {
							label: `Week ${i + 1}`,
							value: i + 1,
						};
					})
				"
				:isMultiple="false"
				@onUpdate="updateWeekHighlighted"
			/>
			<div class="flex items-center gap-x-2">
				<div class="w-4 h-4 bg-purple-300"></div>
				<span class="text-gray-900">Actual Start</span>
			</div>
			<div class="flex items-center gap-x-2">
				<div class="w-4 h-4 bg-purple-100"></div>
				<span class="text-gray-900">Plan Duration</span>
			</div>
			<div class="flex items-center gap-x-2">
				<div class="w-4 h-4 bg-yellow-300"></div>
				<span class="text-gray-900">Week Highlight</span>
			</div>
		</section>
		<ProjectTable :weekHighlighted="weekHighlighted" />
		<section class="mt-4">
			<el-pagination
				:page-size="10"
				:pager-count="11"
				layout="prev, pager, next"
				:total="50"
			>
			</el-pagination>
		</section>
	</Card>
</template>
