<script setup>
import { useCounterStore } from "@/stores";

const counterStore = useCounterStore();
</script>

<template>
	<div class="flex flex-col gap-y-4 justify-center items-center h-screen">
		{{ counterStore }}

		<router-link class="text-blue-500" to="/"> Back to Home </router-link>
	</div>
</template>
