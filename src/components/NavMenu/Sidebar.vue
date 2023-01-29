<script setup>
import { ref } from "vue";
import { colorsTheme } from "@/utils";
import { useWindow, useRoute } from "@/composables";
import telkomsel from "@/assets/images/telkomsel.png";
import telkomselLogo from "@/assets/images/telkomsel-logo.png";

const { isMobile } = useWindow();

const isCollapse = ref(false);

const handleCollapse = () => {
	if (isMobile.value) {
		isCollapse.value = !isCollapse.value;
	}
};

const { path } = useRoute();
</script>

<template>
	<el-menu
		class="font-medium fixed top-0 left-0 z-50"
		:class="{ 'right-0 w-full': isMobile, 'bottom-0': !isMobile }"
		:default-active="
			path.includes('/project-planner')
				? '2'
				: path.includes('/activities')
				? '3'
				: '1'
		"
		:collapse="!isMobile ? false : isCollapse"
		:active-text-color="colorsTheme.primary"
	>
		<el-menu-item
			index="0"
			class="flex justify-center items-center transition-none"
		>
			<button @click="handleCollapse">
				<img
					:src="isCollapse ? telkomselLogo : telkomsel"
					alt="telkomsel"
					:class="
						isCollapse
							? 'w-[100px] h-[40px] object-contain'
							: 'w-[140px] h-[80px] object-contain'
					"
				/>
			</button>
		</el-menu-item>
		<div v-if="!isMobile ? true : !isCollapse">
			<el-menu-item index="1">
				<router-link to="/">
					<div>
						<i class="el-icon-menu"></i>
						<span slot="title"> Dashboard </span>
					</div>
				</router-link>
			</el-menu-item>
			<el-menu-item index="2">
				<router-link to="/project-planner">
					<div>
						<i class="el-icon-document"></i>
						<span slot="title"> Project Planner </span>
					</div>
				</router-link>
			</el-menu-item>
			<el-menu-item index="3">
				<router-link to="/activities">
					<div>
						<i class="el-icon-reading"></i>
						<span slot="title"> Activities </span>
					</div>
				</router-link>
			</el-menu-item>
		</div>
	</el-menu>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 400px;
}
</style>
