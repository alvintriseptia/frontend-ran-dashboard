<template>
	<div
		class="w-full md:w-[400px] p-8 h-full fixed top-0 bottom-0 bg-white transition-all duration-500 overflow-y-auto z-50 import-activity"
		:class="isShow ? 'right-0' : '-right-full'"
	>
		<div class="flex justify-between items-center mb-6">
			<h2 class="text-lg lg:text-xl font-bold">{{ title }}</h2>
			<OutlinedButton size="sm" @onClick="emit('closeImportExcel')"
				>&#10006;</OutlinedButton
			>
		</div>
		<section class="mb-4">
			<h3 class="font-medium mb-1">Instructions</h3>
			<ul class="list-disc list-inside text-sm">
				<li>
					File must contain data and its format must be in accordance with the
					provided template
				</li>
				<li>
					The uploaded file must be an excel file with the .xlsx extension
				</li>
			</ul>
		</section>
		<section class="mb-6">
			<h3 class="font-medium mb-1">Template</h3>
			<OutlinedButton>
				<a :href="urlTemplate" download>Download Template</a>
			</OutlinedButton>
		</section>
		<section>
			<el-upload
				action="/"
				:auto-upload="false"
				drag
				:on-change="handleChange"
				:on-remove="handleRemove"
				:file-list="files"
				accept=".xlsx"
				type="primary"
			>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">Choose a file or drag file here</div>
			</el-upload>
		</section>
		<section class="mt-6">
			<Button :disabled="excelFile.value ? true : false" @onClick="handleImport"
				>Import</Button
			>
		</section>
	</div>
</template>

<script setup>
import { OutlinedButton, Button } from "@/components";
import { Loading, Notification } from "element-ui";
import { computed, ref, watch } from "vue";
import { useFetch } from "@/composables";

const excelFile = ref({});
const files = ref([]);

const props = defineProps({
	isShow: {
		type: Boolean,
		default: false,
	},
	title: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	urlTemplate: {
		type: String,
		required: true,
	},
});

const emit = defineEmits(["closeImportExcel"]);

const isShow = computed(() => props.isShow);

const handleChange = (file, fileList) => {
	excelFile.value = file;
	files.value = [fileList[fileList.length - 1]];
};

const handleRemove = (file, fileList) => {
	excelFile.value = file;
	files.value = fileList;
};

// Handle Import Activity
const handleImport = () => {
	Loading.service({
		lock: true,
		text: "Loading...",
		spinner: "el-icon-loading",
		background: "rgba(0, 0, 0, 0.7)",
	});
	const body = new FormData();
	body.append("upfile", excelFile.value.raw);

	// console.log(activityStatusParams);
	const { data, status, message } = useFetch({
		url: props.url,
		method: "POST",
		body,
	});

	const unwatch = watch(
		[data, status, message],
		([newData, newStatus, newMessage]) => {
			if (newStatus === "success" && newData) {
				// reset current data
				excelFile.value = {};
				files.value = [];

				Loading.service().close();
				emit("closeImportExcel", {
					isRefresh: newData ? true : false,
					data: newData,
					message: newMessage ? newMessage : message.value,
				});

				unwatch();
			} else if (newStatus === "error" && newMessage) {
				Loading.service().close();
				Notification.error({
					title: "Error",
					message: newMessage,
				});

				unwatch();
			} else {
				Loading.service().close();

				unwatch();
			}
		}
	);
};
</script>
