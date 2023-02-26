<template>
  <div
    class="p-4 border border-gray-200 rounded-lg bg-white overflow-y-auto overflow-x-hidden"
    :style="{ maxHeight: maxHeight }"
  >
    <div class="mb-4">
      <el-alert
        v-if="alert.title"
        :type="alert.type"
        show-icon
        class="overflow-x-auto"
        @close="alert.title = ''"
      >
        <p class="text-sm font-semibold mb-2">
          {{ alert.title }}
        </p>

        <div
          v-for="(item, index) in alert.description"
          :key="index"
          class="mb-2"
        >
          <!-- info error -->
          <p class="text-xs font-medium mb-1">
            {{ index + 1 }}. {{ item.info }} in rows :
          </p>

          <!-- If Information data is just a row number -->
          <div
            v-if="!regex.test(item.data[0])"
            class="pl-2"
          >
            <ul class="text-xs">
              <li
                v-for="(value, idx) in item.data"
                :key="idx"
              >
                {{ value }}
              </li>
            </ul>
          </div>

          <!-- If Information data is not just a row number -->
          <div 
            v-else
            class="pl-2 flex flex-wrap flex-col max-h-[400px] gap-x-6 "
          >
            <p
              v-for="(value, idx) in item.data"
              :key="idx"
              class="text-xs"
            >
              {{ value }}
            </p>
          </div>
        </div>
      </el-alert>

      <div class="flex justify-between gap-x-2 items-center">
        <h2
          class="text-xl font-bold"
          :class="{
            'mt-4': alert.title,
          }"
        >
          {{ title }}
        </h2>
        <div>
          <slot name="header" />
        </div>
      </div>

      <p
        v-if="subtitle"
        class="text-sm text-gray-500"
      >
        {{ subtitle }}
      </p>
    </div>
    <slot />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	subtitle: {
		type: String,
		default: "",
	},
	maxHeight: {
		type: String,
		default: "auto",
	},
	alert: {
		type: Object,
		default: null,
	},
});

const alert = computed(() => {
	if (props.alert) {
		return {
			title: props.alert.title,
			type: props.alert.type,
			description: props.alert.description,
		};
	} else {
		return {
			title: "",
			type: "",
			description: "",
		};
	}
});

// regex to decide if data contain any other row
const regex = new RegExp("^row [0-9]+$");
</script>
