<template>
	<section class="relative">
		<div
			class="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-300 shadow-lg transform -skew-y-3 rounded-3xl"
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
					<h2 class="text-xl font-bold">Reset Account</h2>
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
					size="small"
				>
					<el-form-item label="Username" prop="oldUsername">
						<el-input v-model="ruleForm.oldUsername" />
						<el-checkbox v-model="isChangeUsername" class="mt-2">
							Create new username
						</el-checkbox>
					</el-form-item>

					<el-form-item
						v-if="isChangeUsername"
						label="New Username"
						prop="username"
					>
						<el-input v-model="ruleForm.username" />
					</el-form-item>

					<el-form-item label="Password" prop="password">
						<el-input v-model="ruleForm.password" show-password />

						<p class="text-xs text-gray-500 max-w-[300px]">
							<strong>Note: </strong> Make sure your password is saved in your
							password manager.
						</p>
					</el-form-item>

					<el-form-item label="Confirm Password" prop="confirmPassword">
						<el-input v-model="ruleForm.confirmPassword" show-password />
					</el-form-item>

					<el-form-item>
						<Button
							size="custom"
							class="w-full"
							@onClick="submitForm('ruleForm')"
						>
							Reset
						</Button>
					</el-form-item>
				</el-form>

				<router-link
					to="/login"
					class="text-center block text-sm font-semibold text-secondary hover:text-orange-600 mt-4"
				>
					Back to Login
				</router-link>
			</div>
		</section>
	</section>
</template>
<script>
import { Button } from "@/components";
import { useFetch } from "@/composables";

export default {
	components: {
		// eslint-disable-next-line vue/no-reserved-component-names
		Button,
	},
	data() {
		return {
			ruleForm: {
				oldUsername: "",
				username: "",
				password: "",
				confirmPassword: "",
			},
			rules: {
				oldUsername: [
					{ required: true, message: "Please input username", trigger: "blur" },
				],
				username: [],
				password: [
					{ required: true, message: "Please input password", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							//"Password must contain at least 1 uppercase, 1 lowercase, and 1 number"
							const regexExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
							if (value.length < 8) {
								callback(new Error("Password must be at least 8 characters"));
							} else if (!regexExp.test(value)) {
								callback(
									new Error(
										"Password must contain at least 1 uppercase, 1 lowercase, and 1 number"
									)
								);
							} else {
								callback();
							}
						},
					},
				],
				confirmPassword: [
					{
						required: true,
						message: "Please input confirm password",
						trigger: "blur",
					},
					{
						validator: (rule, value, callback) => {
							if (value === this.ruleForm.password) {
								callback();
							} else {
								callback(new Error("Please input same password"));
							}
						},
						trigger: "blur",
					},
				],
			},
			loading: false,
			isChangeUsername: false,
		};
	},
	watch: {
		isChangeUsername() {
			if (this.isChangeUsername) {
				this.rules.username = [
					{
						required: true,
						message: "Please input new username",
						trigger: "blur",
					},
				];
			} else {
				this.rules.username = [];
			}
		},
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.loading = true;
					const body = new FormData();

					const username = this.ruleForm.username
						? this.ruleForm.username
						: this.ruleForm.oldUsername;

					body.append("username", username);
					body.append("password", this.ruleForm.password);

					// console.log(activityStatusParams);
					const { data, status, message } = useFetch({
						url: "/api/auth/user/reset/" + this.ruleForm.oldUsername,
						method: "PUT",
						body,
					});

					const unwatch = this.$watch(
						() => [data.value, status.value, message.value],
						([newData, newStatus, newMessage]) => {
							if (newStatus === "success" && newData) {
								// reset form
								this.ruleForm = {
									oldUsername: "",
									username: "",
									password: "",
									confirmPassword: "",
								};

								this.$refs[formName].resetFields();

								this.$notify.success({
									title: "Success",
									message: "User has been reset, please login again",
								});

								unwatch();
							} else if (newStatus === "error" && newMessage) {
								this.$notify.error({
									title: "Error",
									message: newMessage,
								});
								unwatch();
							}
						}
					);
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
