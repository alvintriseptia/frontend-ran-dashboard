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
							<div>
								<Button
									@onClick="handleShowModalConfirmation"
									:disabled="removeButtonDisabled === 'site' ? false : true"
									type="primary"
									size="sm"
									>Delete</Button
								>
							</div>
							<div class="flex items-center">
								<el-pagination
									:page-size="10"
									:pager-count="5"
									layout="prev, pager, next"
									:total="100"
									@current-change="() => {}"
								>
								</el-pagination>
								<div class="flex items-center">
									<div class="max-w-[80px]">
										<Select
											:options="limits"
											@onChange="() => {}"
											placeholder="Rows per page"
										/>
									</div>
									<p class="text-xs ml-2">Rows per page</p>
								</div>
							</div>
						</section>
						<section>
							<SettingTable
								@onUpdate="handleRemoveButton"
								:data="siteData"
								:numberStart="1"
								@onRemove="handleShowModalConfirmation"
								@onEdit="handleEdit"
								type="site"
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
								:data="nsData"
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
								ref="formNS"
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
								:data="doData"
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
								ref="formDO"
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
			:title="isEdit ? 'Edit Site' : 'Input Site'"
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
} from "@/components";
import { ref } from "vue";

// Tabs
const activeName = ref("site");
const handleTabClick = (tab) => {
	activeName.value = tab.name;
};

// Sites
const siteData = [
	{
		id: "SMG006",
		name: "Tembalang Semarang",
		namaNS: "Semarang",
		namaDO: "Semarang",
		namaKabupaten: "Kota Semarang",
	},

	{
		id: "SMG008",
		name: "Banyumanik Semarang",
		namaNS: "Semarang",
		namaDO: "Semarang",
		namaKabupaten: "Kota Semarang",
	},
	{
		id: "SMG009",
		name: "Semarang",
		namaNS: "Semarang",
		namaDO: "Semarang",
		namaKabupaten: "Kota Semarang",
	},
];

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

// NS
const nsData = [
	{
		namaNS: "Semarang",
	},

	{
		namaNS: "Semarang",
	},
	{
		namaNS: "Semarang",
	},
];

// DO
const doData = [
	{
		namaDO: "Semarang",
	},

	{
		namaDO: "Semarang",
	},
	{
		namaDO: "Semarang",
	},
];

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

const closeInput = () => {
	isShowInput.value = false;
};

// Menu Input Table NS
const isShowInputTableNS = ref(false);
const showInputTableNS = () => {
	isShowInputTableNS.value = !isShowInputTableNS.value;
};

const formNS = ref({
	namaNS: "",
});

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
		formNS.value.validate((valid) => {
			if (valid) {
				console.log("submit!");
			} else {
				console.log("error submit!!");
				return false;
			}
		});
	else {
		formDO.value.validate((valid) => {
			if (valid) {
				console.log("submit!");
			} else {
				console.log("error submit!!");
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

// Form
const handleEdit = (data) => {
	if (data.row.id) {
		showInput("edit");
	}
};
</script>
