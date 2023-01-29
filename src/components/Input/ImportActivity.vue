<template>
	<div
		class="w-full md:w-[400px] p-8 h-full fixed top-0 bottom-0 bg-white transition-all duration-500 overflow-y-auto"
		:class="isShow ? 'right-0' : '-right-full'"
	>
		<div class="flex justify-between items-center mb-6">
			<h2 class="text-lg lg:text-xl font-bold">Import Activities</h2>
			<OutlinedButton size="sm" @onClick="$emit('closeImportActivities')"
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
			<OutlinedButton>Download Template</OutlinedButton>
		</section>
		<section>
			<el-upload
				action="/"
				:auto-upload="false"
				drag
				:limit="1"
				:on-change="handleChange"
				:on-remove="handleRemove"
				:file-list="file"
				accept=".xlsx"
				type="primary"
			>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">Pilih file atau arahkan file ke sini</div>
			</el-upload>
		</section>
		<section class="mt-6">
			<Button @onClick="$emit('closeImportActivities')">Import</Button>
		</section>
	</div>
</template>

<script setup>
import { OutlinedButton, Button } from "@/components";
import { computed, ref } from "vue";

const file = ref([]);

const props = defineProps({
	isShow: {
		type: Boolean,
		default: false,
	},
});

const isShow = computed(() => props.isShow);

const handleChange = (file, fileList) => {
	file.value = fileList;
};

const handleRemove = (file, fileList) => {
	file.value = fileList;
};
</script>
