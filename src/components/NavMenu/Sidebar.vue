<template>
	<el-menu
		class="font-medium fixed top-0 bottom-0 z-50"
		:default-active="initialIndex"
		:collapse="isCollapse"
		@open="handleOpen"
		@close="handleClose"
		:active-text-color="colorsTheme.primary"
		:mode="isCollapse ? 'horizontal' : 'vertical'"
	>
		<el-menu-item index="0" class="mt-4 flex justify-center items-center">
			<img
				:src="isCollapse ? telkomselLogo : telkomsel"
				alt="telkomsel"
				:class="isCollapse ? 'w-[100px] object-cover' : 'w-[140px]'"
			/>
		</el-menu-item>
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
	</el-menu>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 400px;
}
</style>

<script setup>
import { onMounted, ref } from "vue";
import { colorsTheme } from "@/utils";
import telkomsel from "@/assets/images/telkomsel.png";
import telkomselLogo from "@/assets/images/telkomsel-logo.png";

let initialIndex = "0";
if (window.location.pathname === "/") {
	initialIndex = "1";
} else if (window.location.pathname === "/project-planner") {
	initialIndex = "2";
} else if (window.location.pathname === "/activities") {
	initialIndex = "3";
}

const isCollapse = ref(false);

const handleOpen = (key, keyPath) => {
	console.log(key, keyPath);
};

const handleClose = (key, keyPath) => {
	console.log(key, keyPath);
};

// if window is smaller than 768px, collapse sidebar
// if window is larger than 768px, expand sidebar
onMounted(() => {
	window.addEventListener("resize", () => {
		if (window.innerWidth < 1024) {
			isCollapse.value = true;
		} else {
			isCollapse.value = false;
		}
	});
});
</script>
