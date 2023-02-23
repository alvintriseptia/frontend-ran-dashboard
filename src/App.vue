<template>
	<el-row :class="{ 'mt-10': isMobile }">
		<el-col v-if="userStore.getters.isLoggedIn" :span="isMobile ? 24 : 3">
			<Sidebar />
			<div class="text-transparent">1</div>
		</el-col>
		<el-col
			:span="isMobile || !userStore.getters.isLoggedIn ? 24 : 21"
			class="md:px-4 my-2 overflow-x-hidden"
		>
			<h1 class="text-3xl font-bold mb-8 text-center md:text-left">
				Dashboard Squad Operation & Availability 2023
			</h1>
			<div class="h-full" v-if="userStore.getters.loading">
				<LoadingSpinner />
			</div>
			<router-view> </router-view>
		</el-col>
	</el-row>
</template>

<script setup>
import { Sidebar, LoadingSpinner } from "@/components";
import { useWindow } from "@/composables";
import { userStore } from "@/stores";

const { isMobile } = useWindow();
</script>
