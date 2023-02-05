<template>
	<div>
		<el-tabs v-model="activeName" @tab-click="handleTabClick">
			<el-tab-pane label="Site Setting" name="site">
				<transition name="el-fade-in-linear">
					<Card title="Site Setting" v-show="activeName === 'site'">
						<template #header>
							<OutlinedButton @onClick="showInput('input')" class="mr-4"
								>Input Site</OutlinedButton
							>
							<OutlinedButton @onClick="showImportSites"
								>Import Sites</OutlinedButton
							>
						</template>

						<section class="my-4 flex items-center justify-between">
							<div class="flex items-center">
								<Button
									@onClick="handleShowModalConfirmation"
									:disabled="removeButtonDisabled === 'site' ? false : true"
									type="primary"
									size="sm"
									>Delete</Button
								>
								<el-pagination
									:page-size="sitesParams.limit"
									:pager-count="5"
									layout="prev, pager, next"
									:total="sites.totalData"
									@current-change="handleCurrentChange"
								>
								</el-pagination>
								<div class="flex items-center">
									<div class="max-w-[80px]">
										<Select
											:options="limits"
											@onChange="handleLimitChange"
											placeholder="Rows per page"
											defaultValue="10"
										/>
									</div>
									<p class="text-xs ml-2">Rows per page</p>
								</div>
							</div>
							<RemoteSearchSelect
								:options="unref(searchSites.data)"
								placeholder="Select Site"
								@onChange="handleSearchSites"
								@onUpdate="handleUpdateSite"
								labelOption="id,name"
								valueOption="id"
							/>
						</section>
						<section>
							<SettingTable
								@onUpdate="handleRemoveButton"
								:data="sites.data"
								:numberStart="1"
								@onRemove="handleShowModalConfirmation"
								@onEdit="handleEdit"
								type="site"
								:loading="sites.loading"
								@onSort="handleSitesSortChange"
							/>
						</section> </Card
				></transition>
			</el-tab-pane>

			<el-tab-pane label="NS Department Setting" name="ns">
				<transition name="el-fade-in-linear">
					<Card title="NS Department Setting" v-show="activeName === 'ns'">
						<Button
							@onClick="handleShowModalConfirmation"
							:disabled="removeButtonDisabled === 'ns' ? false : true"
							type="primary"
							size="sm"
							>Delete</Button
						>
						<section class="mt-2">
							<SettingTable
								@onUpdate="handleRemoveButton"
								:data="nsDepartmentOptions"
								:numberStart="1"
								@onRemove="handleShowModalConfirmation"
								type="ns"
							/>

							<el-button
								@click="showInputTableNS"
								:icon="isShowInputTableNS ? 'el-icon-arrow-up' : 'el-icon-plus'"
								type="primary"
								class="w-full"
							></el-button>

							<el-form
								v-show="isShowInputTableNS"
								:model="formNS"
								:rules="rulesNS"
								ref="formNSRef"
								label-position="top"
								class="mt-4 flex"
							>
								<el-form-item label="" prop="namaNS" class="w-full">
									<el-input
										v-model="formNS.namaNS"
										autocomplete="off"
										placeholder="Input NS Department"
									></el-input>
								</el-form-item>
								<div class="w-32">
									<Button @onClick="onSubmit('formNS')"> Input Data </Button>
								</div>
							</el-form>
						</section>
					</Card>
				</transition>
			</el-tab-pane>

			<el-tab-pane label="DO Sub-Department Setting" name="do">
				<transition name="el-fade-in-linear">
					<Card title="DO Sub-Department Setting" v-show="activeName === 'do'">
						<Button
							@onClick="handleShowModalConfirmation"
							:disabled="removeButtonDisabled === 'do' ? false : true"
							type="primary"
							size="sm"
							>Delete</Button
						>
						<section class="mt-2">
							<SettingTable
								@onUpdate="handleRemoveButton"
								:data="doSubDepartmentOptions"
								:numberStart="1"
								@onRemove="handleShowModalConfirmation"
								type="do"
							/>

							<el-button
								@click="showInputTableDO"
								:icon="isShowInputTableDO ? 'el-icon-arrow-up' : 'el-icon-plus'"
								type="primary"
								class="w-full"
							></el-button>

							<el-form
								v-show="isShowInputTableDO"
								:model="formDO"
								:rules="rulesDO"
								ref="formDORef"
								label-position="top"
								class="mt-4 flex"
							>
								<el-form-item label="" prop="namaDO" class="w-full">
									<el-input
										v-model="formDO.namaDO"
										autocomplete="off"
										placeholder="Input DO Sub-Department"
									></el-input>
								</el-form-item>
								<div class="w-32">
									<Button @onClick="onSubmit('formDO')"> Input Data </Button>
								</div>
							</el-form>
						</section>
					</Card>
				</transition>
			</el-tab-pane>
		</el-tabs>

		<!-- Dialog -->
		<ImportExcel
			:isShow="isShowImportSites"
			title="Import Sites"
			url="/api/sites/upload"
			@closeImportExcel="closeImportSites"
		/>

		<ModalConfirmation
			title="Confirmation"
			:isModalVisible="isShowModalConfirmation"
			@onCancel="handleCancelRemove"
			@onConfirm="handleConfirmRemove"
		/>

		<InputSite
			:isShow="isShowInput"
			@closeInput="closeInput"
			:type="isEdit ? 'edit' : 'input'"
			:currentData="currentData"
			:nsDepartmentOptions="nsDepartmentOptions"
			:doSubDepartmentOptions="doSubDepartmentOptions"
			:kabupatenOptions="kabupatenOptions"
		/>
	</div>
</template>

<script setup>
import {
	SettingTable,
	Card,
	OutlinedButton,
	Button,
	ImportExcel,
	ModalConfirmation,
	InputSite,
	RemoteSearchSelect,
	Select,
} from "@/components";
import { ref, unref, onMounted, watch } from "vue";
import { Notification } from "element-ui";
import { useFetch } from "@/composables";

// Tabs
const activeName = ref("site");
const handleTabClick = (tab) => {
	activeName.value = tab.name;
};

// Sites
const sitesParams = ref({
	sitesID: [],
	sortBy: null,
	orderBy: null,
	page: 1,
	limit: 10,
});
const sites = ref(
	useFetch({
		url: "/api/site",
		params: sitesParams,
	})
);

// handle sort change
const handleSitesSortChange = (sort) => {
	if (sort.order) {
		sitesParams.value = {
			...sitesParams.value,
			sortBy: sort.order === "ascending" ? "ASC" : "DESC",
			orderBy: sort.prop,
		};
	} else {
		sitesParams.value = {
			...sitesParams.value,
			sortBy: null,
			orderBy: null,
		};
	}
};

// handle limit change
const handleLimitChange = (val) => {
	// get current page
	const currentPage = Math.ceil(
		(sitesParams.value.page * sitesParams.value.limit) / val
	);
	if (currentPage > sites.value.totalPage) {
		sitesParams.value = {
			...sitesParams.value,
			limit: val,
			page: sites.value.totalPage,
		};
	} else {
		sitesParams.value = {
			...sitesParams.value,
			limit: val,
			page: currentPage,
		};
	}
};

// handle pagination
const handleCurrentChange = (val) => {
	sitesParams.value.page = val;
};

const limits = [
	{
		value: 10,
		label: "10",
	},
	{
		value: 20,
		label: "20",
	},
	{
		value: 50,
		label: "50",
	},
	{
		value: 100,
		label: "100",
	},
];

// search params
const searchSiteParams = ref({
	site: "",
});

// fetch first data
const searchSites = ref(
	useFetch({
		url: "/api/site/search",
		params: searchSiteParams,
	})
);

// handle search
const handleSearchSites = (val) => {
	if (val.length >= 1 && val.length <= 2) return;

	if (val && val.length >= 3) {
		searchSiteParams.value.site = val;
	} else {
		searchSiteParams.value.site = "";
	}
};

// handle on update
function handleUpdateSite(value) {
	sitesParams.value.sitesID = value;
}

// Menu Input
const isShowInput = ref(false);
const isEdit = ref(false);
const showInput = (type) => {
	if (type === "edit") {
		isEdit.value = true;
		isShowInput.value = true;
	} else {
		isEdit.value = false;
		isShowInput.value = true;
	}
};

const closeInput = (result) => {
	isShowInput.value = false;
	if (result) {
		sites.value.data = [result, ...sites.value.data];
		Notification.success({
			title: "Success",
			message: "Site has been added",
		});
	}
};

// Form
const currentData = ref({});
const handleEdit = (data) => {
	if (data.row.siteID) {
		currentData.value = data.row;
		showInput("edit");
	}
};

// Menu Import Sites
const isShowImportSites = ref(false);
const showImportSites = () => {
	if (isShowImportSites) {
		isShowImportSites.value = false;
	}
	isShowImportSites.value = true;
};

const closeImportSites = () => {
	isShowImportSites.value = false;
};

// ==========================

// Menu Input Table NS
const isShowInputTableNS = ref(false);
const showInputTableNS = () => {
	isShowInputTableNS.value = !isShowInputTableNS.value;
};

const formNS = ref({
	namaNS: "",
});

const formNSRef = ref(null);

const rulesNS = ref({
	namaNS: [
		{
			required: true,
			message: "Please input NS Sub-Department",
			trigger: "blur",
		},
	],
});

// Menu Input Table DO
const isShowInputTableDO = ref(false);
const showInputTableDO = () => {
	isShowInputTableDO.value = !isShowInputTableDO.value;
};

const formDO = ref({
	namaDO: "",
});

const formDORef = ref(null);

const rulesDO = ref({
	namaDO: [
		{
			required: true,
			message: "Please input DO Sub-Department",
			trigger: "blur",
		},
	],
});

// Onsubmit Form
const onSubmit = (formName) => {
	if (formName === "formNS")
		formNSRef.value.validate((valid) => {
			if (valid) {
				const body = new FormData();
				body.append("name", formNS.value.namaNS);

				const { data, error } = useFetch({
					url: "/api/ns-departemen",
					method: "POST",
					body,
				});

				watch(data, (newData) => {
					if (newData) {
						const data = {
							value: newData.id,
							label: newData.nama,
						};
						nsDepartmentOptions.value = [...nsDepartmentOptions.value, data];
						showInputTableNS();
						Notification.success({
							title: "Success",
							message: "NS Department has been added",
						});
					}
				});

				watch(error, (newError) => {
					if (newError) {
						console.log(newError);
						Notification.error({
							title: "Error",
							message: newError,
						});
					}
				});
			} else {
				return false;
			}
		});
	else {
		formDORef.value.validate((valid) => {
			if (valid) {
				if (valid) {
					const body = new FormData();
					body.append("name", formDO.value.namaDO);

					const { data, error } = useFetch({
						url: "/api/do-subdepartemen",
						method: "POST",
						body,
					});

					watch(data, (newData) => {
						if (newData) {
							const data = {
								value: newData.id,
								label: newData.nama,
							};
							doSubDepartmentOptions.value = [
								...doSubDepartmentOptions.value,
								data,
							];
							showInputTableDO();
							Notification.success({
								title: "Success",
								message: "DO Sub-Department has been added",
							});
						}
					});

					watch(error, (newError) => {
						if (newError) {
							Notification.error({
								title: "Error",
								message: newError,
							});
						}
					});
				} else {
					return false;
				}
			} else {
				return false;
			}
		});
	}
};

// Delete Button
const removeButtonDisabled = ref(null);
const multipleSelection = ref([]);

const handleRemoveButton = (data) => {
	if (data.multipleSelection.length > 0) {
		removeButtonDisabled.value = data.type;
		multipleSelection.value = data.multipleSelection;
	} else {
		removeButtonDisabled.value = null;
		multipleSelection.value = [];
	}
};

// Modal Confirmation
const isShowModalConfirmation = ref(false);
const row = ref(null);
const index = ref(null);

const handleShowModalConfirmation = (data) => {
	isShowModalConfirmation.value = true;
	if (data) {
		row.value = data.row;
		index.value = data.index;
	}
};

const handleCancelRemove = () => {
	isShowModalConfirmation.value = false;
};

const handleConfirmRemove = () => {
	isShowModalConfirmation.value = false;
};

// ==========================

// NS Department
const nsDepartment = useFetch({
	url: "/api/ns-departemen",
});
const nsDepartmentOptions = ref([]);

// DO Sub-Department
const doSubDepartment = useFetch({
	url: "/api/do-subdepartemen",
});
const doSubDepartmentOptions = ref([]);

// Kabupaten
const kabupaten = useFetch({
	url: "/api/kabupaten",
});
const kabupatenOptions = ref([]);

onMounted(() => {
	watch(nsDepartment.data, () => {
		if (nsDepartment.data !== null && nsDepartment.data.value !== []) {
			nsDepartmentOptions.value = nsDepartment.data.value.map((item) => {
				return {
					label: item.nama,
					value: item.id,
				};
			});
		}
	});

	watch(doSubDepartment.data, () => {
		if (doSubDepartment.data !== null && doSubDepartment.data.value !== []) {
			doSubDepartmentOptions.value = doSubDepartment.data.value.map((item) => {
				return {
					label: item.nama,
					value: item.id,
				};
			});
		}
	});

	watch(kabupaten.data, () => {
		if (kabupaten.data !== null && kabupaten.data.value !== []) {
			kabupatenOptions.value = kabupaten.data.value.map((item) => {
				return {
					label: item.nama,
					value: item.id,
				};
			});
		}
	});
});
</script>
