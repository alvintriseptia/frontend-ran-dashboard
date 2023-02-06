<template>
	<div>
		<el-tabs v-model="activeName" @tab-click="handleTabClick">
			<el-tab-pane label="Site Setting" name="site">
				<transition name="el-fade-in-linear">
					<Card
						title="Site Setting"
						v-show="activeName === 'site'"
						:alert="alertCard"
					>
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
								@onSelect="handleRemoveButton"
								:data="sites.data"
								@onRemove="handleShowModalConfirmation"
								@onEdit="handleEdit"
								type="site"
								:loading="sites.loading"
								@onSort="handleSitesSortChange"
								:numberStart="
									sitesParams.page * sitesParams.limit - sitesParams.limit + 1
								"
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
								@onSelect="handleRemoveButton"
								:data="nsDepartmentOptions"
								:numberStart="1"
								@onRemove="handleShowModalConfirmation"
								@onUpdate="handleShowModalConfirmation"
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
								@onSelect="handleRemoveButton"
								:data="doSubDepartmentOptions"
								:numberStart="1"
								@onRemove="handleShowModalConfirmation"
								@onUpdate="handleShowModalConfirmation"
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
			url="/api/site/upload"
			@closeImportExcel="closeImportSites"
		/>

		<ModalConfirmation
			title="Confirmation"
			:isModalVisible="isShowModalConfirmation"
			:message="messageDialog"
			:description="descriptionDialog"
			@onSubmit="handleConfirmModal"
			@onCancel="handleCancelModal"
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
const urlSearchSite = ref(null);
const searchSites = useFetch({
	url: urlSearchSite,
	params: searchSiteParams,
});

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
		if (result.type === "input") {
			sites.value.data = [result, ...sites.value.data];

			Notification.success({
				title: "Success",
				message: "Site has been added",
			});
		} else {
			Notification.success({
				title: "Success",
				message: `Site ${
					sites.value.data[indexSite.value].siteID
				} has been updated`,
			});

			sites.value.data[indexSite.value].siteID = result.siteID;
			sites.value.data[indexSite.value].siteName = result.siteName;
			sites.value.data[indexSite.value].nsID = result.nsID;
			sites.value.data[indexSite.value].namaNS = result.namaNS;
			sites.value.data[indexSite.value].doID = result.doID;
			sites.value.data[indexSite.value].namaDO = result.namaDO;
			sites.value.data[indexSite.value].kabupatenID = result.kabupatenID;
			sites.value.data[indexSite.value].namaKabupaten = result.namaKabupaten;
		}

		//reset state
		currentData.value = {};
		indexSite.value = null;
	}
};

// Form
const currentData = ref({});
const indexSite = ref(null);
const handleEdit = (data) => {
	if (data.row.siteID) {
		currentData.value = data.row;
		indexSite.value = data.index;
		showInput("edit");
	}
};

// Menu Import Sites
const isShowImportSites = ref(false);
const alertCard = ref(null);

const showImportSites = () => {
	if (isShowImportSites) {
		isShowImportSites.value = false;
	}
	isShowImportSites.value = true;
};

const closeImportSites = (result) => {
	isShowImportSites.value = false;
	if (result) {
		// console.log(result);
		if (result.isRefresh) {
			const title = result.data[1]
				? "Import Activities Success"
				: "Some activities success imported, but the other is not imported";
			alertCard.value = {
				type: result.data[1] ? "success" : "warning",
				title: title,
				description: result.data[1],
			};
			if (sitesParams.value.page > 1) {
				sitesParams.value = {
					...sitesParams.value,
					page: 1,
				};
			} else {
				sites.value.doFetch();
			}
		} else if (result.data[1]) {
			alertCard.value = {
				type: "warning",
				title:
					"Some activities success imported, but the other is not imported",
				description: result.data[1],
			};
		}

		setTimeout(() => {
			alertCard.value = null;
		}, 5000);
	} else {
		alertCard.value = null;
	}
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

						// reset form
						formNSRef.value.resetField();
						formNS.value.namaNS = "";

						showInputTableNS();
						Notification.success({
							title: "Success",
							message: "NS Department has been added",
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

							// reset form
							formDORef.value.resetField();
							formDO.value.namaDO = "";

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
const type = ref(null);
const typeDialog = ref(null);
const messageDialog = ref(null);
const descriptionDialog = ref(null);
const deletedCount = ref(0);

const handleShowModalConfirmation = (result) => {
	if (result) {
		console.log(result);
		row.value = result.row;
		index.value = result.index;
		type.value = result.type;
		typeDialog.value = result.typeDialog;

		if (typeDialog.value === "delete") {
			console.log("delete...");

			let url = "";

			if (result.type === "site") {
				messageDialog.value = "Are you sure want to delete this site?";
				url = `/api/activity-plan/count-by-site-id/${result.row.siteID}`;
			} else {
				messageDialog.value = `Are you sure want to delete this ${result.type.toUpperCase()}?`;
				url = `/api/site/count-by-${result.type}/${result.row.value}`;
			}

			const { data, error } = useFetch({
				url,
			});
			watch(data, (newData) => {
				if (newData) {
					if (parseInt(newData) > 0) {
						deletedCount.value = parseInt(newData);
						if (result.type === "site") {
							descriptionDialog.value = `There are ${newData} activity plans related to this site will be deleted.`;
						} else {
							descriptionDialog.value = `There are ${newData} sites that use this ${type.value.toUpperCase()} will be deleted.`;
						}
					} else {
						deletedCount.value = 0;
					}
				}
				isShowModalConfirmation.value = true;
			});
			watch(error, (newError) => {
				if (newError) {
					Notification.error({
						title: "Error",
						message: newError,
					});
				}
			});
		} else if (typeDialog.value === "edit") {
			messageDialog.value = "Are you sure want to update this data?";
			const { data, error } = useFetch({
				url: `/api/site/count-by-${result.type}/${result.row.value}`,
			});
			watch(data, (newData) => {
				if (newData) {
					if (parseInt(newData) > 0) {
						deletedCount.value = parseInt(newData);
						descriptionDialog.value = `There are ${newData} sites that use this ${type.value.toUpperCase()} will be updated.`;
					} else {
						deletedCount.value = 0;
					}
				}
				isShowModalConfirmation.value = true;
			});
			watch(error, (newError) => {
				if (newError) {
					Notification.error({
						title: "Error",
						message: newError,
					});
				}
			});
		}
	} else {
		Nofitication.error({
			title: "Error",
			message: "Please try again",
		});
	}
};

const handleCancelModal = () => {
	isShowModalConfirmation.value = false;
	messageDialog.value = null;
	descriptionDialog.value = null;
};

const handleConfirmModal = () => {
	if (typeDialog.value === "delete") {
		handleDelete();
		isShowModalConfirmation.value = false;
	} else if (typeDialog.value === "edit") {
		if (type.value === "ns") {
			handleUpdateNS({ row: row.value, index: index.value });
			isShowModalConfirmation.value = false;
		} else if (type.value === "do") {
			handleUpdateDO({ row: row.value, index: index.value });
			isShowModalConfirmation.value = false;
		}
	}
};

const handleDelete = () => {
	isShowModalConfirmation.value = false;
	let url = "";
	if (type.value === "site") {
		url = "/api/site/" + row.value.siteID;
	} else if (type.value === "ns") {
		url = "/api/ns-departemen/" + row.value.value;
	} else if (type.value === "do") {
		url = "/api/do-subdepartemen/" + row.value.value;
	}

	const { status, error } = useFetch({
		url: url,
		method: "DELETE",
	});

	watch(status, (newStatus) => {
		if (newStatus === "success") {
			if (type.value === "site") {
				sites.value.data.splice(index.value, 1);
			} else if (type.value === "ns") {
				nsDepartmentOptions.value.splice(index.value, 1);
			} else if (type.value === "do") {
				doSubDepartmentOptions.value.splice(index.value, 1);
			}

			let message = "";
			if (type.value === "site") {
				message = `Site ${row.value.siteID} has been deleted`;
			} else if (type.value === "ns") {
				message = `NS ${row.value.label} has been deleted`;
			} else if (type.value === "do") {
				message = `DO ${row.value.label} has been deleted`;
			}

			if (deletedCount.value > 0 && type.value !== "site") {
				if (sitesParams.value.page > 1) {
					sitesParams.value = {
						...sitesParams.value,
						page: 1,
					};
				} else {
					sites.value.doFetch();
				}
			}

			// reset modal
			deletedCount.value = 0;
			row.value = null;
			index.value = null;
			type.value = null;

			Notification.success({
				title: "Success",
				message: message,
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
};

// ==========================

// NS Department
const urlNsDepartment = ref(null);
const nsDepartment = useFetch({
	url: urlNsDepartment,
});
const nsDepartmentOptions = ref([]);

// DO Sub-Department
const urlDoSubDepartment = ref(null);
const doSubDepartment = useFetch({
	url: urlDoSubDepartment,
});
const doSubDepartmentOptions = ref([]);

// Kabupaten
const urlKabupaten = ref(null);
const kabupaten = useFetch({
	url: urlKabupaten,
});
const kabupatenOptions = ref([]);

onMounted(async () => {
	urlNsDepartment.value = "/api/ns-departemen";
	urlDoSubDepartment.value = "/api/do-subdepartemen";
	urlKabupaten.value = "/api/kabupaten";
	urlSearchSite.value = "/api/site/search";
	nsDepartment.doFetch();
	doSubDepartment.doFetch();
	kabupaten.doFetch();
	searchSites.doFetch();

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

// Handle Update
const handleUpdateNS = (result) => {
	if (result) {
		const body = new FormData();
		body.append("name", result.row.label);
		const { data, error } = useFetch({
			url: "/api/ns-departemen/" + result.row.value,
			method: "PUT",
			body,
		});

		watch(data, (newData) => {
			if (newData) {
				Notification.success({
					title: "Success",
					message: `NS ${
						nsDepartmentOptions.value[result.index].label
					} has been updated`,
				});
				nsDepartmentOptions.value[result.index].label = newData.nama;

				if (deletedCount.value > 0 && type.value !== "site") {
					if (sitesParams.value.page > 1) {
						sitesParams.value = {
							...sitesParams.value,
							page: 1,
						};
					} else {
						sites.value.doFetch();
					}
				}

				// reset modal
				deletedCount.value = 0;
				row.value = null;
				index.value = null;
				type.value = null;
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
	}
};

const handleUpdateDO = (result) => {
	if (result) {
		const body = new FormData();
		body.append("name", result.row.label);
		const { data, error } = useFetch({
			url: "/api/do-subdepartemen/" + result.row.value,
			method: "PUT",
			body,
		});

		watch(data, (newData) => {
			if (newData) {
				Notification.success({
					title: "Success",
					message: `DO ${
						doSubDepartmentOptions.value[result.index].label
					} has been updated`,
				});
				doSubDepartmentOptions.value[result.index].label = newData.nama;

				if (deletedCount.value > 0 && type.value !== "site") {
					if (sitesParams.value.page > 1) {
						sitesParams.value = {
							...sitesParams.value,
							page: 1,
						};
					} else {
						sites.value.doFetch();
					}
				}

				// reset modal
				deletedCount.value = 0;
				row.value = null;
				index.value = null;
				type.value = null;
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
	}
};
</script>
