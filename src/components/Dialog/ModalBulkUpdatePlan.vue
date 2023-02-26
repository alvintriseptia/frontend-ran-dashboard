<template>
  <el-dialog
    :title="`There are ${data.length} plan activities need to be updated`"
    :visible.sync="isModalVisible"
    :fullscreen="true"
    :close-on-click-modal="false"
    :show-close="false"
    :close-on-press-escape="false"
    @close="onCancel"
    @closed="() => {}"
  >
    <section class="my-4 flex justify-between items-center">
      <div class="flex items-center gap-x-2">
        <el-input
          v-model="searchActivity"
          class="max-w-[250px] mr-4"
          placeholder="Search an Activity or Site"
          clearable
          @input="handleSearchActivity"
        />

        <el-button
          icon="el-icon-success"
          size="mini"
          type="success"
          @click="selectAllPlanActivity"
        >
          Select All
        </el-button>
        <el-button
          icon="el-icon-remove"
          size="mini"
          type="danger"
          @click="resetPlanActivityChecked"
        >
          Reset Checkbox
        </el-button>
      </div>

      <div class="flex items-center ml-auto">
        <p class="text-xs mr-2">
          Rows per page
        </p>
        <div class="max-w-[80px]">
          <Select
            :options="limits"
            placeholder="Rows per page"
            default-value="50"
            @onChange="handleLimitChange"
          />
        </div>
        <el-pagination
          ref="pagination"
          :page-size="limitData"
          :pager-count="5"
          layout="prev, pager, next"
          :total="searchData.length !== 0 ? searchData.length : data.length"
          @current-change="handleCurrentChange"
        />
      </div>
    </section>
    <section class="overflow-auto">
      <table
        ref="updateActivityTable"
        class="table-fixed"
        :class="{
          'min-h-[300px]': searchActivity.length >= 2 && searchData.length === 0,
        }"
      >
        <thead class="bg-gray-100 border-b">
          <tr>
            <th
              v-for="(header, index) in tableHeader"
              :key="header.value"
              class="text-xs font-medium text-gray-600 text-left mx-4 px-4 py-2 relative"
              :class="{
                'min-w-[50px]': header.value === 'no',
                'min-w-[50px] sticky left-0 bg-white z-10':
                  header.value === 'checkbox',
                'min-w-[250px]': header.value === 'deskripsiActivity',
                'min-w-[150px]':
                  header.value !== 'deskripsiActivity' &&
                  header.value !== 'no' &&
                  header.value !== 'checkbox',
                'bg-gray-200': index % 2 === 0,
              }"
            >
              {{ header.label }}
            </th>
          </tr>
        </thead>

        <div
          v-if="searchActivity.length >= 2 && searchData.length === 0"
          class="absolute left-1/2 "
        >
          <el-empty description="No Data" />
        </div>

        <tbody v-else>
          <tr
            v-for="(row, index) in paginationData"
            :key="row.oldData.activityID + row.oldData.siteID"
            class="border-b"
          >
            <!-- Checkbox -->
            <td
              class="p-2 text-gray-900 flex justify-center items-center h-11 border-r sticky left-0 bg-white"
            >
              <input
                :name="
                  'checkbox_update' +
                    '-' +
                    row.oldData.activityID +
                    '-' +
                    row.oldData.siteID
                "
                type="checkbox"
                class="w-3 h-3 bg-gray-100 border-gray-300 rounded accent-primary checkbox_update_activity cursor-pointer"
                :checked="
                  planActivityChecked.find(
                    (item) =>
                      item.activityId === row.oldData.activityID &&
                      item.siteId === row.oldData.siteID
                  )
                "
                @change="handlePlanActivityChecked(row)"
              >
            </td>
            <!-- Index Number -->
            <td
              class="text-xs p-2 whitespace-nowrap text-gray-900 text-center border-r"
            >
              {{ numberFormat.digitFormat(indexStart + 1 + index) }}
            </td>

            <!-- Deskripsi Activity -->
            <td class="text-xs text-gray-900 p-2 whitespace-nowrap border-r">
              {{ row.oldData.deskripsiActivity }}
            </td>

            <!-- Site ID -->
            <td class="text-xs text-gray-900 p-2 whitespace-nowrap border-r">
              {{ row.oldData.siteID }}
            </td>

            <!-- Site Name -->
            <td class="text-xs text-gray-900 p-2 whitespace-nowrap border-r">
              {{ row.oldData.siteName }}
            </td>

            <!-- Status -->
            <td
              v-if="row.newData.status !== row.oldData.status"
              class="text-xs text-gray-900 p-2 whitespace-nowrap text-center border-r bg-green-100"
            >
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
              >
                <p class="text-sm font-medium mb-1">
                  Old Data
                </p>
                <hr>
                <p class="text-xs text-gray-800 mt-1">
                  {{ row.oldData.status }}
                </p>
                <el-tag
                  slot="reference"
                  size="small"
                  :type="row.newData.status === 'Done' ? 'success' : 'warning'"
                >
                  {{ row.newData.status }}
                </el-tag>
              </el-popover>
            </td>
            <td
              v-else-if="row.newData.status === row.oldData.status"
              class="text-xs text-gray-900 p-2 whitespace-nowrap text-center border-r"
            >
              <el-tag
                size="small"
                :type="row.oldData.status === 'Done' ? 'success' : 'warning'"
              >
                {{ row.oldData.status }}
              </el-tag>
            </td>

            <!-- Updated By -->
            <td
              v-if="row.newData.updatedBy !== row.oldData.updatedBy"
              class="text-xs text-gray-900 p-2 whitespace-nowrap text-center border-r bg-green-100"
            >
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
              >
                <p class="text-sm font-medium mb-1">
                  Old Data
                </p>
                <hr>
                <p class="text-xs text-gray-800 mt-1">
                  {{ row.oldData.updatedBy }}
                </p>
                <div slot="reference">
                  {{ row.newData.updatedBy || "-" }}
                </div>
              </el-popover>
            </td>
            <td
              v-else-if="row.newData.updatedBy === row.oldData.updatedBy"
              class="text-xs text-gray-900 p-2 whitespace-nowrap text-center border-r"
            >
              {{ row.oldData.updatedBy }}
            </td>

            <!-- Week Executed -->
            <td
              v-if="row.newData.weekExecuted !== row.oldData.weekExecuted"
              class="text-xs text-gray-900 p-2 whitespace-nowrap text-center border-r bg-green-100"
            >
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
              >
                <p class="text-sm font-medium mb-1">
                  Old Data
                </p>
                <hr>
                <p class="text-xs text-gray-800 mt-1">
                  {{ row.oldData.weekExecuted }}
                </p>
                <div slot="reference">
                  {{ row.newData.weekExecuted || "-" }}
                </div>
              </el-popover>
            </td>

            <td
              v-else-if="row.newData.weekExecuted === row.oldData.weekExecuted"
              class="text-xs text-gray-900 p-2 whitespace-nowrap text-center border-r"
            >
              {{ row.oldData.weekExecuted }}
            </td>

            <!-- Date Executed -->
            <td
              v-if="row.newData.dateExecuted !== row.oldData.dateExecuted"
              class="text-xs text-gray-900 p-2 whitespace-nowrap text-center border-r bg-green-100"
            >
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
              >
                <p class="text-sm font-medium mb-1">
                  Old Data
                </p>
                <hr>
                <p class="text-xs text-gray-800 mt-1">
                  {{
                    row.oldData.dateExecuted
                      ? dateUtil.convertDateToMMMDDYY(row.oldData.dateExecuted)
                      : ""
                  }}
                </p>
                <div slot="reference">
                  {{
                    row.newData.dateExecuted
                      ? dateUtil.convertDateToMMMDDYY(row.newData.dateExecuted)
                      : "-"
                  }}
                </div>
              </el-popover>
            </td>
            <td
              v-else-if="row.newData.dateExecuted === row.oldData.dateExecuted"
              class="text-xs text-gray-900 p-2 whitespace-nowrap text-center border-r"
            >
              {{
                row.oldData.dateExecuted
                  ? dateUtil.convertDateToMMMDDYY(row.oldData.dateExecuted)
                  : ""
              }}
            </td>

            <!-- Nama Program -->
            <td
              v-if="row.newData.namaProgram !== row.oldData.namaProgram"
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r bg-green-100"
            >
              <el-popover
                placement="top-start"
                trigger="hover"
                :content="row.oldData.namaProgram"
                popper-class="text-xs"
              >
                <p class="text-sm font-medium mb-1">
                  Old Data
                </p>
                <hr>
                <p class="text-xs text-gray-800 mt-1">
                  {{ row.oldData.namaProgram }}
                </p>

                <div slot="reference">
                  {{ row.newData.namaProgram || "-" }}
                </div>
              </el-popover>
            </td>
            <td
              v-else-if="row.newData.namaProgram === row.oldData.namaProgram"
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r"
            >
              {{ row.oldData.namaProgram }}
            </td>

            <!-- Nama Subprogram -->
            <td
              v-if="row.newData.namaSubprogram !== row.oldData.namaSubprogram"
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r bg-green-100"
            >
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
              >
                <p class="text-sm font-medium mb-1">
                  Old Data
                </p>
                <hr>
                <p class="text-xs text-gray-800 mt-1">
                  {{ row.oldData.namaSubprogram }}
                </p>
                <div slot="reference">
                  {{ row.newData.namaSubprogram || "-" }}
                </div>
              </el-popover>
            </td>

            <td 
              v-else-if="row.newData.namaSubprogram === row.oldData.namaSubprogram"
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r"
            >
              {{ row.oldData.namaSubprogram }}
            </td>

            <!-- Additional Info -->
            <td
              v-if="row.newData.additionalInfo !== row.oldData.additionalInfo"
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r bg-green-100"
            >
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
              >
                <p class="text-sm font-medium mb-1">
                  Old Data
                </p>
                <hr>
                <p class="text-xs text-gray-800 mt-1">
                  {{ row.oldData.additionalInfo }}
                </p>
                <div slot="reference">
                  {{ row.newData.additionalInfo || "-" }}
                </div>
              </el-popover>
            </td>
            <td 
              v-else-if="row.newData.additionalInfo === row.oldData.additionalInfo"
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r"
            >
              {{ row.oldData.additionalInfo }}
            </td>

            <!-- NS -->
            <td
              v-if="row.newData.namaNS !== row.oldData.namaNS"
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r bg-green-100"
            >
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
              >
                <p class="text-sm font-medium mb-1">
                  Old Data
                </p>
                <hr>
                <p class="text-xs text-gray-800 mt-1">
                  {{ row.oldData.namaNS }}
                </p>
                <div slot="reference">
                  {{ row.newData.namaNS || "-" }}
                </div>
              </el-popover>
            </td>
            <td 
              v-else-if="row.newData.namaNS === row.oldData.namaNS"
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r"
            >
              {{ row.oldData.namaNS }}
            </td>

            <!-- DO -->
            <td
              v-if="row.newData.namaDO !== row.oldData.namaDO"
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r bg-green-100"
            >
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
              >
                <p class="text-sm font-medium mb-1">
                  Old Data
                </p>
                <hr>
                <p class="text-xs text-gray-800 mt-1">
                  {{ row.oldData.namaDO }}
                </p>
                <div slot="reference">
                  {{ row.newData.namaDO || "-" }}
                </div>
              </el-popover>
            </td>
            <td 
              v-else-if="row.newData.namaDO === row.oldData.namaDO"
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r"
            >
              {{ row.oldData.namaDO }}
            </td>

            <!-- Kabupaten -->
            <td
              v-if="row.newData.namaKabupaten !== row.oldData.namaKabupaten"
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r bg-green-100"
            >
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
              >
                <p class="text-sm font-medium mb-1">
                  Old Data
                </p>
                <hr>
                <p class="text-xs text-gray-800 mt-1">
                  {{ row.oldData.namaKabupaten }}
                </p>
                <div slot="reference">
                  {{ row.newData.namaKabupaten || "-" }}
                </div>
              </el-popover>
            </td>
            <td 
              v-else-if="row.newData.namaKabupaten === row.oldData.namaKabupaten"
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r"
            >
              {{ row.oldData.namaKabupaten }}
            </td>

            <!-- PIC -->
            <td
              v-if="row.newData.namaPIC !== row.oldData.namaPIC"
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r bg-green-100"
            >
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
              >
                <p class="text-sm font-medium mb-1">
                  Old Data
                </p>
                <hr>
                <p class="text-xs text-gray-800 mt-1">
                  {{ row.oldData.namaPIC }}
                </p>
                <div slot="reference">
                  {{ row.newData.namaPIC || "-" }}
                </div>
              </el-popover>
            </td>
            <td 
              v-else-if="row.newData.namaPIC === row.oldData.namaPIC"
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r"
            >
              {{ row.oldData.namaPIC }}
            </td>

            <!-- Target Q -->
            <td
              v-if="row.newData.targetQuartal !== row.oldData.targetQuartal"
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r bg-green-100"
            >
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
              >
                <p class="text-sm font-medium mb-1">
                  Old Data
                </p>
                <hr>
                <p class="text-xs text-gray-800 mt-1">
                  {{ row.oldData.targetQuartal }}
                </p>
                <div slot="reference">
                  {{ row.newData.targetQuartal || "-" }}
                </div>
              </el-popover>
            </td>
            <td 
              v-else-if="row.newData.targetQuartal === row.oldData.targetQuartal"
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r"
            >
              {{ row.oldData.targetQuartal }}
            </td>

            <!-- Remark -->
            <td
              v-if="row.newData.remark !== row.oldData.remark"
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r bg-green-100"
            >
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
              >
                <p class="text-sm font-medium mb-1">
                  Old Data
                </p>
                <hr>
                <p class="text-xs text-gray-800 mt-1">
                  {{ row.oldData.remark }}
                </p>
                <div slot="reference">
                  {{ row.newData.remark || "-" }}
                </div>
              </el-popover>
            </td>
            <td 
              v-else-if="row.newData.remark === row.oldData.remark"
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r"
            >
              {{ row.oldData.remark }}
            </td>

            <!-- Budget -->
            <td
              v-if="row.newData.budget !== row.oldData.budget"
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r bg-green-100"
            >
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
              >
                <p class="text-sm font-medium mb-1">
                  Old Data
                </p>
                <hr>
                <p class="text-xs text-gray-800 mt-1">
                  {{ row.oldData.budget }}
                </p>
                <div slot="reference">
                  {{ row.newData.budget || "-" }}
                </div>
              </el-popover>
            </td>
            <td
              v-else-if="row.newData.budget === row.oldData.budget"
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r"
            >
              {{ row.oldData.budget }}
            </td>

            <!-- Cost -->
            <td
              v-if="row.newData.cost !== row.oldData.cost"
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r bg-green-100"
            >
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
              >
                <p class="text-sm font-medium mb-1">
                  Old Data
                </p>
                <hr>
                <p class="text-xs text-gray-800 mt-1">
                  {{
                    typeof row.oldData.cost
                      ? numberFormat.currencyFormat(parseInt(row.oldData.cost))
                      : row.oldData.cost
                  }}
                </p>
                <div slot="reference">
                  || '-'
                  {{
                    typeof row.newData.cost === "number"
                      ? numberFormat.currencyFormat(row.newData.cost)
                      : row.newData.cost
                  }}
                </div>
              </el-popover>
            </td>
            <td
              v-else-if="row.newData.cost === row.oldData.cost"
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r"
            >
              {{
                typeof row.oldData.cost === "number"
                  ? numberFormat.currencyFormat(row.oldData.cost)
                  : row.oldData.cost
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="toggleShowModalConfirmation(true, 'cancel')">Cancel</el-button>
      <el-button
        :disabled="planActivityChecked.length === 0"
        type="primary"
        @click="toggleShowModalConfirmation(true, 'update')"
      >Update</el-button>
    </span>

    <ModalConfirmation
      :is-modal-visible="isShowModalConfirmation"
      title="Confirmation"
      :message="
        typeModal === 'update'
          ? `Are you sure want to update ${planActivityChecked.length} plan activity?`
          : 'Are you sure want cancel this process?'
      "
      :append-to-body="true"
      @onCancel="toggleShowModalConfirmation(false)"
      @onSubmit="onSubmitModal"
    />
  </el-dialog>
</template>

<script setup>
// Import data
import { ModalConfirmation, Select } from "@/components";
import { numberFormat, dateUtil } from "@/utils";
import { computed, ref, watch } from "vue";
import { debounce } from "vue-debounce";

//  ======================== TABLE HEADER ==========================
const tableHeader = ref([
	{
		label: "#",
		value: "checkbox",
	},
	{
		label: "No",
		value: "no",
	},
	{
		label: "Deskripsi Activity",
		value: "deskripsiActivity",
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
		label: "Status",
		value: "status",
	},
	{
		label: "Updated By",
		value: "updatedBy",
	},
	{
		label: "Week Executed",
		value: "weekExecuted",
	},
	{
		label: "Date Executed",
		value: "dateExecuted",
	},
	{
		label: "Program",
		value: "namaProgram",
	},
	{
		label: "Subprogram",
		value: "namaSubprogram",
	},
	{
		label: "Additional Info",
		value: "additionalInfo",
	},
	{
		label: "NS",
		value: "namaNS",
	},
	{
		label: "DO",
		value: "namaDO",
	},
	{
		label: "Kabupaten",
		value: "namaKabupaten",
	},
	{
		label: "PIC",
		value: "namaPIC",
	},
	{
		label: "Target Q",
		value: "targetQuartal",
	},
	{
		label: "Remark",
		value: "remark",
	},
	{
		label: "Budget",
		value: "budget",
	},
	{
		label: "Cost",
		value: "cost",
	},
]);

// ============================== DATA ==============================
const emit = defineEmits(["onSubmit", "onCancel"]);
const props = defineProps({
	data: {
		type: Array,
		default: () => [],
	},
	isModalVisible: {
		type: Boolean,
		default: false,
	},
});

const isModalVisible = computed(() => props.isModalVisible);
const data = computed(() => props.data);

// ============================== CHECKBOX ==============================
const planActivityChecked = ref([]);
const handlePlanActivityChecked = (row) => {
	const activity = planActivityChecked.value.findIndex(
		(item) =>
			item.activityId === row.newData.activityID &&
			item.siteId === row.newData.siteID
	);
	if (activity !== -1) {
		// delete site
		if (planActivityChecked.value.length === 1) {
			planActivityChecked.value = [];
		} else {
			planActivityChecked.value.splice(activity, 1);
		}
	} else {
		const tempData = {
			...row.newData,
		};
		delete tempData.activityID;
		delete tempData.siteID;
		delete tempData.namaPIC;

		const item = {
			row: row.row,
			...tempData,
			activityId: row.newData.activityID,
			siteId: row.newData.siteID,
			pic: row.newData.namaPIC,
		};
		planActivityChecked.value.push(item);
	}
	console.log(planActivityChecked.value);
};

const updateActivityTable = ref(null);

// select all checkbox
const selectAllPlanActivity = () => {
	if (searchActivity.value.length >= 2) {
		planActivityChecked.value = searchData.value.map((row) => {
			const checkbox = updateActivityTable.value.querySelector(
				`input[type="checkbox"][name="checkbox_update-${row.oldData.activityID}-${row.oldData.siteID}"]`
			);
			checkbox.checked = true;

			const item = {
				...row.newData,
			};
			delete item.activityID;
			delete item.siteID;
			delete item.namaPIC;
			return {
				row: row.row,
				...item,
				activityId: row.newData.activityID,
				siteId: row.newData.siteID,
				pic: row.newData.namaPIC,
			};
		});
	} else {
		planActivityChecked.value = data.value.map((row) => {
			const item = {
				...row.newData,
			};
			delete item.activityID;
			delete item.siteID;
			delete item.namaPIC;
			return {
				row: row.row,
				...item,
				activityId: row.newData.activityID,
				siteId: row.newData.siteID,
				pic: row.newData.namaPIC,
			};
		});

		const allCheckbox = updateActivityTable.value.querySelectorAll(
			".checkbox_update_activity"
		);

		// check all checkbox
		allCheckbox.forEach((checkbox) => {
			checkbox.checked = true;
		});
	}
};

// reset all checkbox
const resetPlanActivityChecked = () => {
	// reset all checkbox
	planActivityChecked.value.forEach((row) => {
		const checkbox = updateActivityTable.value.querySelector(
			`input[type="checkbox"][name="checkbox_update-${row.activityID}-${row.siteID}"]`
		);
		checkbox.checked = false;
	});

	planActivityChecked.value = [];
};

// =============================== ACTION ===============================
function onSubmit() {
	toggleShowModalConfirmation(false);
	emit("onSubmit", planActivityChecked.value);
	paginationData.value = [];
	planActivityChecked.value = [];
	searchData.value = [];
	searchActivity.value = "";
}

function onCancel() {
	toggleShowModalConfirmation(false);
	emit("onCancel");
	paginationData.value = [];
	planActivityChecked.value = [];
	searchData.value = [];
	searchActivity.value = "";
}

// =============================== MODAL ===============================
const isShowModalConfirmation = ref(false);
const typeModal = ref("");
const toggleShowModalConfirmation = (value, type = "") => {
	typeModal.value = type;
	isShowModalConfirmation.value = value;
};

const onSubmitModal = () => {
	if (typeModal.value === "update") {
		onSubmit();
	} else {
		onCancel();
	}
};

//============================== PAGINATION ==============================
const pagination = ref(null);
const paginationData = ref([]);
const limitData = ref(50);
const indexStart = ref(0);

watch(data, (val) => {
	if (val.length > 0) {
		if (searchActivity.value.length >= 2) {
			paginationData.value = searchData.value.slice(0, limitData.value);
		} else {
			paginationData.value = val.slice(0, limitData.value);
		}
	}
});

const limits = [
	{
		value: 50,
		label: "50",
	},
	{
		value: 100,
		label: "100",
	},
	{
		value: 250,
		label: "250",
	},
	{
		value: 500,
		label: "500",
	},
];

// handle limit change
const handleLimitChange = (val) => {
	limitData.value = val;

	const start = (pagination.value.internalCurrentPage - 1) * val;
	const end = start + val;

	if (searchActivity.value.length >= 2) {
		paginationData.value = searchData.value.slice(start, end);
	} else {
		paginationData.value = data.value.slice(start, end);
	}

	if (pagination.value.internalCurrentPage !== 1) {
		pagination.value.internalCurrentPage = 1;
	}
};

// handle pagination
const handleCurrentChange = (val) => {
	const start = (val - 1) * limitData.value;
	const end = start + limitData.value;

	if (searchActivity.value.length >= 2) {
		paginationData.value = searchData.value.slice(start, end);
	} else {
		paginationData.value = data.value.slice(start, end);
	}

	indexStart.value = start;
};

// reset pagination
const resetPagination = () => {
	pagination.value.internalCurrentPage = 1;
	if (searchActivity.value.length >= 2) {
		console.log("search data");
		paginationData.value = searchData.value.slice(0, limitData.value);
	} else {
		console.log("default data");
		paginationData.value = data.value.slice(0, limitData.value);
	}
};

// =============================== SEARCH INPUT ===============================
const searchActivity = ref("");
const searchData = ref([]);
const handleSearchActivity = debounce((val) => {
	if (val.length === 1) return;

	if (val && val.length >= 2) {
		const regex = new RegExp(`^${val}`, "i");
		searchData.value = data.value.filter((item) => {
			if (
				regex.test(item.oldData.deskripsiActivity) ||
				regex.test(item.oldData.siteID)
			) {
				return item;
			}
		});
	} else {
		searchData.value = [];
	}
	resetPagination();
}, "400ms");
</script>
