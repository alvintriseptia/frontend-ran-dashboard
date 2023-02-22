<template>
	<el-dialog
		title="Edit Activity"
		:visible.sync="dialogFormVisible"
		@close="onCancel"
		@closed="() => {}"
	>
		<section class="mb-8">
			<div class="flex gap-x-6">
				<div>
					<h4 class="font-semibold">Program</h4>
					<h4 class="font-semibold">Sub Program</h4>
					<h4 class="font-semibold">Site ID</h4>
					<h4 class="font-semibold">Site Name</h4>
				</div>
				<div>
					<h4 class="font-semibold">:</h4>
					<h4 class="font-semibold">:</h4>
					<h4 class="font-semibold">:</h4>
					<h4 class="font-semibold">:</h4>
				</div>
				<div>
					<h4 class="font-semibold">{{ row.namaProgram }}</h4>
					<h4 class="font-semibold">{{ row.namaSubprogram }}</h4>
					<h4 class="font-semibold">{{ row.siteID }}</h4>
					<h4 class="font-semibold">{{ row.siteName }}</h4>
				</div>
			</div>
			<p class="text-sm text-gray-500 mt-2">
				{{ row.deskripsiActivity }}
			</p>
		</section>
		<el-form :model="form" :rules="rules" ref="ruleForm" label-position="top">
			<el-form-item
				v-if="userStore.getters.role === 'admin'"
				label="Budget"
				:label-width="formLabelWidth"
			>
				<el-input v-model="form.budget" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item
				v-if="userStore.getters.role === 'admin'"
				type="number"
				label="Cost"
				:label-width="formLabelWidth"
				prop="cost"
			>
				<el-input v-model="form.cost" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="PIC" :label-width="formLabelWidth">
				<el-input v-model="form.pic" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="Additional Info" :label-width="formLabelWidth">
				<el-input v-model="form.additionalInfo" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="Remark" :label-width="formLabelWidth">
				<el-input v-model="form.remark" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="Target Quartal" :label-width="formLabelWidth">
				<el-select v-model="form.targetQuartal" placeholder="Select Quartal">
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="onCancel">Cancel</el-button>
			<el-button type="primary" @click="onSubmit">Update</el-button>
		</span>
	</el-dialog>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { userStore } from "@/stores";

const formLabelWidth = "120px";
const options = [
	{
		value: "All",
		label: "All",
	},
	{
		value: "Q1",
		label: "Q1",
	},
	{
		value: "Q2",
		label: "Q2",
	},
	{
		value: "Q3",
		label: "Q3",
	},
	{
		value: "Q4",
		label: "Q4",
	},
];
const emit = defineEmits(["onSubmit", "onCancel"]);
const props = defineProps({
	row: {
		type: Object,
		required: true,
	},
	isModalVisible: {
		type: Boolean,
		required: true,
	},
});

function onSubmit() {
	ruleForm.value.validate((valid) => {
		if (valid) {
			emit("onSubmit", form.value);
		} else {
			return false;
		}
	});
}
function onCancel() {
	emit("onCancel");
}

const dialogFormVisible = computed(() => props.isModalVisible);

const form = ref({
	budget: userStore.getters.role === "admin" ? props.row.budget : "",
	cost: userStore.getters.role === "admin" ? props.row.cost : "",
	additionalInfo: props.row.additionalInfo,
	remark: props.row.remark,
	targetQuartal: props.row.targetQuartal,
	activityId: props.row.activityID,
	siteId: props.row.siteID,
	pic: props.row.namaPIC,
});

const rules = ref({
	cost: [
		{
			validator: (rule, value, callback) => {
				if (value && !Number(value)) {
					callback(new Error("Please input number"));
				} else {
					callback();
				}
			},
		},
	],
});

const ruleForm = ref(null);

// watch props row
watch(
	() => props.row,
	(newVal) => {
		form.value = {
			budget: userStore.getters.role === "admin" ? newVal.budget : "",
			cost: userStore.getters.role === "admin" ? newVal.cost : "",
			additionalInfo: newVal.additionalInfo,
			remark: newVal.remark,
			targetQuartal: newVal.targetQuartal,
			activityId: newVal.activityID,
			siteId: newVal.siteID,
			pic: newVal.namaPIC,
		};
	}
);
</script>
