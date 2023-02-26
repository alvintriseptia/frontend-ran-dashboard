<!-- eslint-disable vue/no-v-html -->
<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :header-cell-style="{
      background: colorsTheme.lightGray,
      padding: '8px',
    }"
    :cell-class-name="cellClassChecker"
    row-class-name="no-hover-table"
    size="mini"
    nowrap="nowrap"
  >
    <el-table-column
      v-for="(item, index) in tableStructure"
      :key="index"
      :min-width="item == 'title' ? '320' : '100'"
    >
      <template #header>
        <div class="text-center ">
          {{ convertLabel(item) }}
        </div>
      </template>
      <template #default="{ row }">
        <div
          v-if="item === 'title'"
          v-html="row[item]"
        />
        <div
          v-else
          class="relative text-center"
        >
          <div class="absolute h-full w-full bg-green-100 px-4" />
          <div
            :style="{
              position: 'absolute',
              zIndex: 10,
              height: '100%',
              width: `${(row[item].done / (row[item].notYet + row[item].done)) * 100}%`,
              
            }"
            class="bg-green-300"
          />
          <span class="relative z-10 text-gray-900">
            {{
              typeof row[item] === "object"
                ? row[item].done + row[item].notYet !== 0
                  ? `${row[item].done} / ${row[item].notYet + row[item].done}`
                  : ""
                : row[item]
            }}
          </span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
// Import data
import { colorsTheme, stringUtil } from "@/utils";
import { computed } from "vue";

// Data
const props = defineProps({
	data: {
		type: Object,
		default: () => ({
			tableStructure: [],
			tableData: [],
		}),
	},
});

const tableStructure = computed(() => {
	if (props.data) {
		return props.data.tableStructure;
	}else {
		return [];
	}
});
const tableData = computed(() => {
	if (props.data) {
		return props.data.tableData;
	}else {
		return [];
	}
});

// Define Methods
// cellClassChecker will check the current cell to be highlighted
function cellClassChecker({ row }) {
	if (row.title == "Grand Total") {
		return "p-0 text-gray-900 font-medium";
	}
	return "p-0 text-gray-900";
}

function convertLabel(title) {
	if (title === "title") {
		return "Activity";
	} else if (title === "grandTotal") {
		return "Grand Total";
	}
	return stringUtil.toCapitalize(title);
}
</script>
