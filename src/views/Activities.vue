<script setup>
import { OutlinedButton, SearchSelect, ActivityTable } from "@/components";
import activitiesJson from "@/test/activities.json";

let activities = new Set(activitiesJson.data.map((item) => item.activity));

activities = Array.from(activities).map((item) => {
	return { value: item, label: item };
});
</script>

<template>
	<div>
		<h2 class="text-xl lg:text-2xl font-bold mb-4">Activites</h2>
		<section class="flex gap-x-4 mb-6 justify-between">
			<SearchSelect :options="activities" placeholder="Cari activities" />
			<div class="flex gap-x-4">
				<OutlinedButton>Input Activity</OutlinedButton>
				<OutlinedButton>Import Activities</OutlinedButton>
			</div>
		</section>
		<ActivityTable />
	</div>
</template>
