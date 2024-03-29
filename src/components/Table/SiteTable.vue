<template>
  <section class="overflow-x-auto min-h-[550px]">
    <table v-loading="loading">
      <thead class="bg-gray-100 border-b">
        <tr>
          <th
            v-for="(header, index) in tableHeader"
            :key="header.value"
            class="text-xs font-medium text-gray-600 text-left mx-4 px-4 py-2 relative"
            :class="{
              'w-[10%]': header.value === 'siteID',
              'w-[5%]': header.value === 'No',
              'w-[20%]': header.value !== 'siteID' && header.value !== 'No',
              'bg-gray-200': index % 2 === 0,
            }"
          >
            <div
              v-if="header.value !== 'No'"
              class="flex items-center gap-x-2"
            >
              <div>
                {{ header.label }}
              </div>
              <span class="flex flex-col">
                <button
                  class="el-icon-caret-top -mb-[1px]"
                  :class="{
                    'text-primary':
                      header.value === orderBy && sortBy === 'ASC',
                  }"
                  @click="sortHandler(header, 'ASC')"
                />
                <button
                  class="el-icon-caret-bottom -mt-[1px]"
                  :class="{
                    'text-primary':
                      header.value === orderBy && sortBy === 'DESC',
                  }"
                  @click="sortHandler(header, 'DESC')"
                />
              </span>
            </div>

            <div v-else>
              {{ header.label }}
            </div>
          </th>

          <!-- Action Column -->
          <th
            class="text-xs font-medium text-gray-600 text-left mx-4 px-4 py-2 relative min-w-[150px]"
          >
            Action
          </th>
        </tr>
      </thead>

      <!-- IF EMPTY -->
      <div
        v-if="(!data || data.length === 0) && !loading"
        class="absolute left-1/2"
      >
        <el-empty description="No Data" />
      </div>

      <!-- IF NOT EMPTY -->
      <tbody v-else-if="data && data.length > 0 && !loading">
        <tr
          v-for="(row, index) in data"
          :key="row.siteID"
          class="border-b"
        >
          <!-- Index Number -->
          <td
            class="text-xs p-2 whitespace-nowrap text-gray-900 text-center border-r"
          >
            {{ numberFormat.digitFormat(index + numberStart) }}
          </td>

          <!-- Site ID -->
          <td class="text-xs text-gray-900 p-2 whitespace-nowrap border-r">
            {{ row.siteID }}
          </td>

          <!-- Site Name -->
          <td class="text-xs text-gray-900 p-2 whitespace-nowrap border-r">
            {{ row.siteName }}
          </td>

          <!-- DO -->
          <td class="text-xs text-gray-900 p-2 whitespace-nowrap border-r">
            {{ row.namaDO }}
          </td>

          <!-- NS -->
          <td class="text-xs text-gray-900 p-2 whitespace-nowrap border-r">
            {{ row.namaNS }}
          </td>

          <!-- Kabupaten -->
          <td class="text-xs text-gray-900 p-2 whitespace-nowrap border-r">
            {{ row.namaKabupaten }}
          </td>

          <!-- Action -->
          <td class="text-xs text-gray-900 p-2 whitespace-nowrap">
            <div
              v-if="row.siteID !== 'All'"
              class="flex justify-center gap-x-2"
            >
              <el-tooltip
                class="item"
                effect="dark"
                content="Edit Site"
                placement="top-start"
              >
                <el-button
                  type="warning"
                  icon="el-icon-edit"
                  size="small"
                  circle
                  @click="handleEdit(row, index)"
                />
              </el-tooltip>

              <el-tooltip
                class="item"
                effect="dark"
                content="Delete Site"
                placement="top-start"
              >
                <el-button
                  type="primary"
                  icon="el-icon-delete"
                  size="small"
                  circle
                  @click="handleRemove(row, index)"
                />
              </el-tooltip>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { numberFormat } from "@/utils";

const tableHeader = [
	{
		label: "No",
		value: "No",
	},
	{
		label: "Site ID",
		value: "siteID",
	},
	{
		label: "Site Name",
		value: "siteName",
	},
	{
		label: "NS/Department",
		value: "namaNS",
	},
	{
		label: "DO/Sub-Department",
		value: "namaDO",
	},
	{
		label: "Kabupaten",
		value: "namaKabupaten",
	},
];

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
	loading: {
		type: Boolean,
		default: false,
	},
});

const data = computed(() => props.data);
const numberStart = computed(() => props.numberStart);
const loading = computed(() => props.loading);

const emit = defineEmits(["onSelect", "onUpdate", "onRemove", "onEdit"]);

function handleRemove(row, index) {
	emit("onRemove", { row, index, type: props.type, typeDialog: "delete" });
}

function handleEdit(row, index) {
	emit("onEdit", { row, index });
}

// handle sort
const sortBy = ref("");
const orderBy = ref("");

const sortHandler = (column, value) => {
	if (column.value === orderBy.value && value === sortBy.value) {
		// reset
		sortBy.value = "";
		orderBy.value = "";

		emit("onSort", null);
	} else {
		sortBy.value = value;
		orderBy.value = column.value;

		emit("onSort", { orderBy: orderBy.value, sortBy: sortBy.value });
	}
};
</script>
