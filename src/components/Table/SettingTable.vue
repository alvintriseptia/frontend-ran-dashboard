<template>
	<el-table
		ref="multipleTable"
		:data="data"
		:style="{ width: '100%', overflow: 'auto' }"
		header-cell-class-name="header-color-activity"
		@selection-change="handleSelectionChange"
	>
		<el-table-column type="selection" />
		<el-table-column label="No" width="59">
			<template #default="{ row, $index }">
				<p class="text-center">
					{{ numberStart + $index }}
				</p>
			</template>
		</el-table-column>

		<!-- NS Column -->
		<el-table-column
			prop="namaNS"
			label="NS"
			min-width="180"
			v-if="type === 'ns'"
		/>

		<!-- DO Column -->
		<el-table-column
			prop="namaDO"
			label="DO"
			min-width="180"
			v-if="type === 'do'"
		/>

		<!-- Site Column -->
		<el-table-column
			prop="id"
			label="Site ID"
			min-width="180"
			v-if="type === 'site'"
		/>
		<el-table-column
			prop="name"
			label="Site Name"
			min-width="180"
			v-if="type === 'site'"
		/>
		<el-table-column
			prop="namaNS"
			label="NS/Department"
			min-width="180"
			v-if="type === 'site'"
		/>
		<el-table-column
			prop="namaDO"
			label="DO/Sup-Department"
			min-width="180"
			v-if="type === 'site'"
		/>
		<el-table-column
			prop="namaKabupaten"
			label="Kabupaten"
			min-width="180"
			v-if="type === 'site'"
		/>

		<!-- Action -->
		<el-table-column
			label="Action"
			min-width="200"
			:width="type === 'site' ? 'auto' : '100'"
		>
			<template #default="{ row, $index }">
				<div class="flex justify-center gap-x-2">
					<!-- If type is NS or DO -->
					<PopOverInput
						v-if="type === 'ns' || type === 'do'"
						:text="type === 'ns' ? row.namaNS : row.namaDO"
						@onUpdate="(status) => handleStatusUpdate(row, status)"
					/>
					<!-- If type is Site -->
					<el-button
						v-else-if="type === 'site'"
						@click="handleEdit(row, $index)"
						type="warning"
						icon="el-icon-edit"
						circle
					></el-button>

					<el-button
						@click="handleRemove(row, $index)"
						type="primary"
						icon="el-icon-delete"
						circle
					></el-button>
				</div>
			</template>
		</el-table-column>
	</el-table>
</template>

<script setup>
import { ref, computed } from "vue";
import { PopOverInput } from "@/components";

const props = defineProps({
	data: {
		type: Array,
		default: () => [],
	},
	numberStart: {
		type: Number,
		default: 1,
	},
	type: {
		type: String,
		default: "site",
	},
});

const data = computed(() => props.data);
const numberStart = computed(() => props.numberStart);

const emit = defineEmits(["onUpdate", "onRemove", "onEdit"]);
const multipleSelection = ref([]);
const multipleTable = ref(null);

function handleSelectionChange(val) {
	multipleSelection.value = val;
	emit("onUpdate", {
		multipleSelection: multipleSelection.value,
		type: props.type,
	});
}

function handleRemove(row, index) {
	console.log(row);
	emit("onRemove", { row, index });
}

function handleEdit(row, index) {
	emit("onEdit", { row, index });
}
</script>
