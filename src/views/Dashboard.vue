<script setup>
import { ProgramChart, Card, ActivityItem } from "@/components";
import programs from "@/test/programs.json";
import activites from "@/test/activities.json";

const programData = programs.data;
const activityData = activites.data;
</script>

<template>
	<div class="container mx-auto px-4 py-2">
		<h1 class="text-3xl font-bold mb-4">
			Dashboard Squad Operation & Availability 2023
		</h1>
		<div class="grid grid-cols-12 gap-8">
			<Card title="Programs Summary" class="col-span-12 lg:col-span-9">
				<div class="flex flex-wrap gap-6">
					<ProgramChart
						v-for="item in programData"
						:key="item.id"
						:chart-id="item.id"
						:programName="item.programName"
						:doneActivity="item.doneActivity"
						:notYetActivity="item.totalActivity - item.doneActivity"
					/>
				</div>
			</Card>
			<Card
				title="Weekly Log Activites"
				subtitle="Week 6"
				class="col-span-12 lg:col-span-3"
				maxHeight="calc(100vh - 4rem - 2.5rem - 2.5rem - 2.5rem)"
			>
				<ActivityItem
					v-for="(item, index) in activityData"
					:key="item.id"
					:program="item.program"
					:subProgram="item.subProgram"
					:siteId="item.siteId"
					:subDept="item.subDept"
					:isDone="item.isDone"
					:activity="item.activity"
					:isLastItem="index === activityData.length - 1"
				/>
			</Card>
		</div>
	</div>
</template>
