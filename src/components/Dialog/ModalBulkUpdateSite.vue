<template>
  <el-dialog
    :title="`There are ${data.length} sites need to be updated`"
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
          v-model="searchSite"
          class="max-w-[250px] mr-4"
          placeholder="Search an Site ID or Site Name"
          clearable
          @input="handlesearchSite"
        />

        <el-button
          icon="el-icon-success"
          size="mini"
          type="success"
          @click="selectAllSite"
        >
          Select All
        </el-button>
        <el-button
          icon="el-icon-remove"
          size="mini"
          type="danger"
          @click="resetSiteChecked"
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
        ref="updateSiteTable"
        class="w-full"
        :class="{
          'min-h-[300px]': searchSite.length >= 2 && searchData.length === 0,
        }"
      >
        <thead class="bg-gray-100 border-b">
          <tr>
            <th
              v-for="(header, index) in tableHeader"
              :key="header.value"
              class="text-xs font-medium text-gray-600 text-left mx-4 px-4 py-2 relative"
              :class="{
                'w-[10%]': header.value === 'siteID',
                'w-[5%]': header.value === 'no',
                'w-[4%]': header.value === 'checkbox',
                'w-[24%]':
                  header.value !== 'siteID' &&
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
          v-if="searchSite.length >= 2 && searchData.length === 0"
          class="absolute left-1/2"
        >
          <el-empty description="No Data" />
        </div>

        <tbody v-else>
          <tr
            v-for="(row, index) in paginationData"
            :key="row.oldData.siteID"
            class="border-b"
          >
            <!-- Checkbox -->
            <td
              class="p-2 text-gray-900 flex justify-center items-center h-11 border-r sticky left-0 bg-white"
            >
              <input
                :name="'checkbox_update_site-' + row.oldData.siteID"
                type="checkbox"
                class="w-3 h-3 bg-gray-100 border-gray-300 rounded accent-primary checkbox_update_site cursor-pointer"
                :checked="
                  siteChecked.find((item) => item.id === row.oldData.siteID)
                "
                @change="handlesiteChecked(row)"
              >
            </td>
            <!-- Index Number -->
            <td
              class="text-xs p-2 whitespace-nowrap text-gray-900 text-center border-r"
            >
              {{ numberFormat.digitFormat(indexStart + 1 + index) }}
            </td>

            <!-- Site ID -->
            <td
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r"
            >
              {{ row.oldData.siteID }}
            </td>

            <!-- Site Name -->
            <td
              v-if="row.newData.siteName !== row.oldData.siteName"
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
                  {{ row.oldData.siteName }}
                </p>
                <div slot="reference">
                  {{ row.newData.siteName || "-" }}
                </div>
              </el-popover>
            </td>

            <td
              v-else-if="row.newData.siteName === row.oldData.siteName"
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r"
            >
              {{ row.oldData.siteName }}
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
              v-else-if="
                row.newData.namaKabupaten === row.oldData.namaKabupaten
              "
              class="text-xs text-gray-900 p-2 whitespace-nowrap border-r"
            >
              {{ row.oldData.namaKabupaten }}
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
        :disabled="siteChecked.length === 0"
        type="primary"
        @click="toggleShowModalConfirmation(true, 'update')"
      >Update</el-button>
    </span>

    <ModalConfirmation
      :is-modal-visible="isShowModalConfirmation"
      title="Confirmation"
      :message="
        typeModal === 'update'
          ? `Are you sure want to update ${siteChecked.length} sites?`
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
import { numberFormat } from "@/utils";
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
		label: "Site ID",
		value: "siteID",
	},
	{
		label: "Site Name",
		value: "siteName",
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
const siteChecked = ref([]);
const handlesiteChecked = (row) => {
	const site = siteChecked.value.findIndex(
		(item) => item.id === row.oldData.siteID
	);
	if (site !== -1) {
		// delete site
		if (siteChecked.value.length === 1) {
			siteChecked.value = [];
		} else {
			siteChecked.value.splice(site, 1);
		}
	} else {
		const item = {
			row: row.row,
			id: row.oldData.siteID,
			name: row.newData.siteName,
			ns: row.newData.nsID,
			do: row.newData.doID,
			kabupaten: row.newData.kabupatenID,
		};
		siteChecked.value.push(item);
	}

};

const updateSiteTable = ref(null);

// select all checkbox
const selectAllSite = () => {
	if (searchSite.value.length >= 2) {
		siteChecked.value = searchData.value.map((row) => {
			const checkbox = updateSiteTable.value.querySelector(
				`input[type="checkbox"][name="checkbox_update_site-${row.oldData.siteID}"]`
			);
			checkbox.checked = true;

			return {
				row: row.row,
				id: row.oldData.siteID,
				name: row.newData.siteName,
				ns: row.newData.nsID,
				do: row.newData.doID,
				kabupaten: row.newData.kabupatenID,
			};
		});
	} else {
		siteChecked.value = data.value.map((row) => {
			return {
				row: row.row,
				id: row.oldData.siteID,
				name: row.newData.siteName,
				ns: row.newData.nsID,
				do: row.newData.doID,
				kabupaten: row.newData.kabupatenID,
			};
		});

		const allCheckbox = updateSiteTable.value.querySelectorAll(
			".checkbox_update_site"
		);

		// check all checkbox
		allCheckbox.forEach((checkbox) => {
			checkbox.checked = true;
		});
	}
};

// reset all checkbox
const resetSiteChecked = () => {
	// reset all checkbox
	siteChecked.value.forEach((row) => {
		const checkbox = updateSiteTable.value.querySelector(
			`input[type="checkbox"][name="checkbox_update_site-${row.id}"]`
		);
		checkbox.checked = false;
	});

	siteChecked.value = [];
};

// =============================== ACTION ===============================
function onSubmit() {
	toggleShowModalConfirmation(false);
	emit("onSubmit", siteChecked.value);
	paginationData.value = [];
	siteChecked.value = [];
	searchData.value = [];
	searchSite.value = "";
}

function onCancel() {
	toggleShowModalConfirmation(false);
	emit("onCancel");
	paginationData.value = [];
	siteChecked.value = [];
	searchData.value = [];
	searchSite.value = "";
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
		if (searchSite.value.length >= 2) {
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

	if (searchSite.value.length >= 2) {
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

	if (searchSite.value.length >= 2) {
		paginationData.value = searchData.value.slice(start, end);
	} else {
		paginationData.value = data.value.slice(start, end);
	}

	indexStart.value = start;
};

// reset pagination
const resetPagination = () => {
	pagination.value.internalCurrentPage = 1;
	if (searchSite.value.length >= 2) {
		console.log("search data");
		paginationData.value = searchData.value.slice(0, limitData.value);
	} else {
		console.log("default data");
		paginationData.value = data.value.slice(0, limitData.value);
	}
};

// =============================== SEARCH INPUT ===============================
const searchSite = ref("");
const searchData = ref([]);
const handlesearchSite = debounce((val) => {
	if (val.length === 1) return;

	if (val && val.length >= 2) {
		const regex = new RegExp(`^${val}`, "i");
		searchData.value = data.value.filter((item) => {
			if (
				regex.test(item.oldData.siteID) ||
				regex.test(item.oldData.siteName) || 
				regex.test(item.newData.siteName)
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
