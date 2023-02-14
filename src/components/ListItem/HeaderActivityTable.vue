<template>
	<div>
		{{ props.column.label }}

		<span class="caret-wrapper">
			<i class="sort-caret ascending"></i><i class="sort-caret descending"></i>
		</span>

		<span class="el-table__column-filter-trigger">
			<i class="el-icon-arrow-down"></i>
		</span>
	</div>
</template>

<script setup>
const props = defineProps({
	column: {
		type: Object,
		required: true,
	},
	$index: {
		type: Number,
		required: true,
	},
});
</script>

<style></style>
