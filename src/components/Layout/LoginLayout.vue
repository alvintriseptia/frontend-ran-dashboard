<template>
	<section class="grid grid-cols-12 h-screen overflow-y-hidden">
		<div class="hidden lg:block lg:col-span-7 xl:col-span-8 relative">
			<div class="w-full h-full bg-black bg-opacity-20 absolute z-10" />
			<img
				:src="telkomselBackground"
				alt="telkomsel-background"
				class="w-full h-full object-cover"
			/>
		</div>
		<div class="col-span-12 lg:col-span-5 xl:col-span-4 flex flex-col">
			<a :href="manualGuideLink" target="_blank" class="ml-auto mt-4 mr-4">
				<el-button icon="el-icon-document" type="primary">
					Manual Guide
				</el-button>
			</a>
			<div class="flex justify-center items-center flex-1">
				<slot />
			</div>
		</div>
	</section>
</template>

<script setup>
import telkomselBackground from "@/assets/images/telkomsel-background.jpg";

const manualGuideLink = "http://docs.ran.telkomsel";
</script>
