<template>
	<el-menu
		class="font-medium fixed top-0 left-0 z-50"
		:class="{ 'right-0 w-full': isMobile, 'bottom-0': !isMobile }"
		:default-active="getDefaultActiveIndex(path)"
		:collapse="!isMobile ? false : isCollapse"
		:active-text-color="colorsTheme.primary"
	>
		<div class="flex justify-between" :class="isMobile ? '' : 'flex-col'">
			<el-menu-item
				index="0"
				class="flex transition-none"
				:class="isMobile ? '' : 'justify-center items-center'"
			>
				<button @click="handleCollapse">
					<img
						:src="isMobile ? telkomselLogo : telkomsel"
						alt="telkomsel"
						:class="
							isMobile
								? 'w-[70px] h-[40px] object-contain'
								: 'w-[140px] h-[80px] object-contain'
						"
					/>
				</button>
			</el-menu-item>
			<el-menu-item class="flex pointer-events-none">
				<div>
					<i class="el-icon-user" />
					<span class="text-sm text-gray-500">{{
						userStore.getters.user.username
					}}</span>
				</div>
			</el-menu-item>
		</div>
		<div v-if="!isMobile ? true : !isCollapse">
			<el-menu-item index="1">
				<router-link :to="navLinks.dashboard">
					<div @click="isCollapse = !isCollapse">
						<i class="el-icon-menu" />
						<span slot="title"> Dashboard </span>
					</div>
				</router-link>
			</el-menu-item>
			<el-menu-item index="2">
				<router-link :to="navLinks.project_planner">
					<div @click="isCollapse = !isCollapse">
						<i class="el-icon-s-data" />
						<span slot="title"> Project Planner </span>
					</div>
				</router-link>
			</el-menu-item>
			<el-menu-item index="3">
				<router-link :to="navLinks.plan_activities">
					<div @click="isCollapse = !isCollapse">
						<i class="el-icon-reading" />
						<span slot="title"> Plan Activities </span>
					</div>
				</router-link>
			</el-menu-item>
			<el-menu-item v-if="userStore.getters.role === 'admin'" index="4">
				<router-link :to="navLinks.sites">
					<div @click="isCollapse = !isCollapse">
						<i class="el-icon-place" />
						<span slot="title"> Sites </span>
					</div>
				</router-link>
			</el-menu-item>
			<el-menu-item v-if="userStore.getters.role === 'admin'" index="5">
				<router-link :to="navLinks.accounts">
					<div @click="isCollapse = !isCollapse">
						<i class="el-icon-setting" />
						<span slot="title"> Accounts </span>
					</div>
				</router-link>
			</el-menu-item>
			<el-menu-item index="6">
				<a :href="navLinks.manual_guide" target="_blank">
					<div @click="isCollapse = !isCollapse">
						<i class="el-icon-document" />
						<span slot="title"> Manual Guide </span>
					</div>
				</a>
			</el-menu-item>
			<hr />
			<el-menu-item index="7">
				<div>
					<button @click="userStore.dispatch('logout')">
						<i class="el-icon-d-arrow-left" />
						<span slot="title"> Logout </span>
					</button>
				</div>
			</el-menu-item>
		</div>
	</el-menu>
</template>
<script setup>
import { ref } from "vue";
import { colorsTheme } from "@/utils";
import { useWindow, useRoute } from "@/composables";
import { userStore } from "@/stores";
import telkomsel from "@/assets/images/telkomsel.png";
import telkomselLogo from "@/assets/images/telkomsel-logo.png";

const { isMobile } = useWindow();

const navLinks = {
	dashboard: "/",
	project_planner: "/project-planner",
	plan_activities: "/plan-activities",
	sites: "/sites",
	accounts: "/accounts",
	manual_guide: "http://docs.ran.telkomsel",
};

const isCollapse = ref(true);

const handleCollapse = () => {
	if (isMobile.value) {
		isCollapse.value = !isCollapse.value;
	}
};

function getDefaultActiveIndex(currentPath) {
	if (currentPath.includes(navLinks.project_planner)) {
		return "2";
	} else if (currentPath.includes(navLinks.plan_activities)) {
		return "3";
	} else if (currentPath.includes(navLinks.sites)) {
		return "4";
	} else if (currentPath.includes(navLinks.accounts)) {
		return "5";
	}
	return "1";
}
const { path } = useRoute();
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 400px;
}
</style>
