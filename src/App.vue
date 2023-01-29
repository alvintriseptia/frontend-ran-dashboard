<template>
	<el-row>
		<el-col :span="3">
			<Sidebar />
			<div class="text-transparent">1</div>
		</el-col>
		<el-col :span="21" class="px-4 my-2">
			<h1 class="text-3xl font-bold mb-8">
				Dashboard Squad Operation & Availability 2023
			</h1>
			<router-view> </router-view>
		</el-col>
	</el-row>
</template>

<script setup>
import { Sidebar } from "./components";
</script>
