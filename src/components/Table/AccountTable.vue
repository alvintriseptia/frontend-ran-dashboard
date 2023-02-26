<template>
  <section class="overflow-x-auto min-h-[400px]">
    <table v-loading="loading">
      <thead class="bg-gray-100 border-b">
        <tr>
          <th
            v-for="(header, index) in tableHeader"
            :key="header.value"
            class="text-sm font-medium text-gray-600 text-left mx-4 px-4 py-2 relative"
            :class="{
              'w-[40%]': header.value !== 'No' && header.value !== 'active',
              'w-[20%]': header.value === 'active',
              'w-[5%]': header.value === 'No',
              'bg-gray-200': index % 2 === 0,
            }"
          >
            {{ header.label }}
          </th>

          <!-- Action Column -->
          <th
            class="text-sm font-medium text-gray-600 text-left mx-4 px-4 py-2 relative min-w-[150px] bg-gray-200"
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
          :key="row.username"
          class="border-b"
        >
          <!-- Index Number -->
          <td
            class="text-sm p-2 whitespace-nowrap text-gray-900 text-center border-r"
          >
            {{ numberFormat.digitFormat(index + 1) }}
          </td>

          <!-- Username -->
          <td class="text-sm text-gray-900 p-2 whitespace-nowrap border-r">
            {{ row.username }}
          </td>

          <!-- NS -->
          <td class="text-sm text-gray-900 p-2 whitespace-nowrap border-r">
            {{ row.namaNS }}
          </td>

          <!-- Is Active -->
          <td class="text-sm text-gray-900 p-2 whitespace-nowrap border-r">
            <PopOverAccount
              v-if="convertUtil.toBoolean(row.admin) === false"
              :active="row.active"
              @onUpdate="(result) => handleActive(row, result)"
            />
          </td>

          <!-- Action -->
          <td class="text-sm text-gray-900 p-2 whitespace-nowrap">
            <div
              v-if="convertUtil.toBoolean(row.admin) === false"
              class="flex justify-center gap-x-2"
            >
              <el-tooltip
                class="item"
                effect="dark"
                content="Edit Account"
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
                content="Reset Password"
                placement="top-start"
              >
                <el-button
                  type="primary"
                  icon="el-icon-key"
                  size="small"
                  circle
                  @click="handleReset(row, index)"
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
import { computed, watch } from "vue";
import { numberFormat, convertUtil } from "@/utils";
import { useFetch } from "@/composables";
import { PopOverAccount } from "@/components";
import { Notification } from "element-ui";

const tableHeader = [
	{
		label: "No",
		value: "No",
	},
	{
		label: "Username",
		value: "username",
	},
	{
		label: "NS/Department",
		value: "namaNS",
	},
	{
		label: "Status",
		value: "active",
	},
];

const props = defineProps({
	data: {
		type: Array,
		default: () => [],
	},
	loading: {
		type: Boolean,
		default: false,
	},
});

const data = computed(() => props.data);
const loading = computed(() => props.loading);

const emit = defineEmits(["onSelect", "onUpdate", "onRemove", "onEdit"]);

function handleReset(row, index) {
	emit("onReset", { row, index, type: "reset" });
}

function handleEdit(row, index) {
	emit("onEdit", { row, index, type: "edit" });
}

function handleActive(row) {
	const body = new FormData();
	const active = convertUtil.toBoolean(row.active) === true ? 0 : 1;
	body.append("active", active);

	const { data, status, message } = useFetch({
		url: "/api/auth/user/change-status/" + row.username,
		method: "PUT",
		body,
	});

	const unwatch = watch(
		[data, status, message],
		([newData, newStatus, newMessage]) => {
			if (newStatus === "success" && newData) {
				row.active = active.toString();

				Notification.success({
					title: "Success",
					message: newData,
				});

				unwatch();
			} else if (newStatus === "error" && newMessage) {
				Notification.error({
					title: "Error",
					message: newMessage,
				});

				unwatch();
			}
		}
	);
}
</script>
