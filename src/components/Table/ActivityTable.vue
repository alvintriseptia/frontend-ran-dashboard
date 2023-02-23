<template>
	<section class="overflow-x-auto min-h-[400px]">
		<table class="table-fixed" v-loading="loading">
			<thead class="bg-gray-100 border-b">
				<tr>
					<th
						v-for="(header, index) in tableHeader"
						:key="header.value"
						class="text-xs font-medium text-gray-600 text-left mx-4 px-4 py-2 relative"
						:class="{
							'min-w-[30px]':
								header.value === 'no' || header.value === 'checkbox',
							'min-w-[250px]': header.value === 'deskripsiActivity',
							'min-w-[150px]':
								header.value !== 'deskripsiActivity' &&
								header.value !== 'no' &&
								header.value !== 'checkbox',
							'bg-gray-200': index % 2 === 0,
						}"
					>
						<div
							class="flex items-center justify-between gap-x-2"
							v-if="header.value !== 'no' && header.value !== 'checkbox'"
						>
							<div class="flex items-center gap-x-1">
								<div
									:class="{
										'text-primary': anyCheckedValue(header),
									}"
								>
									{{ header.label }}
								</div>
								<span class="flex flex-col">
									<button
										@click="sortHandler(header, 'ASC')"
										class="el-icon-caret-top -mb-[1px]"
										:class="{
											'text-primary':
												header.value === orderBy && sortBy === 'ASC',
										}"
									></button>
									<button
										@click="sortHandler(header, 'DESC')"
										class="el-icon-caret-bottom -mt-[1px]"
										:class="{
											'text-primary':
												header.value === orderBy && sortBy === 'DESC',
										}"
									></button>
								</span>
							</div>
							<button
								@click="handleShowFilter(header)"
								class="el-icon-more"
							></button>
						</div>

						<div v-else>
							{{ header.label }}
						</div>

						<!-- Filter Section -->
						<div
							v-if="showFilter === header.value"
							class="bg-white px-4 py-2 absolute left-0 z-50 top-12 h-[325px] w-[200px] shadow-sm shadow-primary/25 rounded-sm filter-container"
							v-click-outside="handleClickOutside"
						>
							<el-input
								size="small"
								:placeholder="'Search ' + header.label"
								v-model="searchFilter"
								@input="handleSearchFilter"
							>
							</el-input>

							<p class="text-gray-400 text-xs mt-4 mb-2">
								{{ filterData[header.value].length }} {{ header.label }}
							</p>
							<div
								class="h-[210px] w-full overflow-y-auto"
								v-infinite-scroll="loadFilterData"
								:infinite-scroll-disabled="disabledScroll"
								infinite-scroll-distance="5"
								:infinite-scroll-immediate="false"
							>
								<el-checkbox-group
									v-model="optionsChecked"
									class="flex flex-col gap-y-3"
									@change="handleFilterChecked"
								>
									<el-checkbox
										v-if="!isSearching"
										v-for="item in optionsData"
										:label="item"
										:key="item"
									>
										{{ item }}
									</el-checkbox>
									<LoadingSpinner v-else-if="isSearching" />
								</el-checkbox-group>
							</div>

							<div class="flex justify-around bg-white py-2">
								<button @click="handleResetFilter(header)">Reset</button>
								<button
									:disabled="optionsChecked.length === 0"
									@click="handleSubmitFilter(header)"
									:class="
										optionsChecked.length === 0
											? 'text-gray-400'
											: 'text-primary'
									"
								>
									Submit
								</button>
							</div>
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

			<div
				class="absolute left-1/2"
				v-if="(!data || data.length === 0) && !loading"
			>
				<el-empty description="No Data"> </el-empty>
			</div>

			<tbody v-else-if="data && data.length > 0 && !loading">
				<tr v-for="(row, index) in data" class="border-b">
					<!-- Index Number -->
					<td
						class="p-2 text-gray-900 flex justify-center items-center h-11 border-r"
					>
						<input
							:name="'checkbox' + '-' + row.activityID"
							:value="row.siteID"
							type="checkbox"
							class="w-3 h-3 bg-gray-100 border-gray-300 rounded accent-primary checkbox_activity cursor-pointer"
							:checked="
								planActivityChecked.has(row.activityID) &&
								planActivityChecked
									.get(row.activityID)
									.sites.findIndex((site) => site === row.siteID) !== -1
									? true
									: false
							"
							@change="emit('onBulkUpdate', row)"
						/>
					</td>
					<!-- Index Number -->
					<td
						class="text-xs p-2 whitespace-nowrap text-gray-900 text-center border-r"
					>
						{{ numberFormat.digitFormat(index + numberStart) }}
					</td>

					<!-- Deskripsi Activity -->
					<td class="text-xs text-gray-900 p-2 whitespace-nowrap border-r">
						{{ row.deskripsiActivity }}
					</td>

					<!-- Site ID -->
					<td class="text-xs text-gray-900 p-2 whitespace-nowrap border-r">
						{{ row.siteID }}
					</td>

					<!-- Site Name -->
					<td class="text-xs text-gray-900 p-2 whitespace-nowrap border-r">
						{{ row.siteName }}
					</td>

					<!-- Status -->
					<td
						class="text-xs text-gray-900 p-2 whitespace-nowrap text-center border-r"
					>
						<PopOverStatus
							:status="row.status"
							@onUpdate="(result) => handleStatusUpdate(row, result)"
						/>
					</td>

					<!-- Updated By -->
					<td
						class="text-xs text-gray-900 p-2 whitespace-nowrap text-center border-r"
					>
						{{ row.updatedBy }}
					</td>

					<!-- Week Executed -->
					<td
						class="text-xs text-gray-900 p-2 whitespace-nowrap text-center border-r"
					>
						{{ row.weekExecuted }}
					</td>

					<!-- Date Executed -->
					<td
						class="text-xs text-gray-900 p-2 whitespace-nowrap text-center border-r"
					>
						{{
							row.dateExecuted
								? dateUtil.convertDateToMMMDDYY(row.dateExecuted)
								: ""
						}}
					</td>

					<!-- Nama Program -->
					<td class="text-xs text-gray-900 p-2 whitespace-nowrap border-r">
						{{ row.namaProgram }}
					</td>

					<!-- Nama Subprogram -->
					<td class="text-xs text-gray-900 p-2 whitespace-nowrap border-r">
						{{ row.namaSubprogram }}
					</td>

					<!-- Additional Info -->
					<td class="text-xs text-gray-900 p-2 whitespace-nowrap border-r">
						{{ row.additionalInfo }}
					</td>

					<!-- NS -->
					<td class="text-xs text-gray-900 p-2 whitespace-nowrap border-r">
						{{ row.namaNS }}
					</td>

					<!-- DO -->
					<td class="text-xs text-gray-900 p-2 whitespace-nowrap border-r">
						{{ row.namaDO }}
					</td>

					<!-- Kabupaten -->
					<td class="text-xs text-gray-900 p-2 whitespace-nowrap border-r">
						{{ row.namaKabupaten }}
					</td>

					<!-- PIC -->
					<td class="text-xs text-gray-900 p-2 whitespace-nowrap border-r">
						{{ row.namaPIC }}
					</td>

					<!-- Target Q -->
					<td class="text-xs text-gray-900 p-2 whitespace-nowrap border-r">
						{{ row.targetQuartal }}
					</td>

					<!-- Remark -->
					<td class="text-xs text-gray-900 p-2 whitespace-nowrap border-r">
						{{ row.remark }}
					</td>

					<!-- Budget -->
					<td
						v-if="userStore.getters.role === 'admin'"
						class="text-xs text-gray-900 p-2 whitespace-nowrap border-r"
					>
						{{ row.budget }}
					</td>

					<!-- Cost -->
					<td
						v-if="userStore.getters.role === 'admin'"
						class="text-xs text-gray-900 p-2 whitespace-nowrap border-r"
					>
						{{
							row.cost && row.cost !== "0"
								? numberFormat.currencyFormat(row.cost)
								: ""
						}}
					</td>

					<!-- Action -->
					<td class="text-xs text-gray-900 p-2 whitespace-nowrap">
						<div class="flex justify-center gap-x-2">
							<el-tooltip
								class="item"
								effect="dark"
								content="Edit Plan"
								placement="top-start"
							>
								<el-button
									@click="handleEdit(row, index)"
									type="warning"
									icon="el-icon-edit"
									size="small"
									circle
								></el-button>
							</el-tooltip>

							<el-tooltip
								class="item"
								effect="dark"
								content="Delete Plan"
								placement="top-start"
							>
								<el-button
									@click="handleRemove(row, index)"
									type="primary"
									icon="el-icon-delete"
									size="small"
									circle
								></el-button>
							</el-tooltip>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script setup>
// Import data
import { PopOverStatus, LoadingSpinner } from "@/components";
import { numberFormat, dateUtil } from "@/utils";
import { computed, watch, ref, onMounted } from "vue";
import { useFetch } from "@/composables";
import { userStore } from "@/stores";
import { Notification } from "element-ui";

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
]);

const props = defineProps({
	data: {
		type: Array,
		default: () => [],
	},
	filterData: {
		type: Object,
		default: () => ({}),
	},
	numberStart: {
		type: Number,
		default: 1,
	},
	loading: {
		type: Boolean,
		default: false,
	},
	planActivityChecked: {
		type: Map,
		default: () => new Map(),
	},
});

const emit = defineEmits([
	"onFilter",
	"onSort",
	"onBulkUpdate",
	"onRemove",
	"onEdit",
]);

const data = computed(() => props.data);
const filterData = computed(() => props.filterData);
const numberStart = computed(() => props.numberStart);
const loading = computed(() => props.loading);
const planActivityChecked = computed(() => props.planActivityChecked);

onMounted(() => {
	if (userStore.getters.role === "admin") {
		tableHeader.value.push({
			label: "Budget",
			value: "budget",
		});
		tableHeader.value.push({
			label: "Cost",
			value: "cost",
		});
	}
});

// ====================================== FILTER TABLE ==============================
// Handle filter container
const handleClickOutside = () => {
	if (showFilter.value) {
		//reset
		showFilter.value = "";
		optionsData.value = [];
		optionsChecked.value = [];
	}
};

const optionsData = ref([]);
const optionsChecked = ref([]);
const showFilter = ref("");
const totalFilterData = ref(0);

// program filter variable
const programChecked = ref([]);

// subprogram filter variable
const subprogramChecked = ref([]);

// status filter variable
const statusChecked = ref([]);

// updated by filter variable
const updatedByChecked = ref([]);

// week executed filter variable
const weekExecutedChecked = ref([]);

// date executed filter variable
const dateExecutedChecked = ref([]);

// deskrpsi activity filter variable
const deskripsiActivityChecked = ref([]);

// additional info filter variable
const additionalInfoChecked = ref([]);

// site id filter variable
const siteIDChecked = ref([]);

// site name filter variable
const siteNameChecked = ref([]);

// kabupaten filter variable
const kabupatenChecked = ref([]);

// DO filter variable
const doChecked = ref([]);

// NS filter variable
const nsChecked = ref([]);

// PIC filter variable
const picChecked = ref([]);

// target Q filter variable
const targetQChecked = ref([]);

// remark filter variable
const remarkChecked = ref([]);

// budget filter variable
const budgetChecked = ref([]);

// cost filter variable
const costChecked = ref([]);

const handleFilterChecked = (value) => {
	if (showFilter.value) {
		switch (showFilter.value) {
			case "namaProgram":
				programChecked.value = value;
				break;
			case "namaSubprogram":
				subprogramChecked.value = value;
				break;
			case "status":
				statusChecked.value = value;
				break;
			case "weekExecuted":
				weekExecutedChecked.value = value;
				break;
			case "dateExecuted":
				dateExecutedChecked.value = value;
				break;
			case "updatedBy":
				updatedByChecked.value = value;
				break;
			case "dateExecuted":
				dateExecutedChecked.value = value;
				break;
			case "deskripsiActivity":
				deskripsiActivityChecked.value = value;
				break;
			case "additionalInfo":
				additionalInfoChecked.value = value;
				break;
			case "siteID":
				siteIDChecked.value = value;
				break;
			case "siteName":
				siteNameChecked.value = value;
				break;
			case "namaKabupaten":
				kabupatenChecked.value = value;
				break;
			case "namaDO":
				doChecked.value = value;
				break;
			case "namaNS":
				nsChecked.value = value;
				break;
			case "namaPIC":
				picChecked.value = value;
				break;
			case "targetQuartal":
				targetQChecked.value = value;
				break;
			case "remark":
				remarkChecked.value = value;
				break;
			case "budget":
				budgetChecked.value = value;
				break;
			case "cost":
				costChecked.value = value;
				break;
			default:
				break;
		}
	}
};

const handleResetFilter = (column) => {
	if (column) {
		switch (column.value) {
			case "namaProgram":
				programChecked.value = [];
				break;
			case "namaSubprogram":
				subprogramChecked.value = [];
				break;
			case "status":
				statusChecked.value = [];
				break;
			case "weekExecuted":
				weekExecutedChecked.value = [];
				break;
			case "dateExecuted":
				dateExecutedChecked.value = [];
				break;
			case "updatedBy":
				updatedByChecked.value = [];
				break;
			case "deskripsiActivity":
				deskripsiActivityChecked.value = [];
				break;
			case "additionalInfo":
				additionalInfoChecked.value = [];
				break;
			case "siteID":
				siteIDChecked.value = [];
				break;
			case "siteName":
				siteNameChecked.value = [];
				break;
			case "namaKabupaten":
				kabupatenChecked.value = [];
				break;
			case "namaDO":
				doChecked.value = [];
				break;
			case "namaNS":
				nsChecked.value = [];
				break;
			case "namaPIC":
				picChecked.value = [];
				break;
			case "targetQuartal":
				targetQChecked.value = [];
				break;
			case "remark":
				remarkChecked.value = [];
				break;
			case "budget":
				budgetChecked.value = [];
				break;
			case "cost":
				costChecked.value = [];
				break;
			default:
				break;
		}

		// reset
		showFilter.value = "";
		optionsData.value = [];
		optionsChecked.value = [];

		let filter = {};
		filter[column.value] = [];
		emit("onFilter", filter);
	}
};

const handleSubmitFilter = (column) => {
	if (column) {
		let filter = {};

		// if filter is date executed or cost, then reset format
		if (column.value === "dateExecuted") {
			optionsChecked.value = optionsChecked.value.map((item) => {
				return item ? dateUtil.resetDateFormat(item) : item;
			});
		} else if (column.value === "cost") {
			optionsChecked.value = optionsChecked.value.map((item) => {
				return item ? numberFormat.resetCurrencyFormat(item) : item;
			});
		}

		filter[column.value] = optionsChecked.value;

		// reset
		showFilter.value = "";
		optionsData.value = [];
		optionsChecked.value = [];

		// emit event
		emit("onFilter", filter);
	}
};

const handleShowFilter = (column) => {
	if (column.value === showFilter.value) {
		showFilter.value = "";
		optionsData.value = [];
		optionsChecked.value = [];
		totalFilterData.value = 0;
	} else {
		showFilter.value = column.value;
		totalFilterData.value = filterData.value[column.value].length;

		//  reset filter variable
		const data =
			filterData.value[showFilter.value].length < 10
				? filterData.value[showFilter.value]
				: filterData.value[showFilter.value].slice(0, 10);
		if (showFilter.value === "dateExecuted") {
			optionsData.value = data.map((item) => {
				return item ? dateUtil.convertDateToMMMDDYY(item) : item;
			});
		} else if (showFilter.value === "cost") {
			optionsData.value = data.map((item) => {
				return item ? numberFormat.currencyFormat(item) : item;
			});
		} else {
			optionsData.value = data;
		}
		disabledScroll.value = optionsData.value.length < 10 ? true : false;

		// set checked data
		switch (showFilter.value) {
			case "namaProgram":
				optionsChecked.value = programChecked.value;
				break;
			case "namaSubprogram":
				optionsChecked.value = subprogramChecked.value;
				break;
			case "status":
				optionsChecked.value = statusChecked.value;
				break;
			case "weekExecuted":
				optionsChecked.value = weekExecutedChecked.value;
				break;
			case "dateExecuted":
				optionsChecked.value = dateExecutedChecked.value;
				break;
			case "updatedBy":
				optionsChecked.value = updatedByChecked.value;
				break;
			case "deskripsiActivity":
				optionsChecked.value = deskripsiActivityChecked.value;
				break;
			case "additionalInfo":
				optionsChecked.value = additionalInfoChecked.value;
				break;
			case "siteID":
				optionsChecked.value = siteIDChecked.value;
				break;
			case "siteName":
				optionsChecked.value = siteNameChecked.value;
				break;
			case "namaKabupaten":
				optionsChecked.value = kabupatenChecked.value;
				break;
			case "namaDO":
				optionsChecked.value = doChecked.value;
				break;
			case "namaNS":
				optionsChecked.value = nsChecked.value;
				break;
			case "namaPIC":
				optionsChecked.value = picChecked.value;
				break;
			case "targetQuartal":
				optionsChecked.value = targetQChecked.value;
				break;
			case "remark":
				optionsChecked.value = remarkChecked.value;
				break;
			case "budget":
				optionsChecked.value = budgetChecked.value;
				break;
			case "cost":
				optionsChecked.value = costChecked.value;
				break;
			default:
				break;
		}
	}
};

const anyCheckedValue = (column) => {
	let checked = false;
	switch (column.value) {
		case "namaProgram":
			checked = programChecked.value.length > 0;
			break;
		case "namaSubprogram":
			checked = subprogramChecked.value.length > 0;
			break;
		case "status":
			checked = statusChecked.value.length > 0;
			break;
		case "weekExecuted":
			checked = weekExecutedChecked.value.length > 0;
			break;
		case "dateExecuted":
			checked = dateExecutedChecked.value.length > 0;
			break;
		case "updatedBy":
			checked = updatedByChecked.value.length > 0;
			break;
		case "deskripsiActivity":
			checked = deskripsiActivityChecked.value.length > 0;
			break;
		case "additionalInfo":
			checked = additionalInfoChecked.value.length > 0;
			break;
		case "siteID":
			checked = siteIDChecked.value.length > 0;
			break;
		case "siteName":
			checked = siteNameChecked.value.length > 0;
			break;
		case "namaKabupaten":
			checked = kabupatenChecked.value.length > 0;
			break;
		case "namaDO":
			checked = doChecked.value.length > 0;
			break;
		case "namaNS":
			checked = nsChecked.value.length > 0;
			break;
		case "namaPIC":
			checked = picChecked.value.length > 0;
			break;
		case "targetQuartal":
			checked = targetQChecked.value.length > 0;
			break;
		case "remark":
			checked = remarkChecked.value.length > 0;
			break;
		case "budget":
			checked = budgetChecked.value.length > 0;
			break;
		case "cost":
			checked = costChecked.value.length > 0;
			break;
		default:
			break;
	}
	return checked;
};

// Pagination
const disabledScroll = ref(false);
const loadFilterData = () => {
	if (showFilter.value && !disabledScroll.value) {
		if (
			optionsData.value.length + optionsChecked.value.length >=
			filterData.value[showFilter.value].length
		) {
			disabledScroll.value = true;
		} else {
			let currentLength = 0;
			const startIndex = optionsData.value.length + optionsChecked.value.length;
			const endIndex = filterData.value[showFilter.value].length;
			for (let i = startIndex; i < endIndex; i++) {
				if (currentLength < 10) {
					let data = filterData.value[showFilter.value][i];
					// format data
					if (data && showFilter.value === "dateExecuted") {
						data = dateUtil.convertDateToMMMDDYY(data);
					} else if (data && showFilter.value === "cost") {
						data = numberFormat.currencyFormat(data);
					}

					let isPushed = true;

					// check if search filter is not empty
					if (searchFilter.value) {
						const regex = new RegExp(`^${searchFilter.value}`, "i");
						isPushed =
							regex.test(filterData.value[showFilter.value][i]) &&
							!optionsData.value.includes(
								filterData.value[showFilter.value][i]
							);
					}

					if (isPushed) {
						optionsData.value.push(data);
						currentLength++;
					}
				} else {
					break;
				}
			}
		}
	}
};

const searchFilter = ref("");
const isSearching = ref(false);

const handleSearchFilter = (value) => {
	if (showFilter.value && value.length < 2) {
		disabledScroll.value = false;
		setTimeout(() => {
			isSearching.value = true;

			//  get first 10 data without include checked
			optionsData.value =
				filterData.value[showFilter.value].length < 10
					? filterData.value[showFilter.value]
					: filterData.value[showFilter.value].slice(0, 10);

			isSearching.value = false;
		}, 500);
	} else if (showFilter.value && value && value.length >= 2) {
		disabledScroll.value = false;
		setTimeout(() => {
			isSearching.value = true;
			// regex that start with value
			const regex = new RegExp(`^${value}`, "i");

			// search data max 10
			optionsData.value = [];
			for (let i = 0; i < filterData.value[showFilter.value].length; i++) {
				// if total data less than 10
				if (optionsData.value.length < 10) {
					// if data match regex
					if (regex.test(filterData.value[showFilter.value][i])) {
						optionsData.value.push(filterData.value[showFilter.value][i]);
					}
				} else {
					break;
				}
			}

			isSearching.value = false;
		}, 500);
	}
};

// =================== SORT TABLE ===================
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

// =================== STATUS UPDATE ===================
const handleStatusUpdate = (row, result) => {
	// console.log(row);
	const body = new FormData();

	body.append("activityId", row.activityID);
	body.append("siteId", row.siteID);
	body.append("done", result.status === "Done" ? 1 : 0);
	if (result.status === "Done") {
		body.append("dateExecuted", result.date);
	} else {
		const date = new Date();
		const dateNow = date.toISOString().slice(0, 10);
		body.append("dateExecuted", dateNow);
	}

	const url =
		"/api/activity-plan/date-executed/" + row.activityID + "/" + row.siteID;
	const { data, status, message } = useFetch({
		url,
		method: "PUT",
		body,
	});

	const unwatch = watch(
		[data, status, message],
		([newData, newStatus, newMessage]) => {
			if (newStatus === "success" && newData) {
				row.status = newData.status;
				row.weekExecuted = newData.weekExecuted
					? parseInt(newData.weekExecuted)
					: "";
				row.dateExecuted = newData.dateExecuted ? newData.dateExecuted : "";
				row.updatedBy = newData.updatedBy;

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
};

// =================== Action Column ===================
function handleRemove(row, index) {
	emit("onRemove", { row, index });
}

function handleEdit(row, index) {
	emit("onEdit", { row, index });
}
</script>

<style>
.header-color-activity {
	background-color: #f5f5f5 !important;
	padding: 0 !important;
	text-align: center !important;
}

.header-color-activity:nth-child(even) {
	background-color: rgb(229, 231, 235) !important;
	padding: 0 !important;
	text-align: center !important;
}

.el-checkbox {
	font-size: 10px;
}

.el-checkbox__label {
	font-size: 10px;
}
</style>
