<script setup>
import { ProjectTable, SearchSelect } from "@/components";
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
	<div>
		<section class="flex gap-x-4 mb-4 items-center">
			<SearchSelect
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
			{{ weekHighlighted }}
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
		<h2 class="text-xl lg:text-2xl font-bold mb-4">Project Planner</h2>
		<ProjectTable :weekHighlighted="weekHighlighted" />
	</div>
</template>
