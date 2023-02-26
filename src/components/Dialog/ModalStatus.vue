<template>
  <el-dialog
    title="Update Status"
    :visible.sync="dialogFormVisible"
    :fullscreen="data.size > 4"
    :close-on-click-modal="false"
    @close="onCancel"
    @closed="() => {}"
  >
    <section class="grid grid-cols-12 gap-5">
      <section
        v-for="(row, index) in data"
        :key="index"
        class="col-span-12 border p-2"
        :class="data.size > 4 ? 'md:col-span-6' : 'md:col-span-12'"
      >
        <div class="mb-2">
          <h3 class="text-lg font-semibold">
            {{ index + 1 }}
          </h3>
        </div>

        <div class="flex gap-x-6">
          <div>
            <h4 class="text-sm">
              Program
            </h4>
            <h4 class="text-sm">
              Sub Program
            </h4>
            <h4 class="text-sm">
              Activity
            </h4>
          </div>
          <div>
            <h4 class="text-sm">
              :
            </h4>
            <h4 class="text-sm">
              :
            </h4>
            <h4 class="text-sm">
              :
            </h4>
          </div>
          <div>
            <h4 class="text-sm">
              {{ row[1].namaProgram }}
            </h4>
            <h4 class="text-sm">
              {{ row[1].namaSubprogram }}
            </h4>
            <h4 class="text-sm">
              {{ row[1].deskripsiActivity }}
            </h4>
          </div>
        </div>

        <div class="my-4">
          <p class="mb-1 font-semibold">
            Sites <strong class="text-primary">*</strong>
          </p>
          <div class="max-h-[300px] overflow-y-auto py-2">
            <RemoteSearchSelect
              :options="searchSites[row[1].activityId]"
              :default-value="row[1].sites"
              label-option="siteID"
              value-option="siteID"
              :collapse-tags="false"
              placeholder="Sites"
              class="w-full"
              @onChange="(query) => handleSearchSites(query, row[1].activityId)"
              @onUpdate="(value) => handleUpdateSite(value, row[1].activityId)"
            />
          </div>
        </div>

        <div class="mb-4">
          <p class="mb-1 font-semibold">
            Plan Status <strong class="text-primary">*</strong>
          </p>
          <el-select
            v-model="row[1].status.value"
            class="w-[150px]"
            placeholder="Select Status"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div v-if="row[1].status.value === 'Done'">
          <p class="mb-1 font-semibold">
            Plan Execution <strong class="text-primary">*</strong>
          </p>
          <el-date-picker
            v-model="row[1].dateExecuted.value"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="Pick a day"
            :picker-options="pickerOptions"
          />
        </div>
      </section>
    </section>

    <el-alert
      v-if="isShowAlert"
      title="Please fill all required fields"
      type="error"
      show-icon
      class="mt-6"
      @close="isShowAlert = false"
    />
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="onCancel">Cancel</el-button>
      <el-button
        type="primary"
        @click="validateForm"
      >Update</el-button>
    </span>

    <ModalConfirmation
      :is-modal-visible="isShowModalConfirmation"
      title="Confirmation"
      :message="`Are you sure want to update ${totalPlan} plan activity?`"
      :append-to-body="true"
      @onCancel="toggleShowModalConfirmation(false)"
      @onSubmit="onSubmit"
    />
  </el-dialog>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { RemoteSearchSelect, ModalConfirmation } from "@/components";
import axios from "axios";
import { Notification } from "element-ui";
import { debounce } from "vue-debounce";

// Variables
const emit = defineEmits(["onSubmit", "onCancel"]);
const props = defineProps({
	activities: {
		type: Map,
		required: true,
	},
	isModalVisible: {
		type: Boolean,
		required: true,
	},
});
const activities = computed(() => props.activities);
const data = ref(new Map());
const isShowAlert = ref(false);

const totalPlan = ref(0);
const countTotalPlan = (plan) => {
	let total = 0;

	if (plan) {
		for (let value of plan.values()) {
			total += value.sites.length;
		}
	}

	return total;
};

const isShowModalConfirmation = ref(false);
const toggleShowModalConfirmation = (value) => {
	isShowModalConfirmation.value = value;
};

// on mounted
onMounted(() => {
	watch(
		() => props.isModalVisible,
		(val) => {
			console.log("new value");
			console.log(activities.value);
			data.value = new Map(activities.value);
			console.log(data.value);
			totalPlan.value = countTotalPlan(activities.value);
		}
	);
});

function validateForm() {
	let isValid = true;
	// validate data
	for (const [key, value] of data.value) {
		if (value.status.value === "Done" && !value.dateExecuted.value) {
			isValid = false;
			break;
		}
		if (value.sites.length === 0) {
			isValid = false;
			break;
		}
		if (!value.status.value) {
			isValid = false;
			break;
		}
	}

	if (!isValid) {
		isShowAlert.value = true;
		return;
	} else {
		toggleShowModalConfirmation(true);
	}
}

function onSubmit() {
	const dataToSubmit = Array.from(data.value.values()).map((item) => {
		return {
			activityId: item.activityId,
			sites: item.sites,
			status: item.status.value,
			dateExecuted: item.dateExecuted.value,
		};
	});
	toggleShowModalConfirmation(false);
	emit("onSubmit", dataToSubmit);
}

function onCancel() {
	emit("onCancel");
}

const dialogFormVisible = computed(() => props.isModalVisible);

const pickerOptions = {
	disabledDate(time) {
		return time.getTime() > Date.now();
	},
};

// Status Options
const statusOptions = [
	{
		value: "Not Yet",
		label: "Not Yet",
	},
	{
		value: "Done",
		label: "Done",
	},
];

// Sites data
const urlSearchSites = "/api/activity-plan/search";
const searchSites = ref([{}]);

const handleSearchSites = debounce(async (query, activityId) => {
	try {
		const response = await axios.get(urlSearchSites, {
			params: {
				activityId,
				site: query,
			},
		});

		if (response.data.status === "success") {
			searchSites.value = {
				...searchSites.value,
				[activityId]: response.data.data,
			};
		} else {
			if (res.data.message === "Unauthorized") {
				window.location.replace("/login");
			}
			Notification.error({
				title: "Error",
				message: response.data.message,
			});
		}
	} catch (error) {
		if (!error.response) {
			// network error
			Notification.error({
				title: "Error",
				message: "Network Error",
			});
		} else {
			if (error.response.data.message === "Unauthorized") {
				window.location.replace("/login");
			}
			Notification.error({
				title: "Error",
				message: error.response.data.message,
			});
		}
	}
}, "400ms");

const handleUpdateSite = (value, activityId) => {
	const activity = data.value.get(activityId);
	activity.sites = value;

	totalPlan.value = countTotalPlan(data.value);
};
</script>
