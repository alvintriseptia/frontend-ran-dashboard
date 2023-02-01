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
			<div
				class="flex items-center gap-x-2"
				v-for="item in dataLabel"
				:key="item.label"
			>
				<div class="w-4 h-4" :class="item.color"></div>
				<span class="text-gray-900">{{ item.label }}</span>
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

<script setup>
import { ProjectTable, SearchSelect, Card } from "@/components";
import { dateUtil } from "@/utils";
import { ref } from "vue";

// total weeks in a year
const totalWeeks = dateUtil.getTotalWeeks();

// current week in a year
const currentWeek = dateUtil.getWeekInYear();
const weekHighlighted = ref(currentWeek);

// update week highlighted, when user select week
// because the default value has been "week:1"
const updateWeekHighlighted = (value) => {
	const week = value.split(":")[1];
	weekHighlighted.value = parseInt(week);
};

const dataLabel = [
	{
		label: "Week Highlight",
		color: "bg-yellow-300",
	},
	{
		label: "Plan Duration",
		color: "bg-purple-100",
	},
	{
		label: "Actual Start",
		color: "bg-purple-300",
	},
	{
		label: "Actual Complete",
		color: "bg-purple-600",
	},
	{
		label: "Beyond Plan Start",
		color: "bg-orange-300",
	},
	{
		label: "Beyond Plan Complete",
		color: "bg-orange-600",
	},
];
</script>
