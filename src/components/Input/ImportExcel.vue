<template>
	<div
		class="w-full md:w-[400px] p-8 h-full fixed top-0 bottom-0 bg-white transition-all duration-500 overflow-y-auto z-40 import-activity"
		:class="isShow ? 'right-0' : '-right-full'"
	>
		<div class="flex justify-between items-center mb-6">
			<h2 class="text-lg lg:text-xl font-bold">{{ title }}</h2>
			<OutlinedButton size="sm" @onClick="emit('closeImportExcel')"
				>&#10006;</OutlinedButton
			>
		</div>
		<section class="mb-4">
			<h3 class="font-medium mb-1">Petunjuk</h3>
			<ul class="list-disc list-inside text-sm">
				<li>
					File harus berisi data dan formatnya sesuai dengan template yang telah
					disediakan
				</li>
				<li>
					File yang diupload harus berupa file excel dengan ekstensi .xlsx
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
				:limit="1"
				:on-change="handleChange"
				:on-remove="handleRemove"
				:file-list="files"
				accept=".xlsx"
				type="primary"
			>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">Pilih file atau arahkan file ke sini</div>
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
	files.value = fileList;
};

const handleRemove = (file, fileList) => {
	excelFile.value = file;
	files.value = fileList;
};

// Handle Import Activity
const handleImport = () => {
	const body = new FormData();
	body.append("upfile", excelFile.value.raw);

	// console.log(activityStatusParams);
	const { data, loading, error } = useFetch({
		url: props.url,
		method: "POST",
		body,
	});

	watch(data, (newData) => {
		if (newData) {
			Loading.service().close();
			emit("closeImportExcel", {
				isRefresh: newData[0] !== null,
				data: newData,
			});
		}
	});

	watch(error, (newError) => {
		if (newError) {
			Loading.service().close();
			Notification.error({
				title: "Error",
				message: newError,
			});
		}
	});

	watch(loading, (newLoading) => {
		if (newLoading) {
			Loading.service({
				lock: true,
				spinner: "el-icon-loading",
				background: "rgba(0, 0, 0, 0.3)",
				fullscreen: true,
			});
		} else {
			Loading.service().close();
		}
	});
};
</script>
