<template>
  <el-popover
    v-model="visible"
    placement="bottom"
    width="100"
  >
    <div class="flex flex-col gap-y-2 justify-center items-center m-0">
      <el-popover
        v-model="datePickerVisible"
        placement="right-end"
      >
        <div class="flex flex-col gap-y-2">
          <el-date-picker
            v-model="date"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="Pick a day"
            :picker-options="pickerOptions"
          />
          <div class="flex justify-around">
            <el-button
              type="danger"
              size="mini"
              @click="datePickerVisible = false"
            >
              Cancel
            </el-button>
            <el-button
              type="success"
              size="mini"
              @click="handleDone"
            >
              Submit
            </el-button>
          </div>
        </div>
        <button
          slot="reference"
          class="w-full text-gray-500 text-sm border border-transparent hover:border-green-500 transition-all hover:text-green-500"
          :class="{
            'text-green-500': status === 'Done',
          }"
          @click="handleDatePicker"
        >
          Done
        </button>
      </el-popover>
      <button
        class="w-full text-gray-500 text-sm border border-transparent hover:border-orange-500 transition-all hover:text-orange-500"
        :class="{
          'text-orange-500': status === 'Not Yet',
        }"
        @click="handleNotYet"
      >
        Not Yet
      </button>
    </div>
    <el-tag
      slot="reference"
      size="small"
      :type="status === 'Done' ? 'success' : 'warning'"
      :style="{
        cursor: 'pointer',
      }"
    >
      {{ status }}
    </el-tag>
  </el-popover>
</template>

<script>
export default {
	name: "PopOverStatus",
	props: {
		status: {
			type: String,
			default: "Done",
		},
	},
	emits: ["onUpdate"],
	data() {
		return {
			visible: false,
			datePickerVisible: false,
			date: null,
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() > Date.now();
				},
			},
		};
	},
	methods: {
		handleNotYet() {
			if (this.status === "Not Yet") {
				this.visible = !this.visible;
				return;
			}
			this.visible = !this.visible;
			const status = "NY";
			this.$emit("onUpdate", { status });
		},
		handleDone() {
			this.visible = !this.visible;
			this.datePickerVisible = !this.datePickerVisible;
			const status = "Done";
			this.$emit("onUpdate", { status, date: this.date });
		},
		handleDatePicker() {
			if (this.status === "Done") {
				this.visible = !this.visible;
				this.datePickerVisible = !this.datePickerVisible;
				return;
			}
		},
	},
};
</script>
