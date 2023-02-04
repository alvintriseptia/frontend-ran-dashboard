<template>
	<section
		class="p-4 border border-gray-200 rounded-lg bg-white overflow-auto flex flex-col gap-y-6 min-w-[300px]"
		v-loading="loading"
	>
		<div>
			<div class="flex gap-x-2 items-center mb-2">
				<img
					src="@/assets/images/telkomsel-logo.png"
					alt="telkomsel-logo"
					class="w-6 h-6 object-contain"
				/>
				<h2 class="text-xl font-bold">Log in</h2>
			</div>
			<p class="text-sm text-gray-500">Choose your account to login</p>
		</div>

		<el-button type="primary" @click="loginGuest">Login as Guest</el-button>

		<hr class="w-full" />

		<div>
			<el-form
				:model="ruleForm"
				:rules="rules"
				ref="ruleForm"
				label-width="120px"
				label-position="top"
			>
				<el-form-item label="Username" prop="username">
					<el-input v-model="ruleForm.username"></el-input>
				</el-form-item>
				<el-form-item label="Password" prop="password">
					<el-input type="password" v-model="ruleForm.password"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')"
						>Login</el-button
					>
				</el-form-item>
			</el-form>
		</div>
	</section>
</template>
<script>
import { Card } from "@/components";
import { userStore } from "@/stores";

export default {
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
		loginGuest() {
			this.loading = true;
			userStore
				.dispatch("loginGuest")
				.then((res) => {
					if (res) {
						this.$router.push({ name: "dashboard" });
					}
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
		},
	},
	components: {
		Card,
	},
};
</script>
