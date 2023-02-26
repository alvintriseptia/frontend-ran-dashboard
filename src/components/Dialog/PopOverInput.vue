<template>
  <el-popover
    v-model="visible"
    placement="bottom"
    width="200"
  >
    <el-form
      ref="popOverForm"
      :model="form"
      label-width="80px"
      label-position="top"
    >
      <el-form-item label="">
        <el-input
          v-model="form.text"
          placeholder="Text"
        />
      </el-form-item>
      <div class="flex">
        <el-button
          size="small"
          type="warning"
          @click="visible = false"
        >
          Cancel
        </el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleClick('popOverForm')"
        >
          Update
        </el-button>
      </div>
    </el-form>

    <el-button
      slot="reference"
      type="warning"
      icon="el-icon-edit"
      circle
    />
  </el-popover>
</template>

<script>
export default {
	name: "PopOverInput",
	props: {
		text: {
			type: String,
			required: true,
		},
	},
	emits: ["onUpdate"],
	data() {
		return {
			visible: false,
			form: {
				text: this.text,
			},
			rules: {
				text: [
					{ required: true, message: "Please input text", trigger: "blur" },
				],
			},
		};
	},
	methods: {
		handleClick(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.visible = !this.visible;
					this.$emit("onUpdate", this.form.text);
				} else {
					return false;
				}
			});
		},
	},
};
</script>
