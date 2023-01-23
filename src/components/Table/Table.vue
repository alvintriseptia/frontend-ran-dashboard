<template>
	<div v-if="error">
		<p class="text-center">Error: {{ error }}</p>
	</div>
	<div v-else-if="loading">
		<p class="text-center">Loading...</p>
	</div>
	<el-table :data="data" style="width: 100%" v-else-if="data">
		<el-table-column prop="id" label="ID" width="180" />
		<el-table-column prop="title" label="Title" width="180" />
		<el-table-column prop="completed" label="Completed" />
	</el-table>
	<div v-else>
		<p class="text-center">No data</p>
	</div>
</template>

<script setup>
import { useFetch } from "@/composables";
const { data, error, loading } = useFetch("/api/todos");
</script>
