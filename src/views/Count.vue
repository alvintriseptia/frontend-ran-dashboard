<template>
	<div class="flex flex-col gap-y-4 justify-center items-center h-screen">
		{{ counterStore }}
		<div class="flex gap-x-4">
			<Button v-on:onClick="counterStore.decrement">Count Down</Button>
			<Button v-on:onClick="counterStore.increment">Count up</Button>
		</div>

		<router-link class="text-blue-500" to="/"> Back to Home </router-link>
	</div>
</template>

<script setup>
import { Button } from "@/components";
import { useCounterStore } from "@/stores";

const counterStore = useCounterStore();
</script>
