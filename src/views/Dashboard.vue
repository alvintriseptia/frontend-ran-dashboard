<script setup>
import { ProgramChart, Card } from "@/components";
import programs from "@/test/programs.json";

const programData = programs.data;
</script>

<template>
	<div class="container mx-auto px-4 py-2">
		<h1 class="text-3xl font-bold mb-4">
			Dashboard Squad Operation & Availability 2023
		</h1>
		<Card title="Programs Summary">
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
	</div>
</template>
