<template>
	<section class="grid grid-cols-12 min-h-screen">
		<div class="hidden lg:block lg:col-span-7 xl:col-span-8 relative">
			<div class="w-full h-full bg-black bg-opacity-20 absolute z-10" />
			<img
				:src="telkomselBackground"
				alt="telkomsel-background"
				class="w-full h-full object-cover"
			/>
		</div>
		<div class="col-span-12 lg:col-span-5 xl:col-span-4 flex flex-col">
			<el-button type="primary" class="ml-auto mt-4 mr-4 relative z-40">
				Manual Guide
			</el-button>
			<div class="flex justify-center items-center flex-1">
				<ResetForm />
			</div>
		</div>
	</section>
</template>

<script setup>
import { ResetForm } from "@/components";
import telkomselBackground from "@/assets/images/telkomsel-background.jpg";
</script>
