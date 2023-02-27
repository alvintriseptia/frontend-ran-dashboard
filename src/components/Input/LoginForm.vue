<template>
	<section class="relative">
		<div
			class="absolute inset-0 bg-gradient-to-r from-orange-300 to-red-600 shadow-lg transform -skew-y-6 rounded-3xl"
		/>
		<section
			v-loading="loading"
			class="p-4 border border-gray-200 rounded-lg bg-white overflow-hidden flex flex-col gap-y-6 min-w-[300px] relative z-10"
		>
			<div class="relative z-10 bg-white">
				<div class="flex gap-x-2 items-center">
					<img
						src="@/assets/images/telkomsel-logo.png"
						alt="telkomsel-logo"
						class="w-6 h-6 object-contain"
					/>
					<h2 class="text-xl font-bold">Log in</h2>
				</div>
			</div>
			<hr class="w-full" />
			<div>
				<el-form
					ref="ruleForm"
					:model="ruleForm"
					:rules="rules"
					label-width="120px"
					label-position="top"
				>
					<el-form-item label="Username" prop="username">
						<el-input v-model="ruleForm.username" />
					</el-form-item>
					<el-form-item label="Password" prop="password">
						<el-input v-model="ruleForm.password" show-password />
					</el-form-item>
					<el-form-item>
						<Button
							size="custom"
							class="w-full"
							@onClick="submitForm('ruleForm')"
						>
							Login
						</Button>
					</el-form-item>
				</el-form>

				<router-link
					to="/reset"
					class="text-center block text-sm font-semibold text-secondary hover:text-orange-600 mt-4"
				>
					Reset Account
				</router-link>
			</div>
		</section>
	</section>
</template>
<script>
import { userStore } from "@/stores";
import { Button } from "@/components";

export default {
	components: {
		// eslint-disable-next-line vue/no-reserved-component-names
		Button,
	},
	data() {
		return {
			ruleForm: {
				username: "",
				password: "",
			},
			rules: {
				username: [
					{ required: true, message: "Please input username", trigger: "blur" },
				],
				password: [
					{ required: true, message: "Please input password", trigger: "blur" },
				],
			},
			loading: false,
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.loading = true;
					userStore
						.dispatch("login", this.ruleForm)
						.then((res) => {
							if (res) {
								this.$router.push({ name: "dashboard" });
							}
							this.$notify.success({
								title: "Success",
								message: "Login Successful",
							});
						})
						.catch((err) => {
							if (!err.response) {
								this.$notify.error({
									title: "Error",
									message: err.message,
								});
							} else {
								this.$notify.error({
									title: "Error",
									message: err.response.data.message,
								});
							}
						});
					this.loading = false;
				} else {
					this.$notify.error({
						title: "Error",
						message: "Please fill in the form correctly",
					});
					return false;
				}
			});
		},
	},
};
</script>
