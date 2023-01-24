<template>
	<div class="flex flex-col gap-y-4 justify-center items-center h-screen">
		{{ counterStore }}
		<Button @click="counterStore.increment">Count up</Button>

		<router-link class="text-blue-500" to="/"> Back to Home </router-link>
	</div>
</template>

<script setup>
import { Button } from "@/components";
import { useCounterStore } from "@/stores";

const counterStore = useCounterStore();
</script>
