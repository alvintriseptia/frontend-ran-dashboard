import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";

// https://vitejs.dev/config/
export default defineConfig({
	base: `http://ran.telkomsel/`,
	resolve: {
		alias: {
			"@": "/src",
		},
	},
	plugins: [vue()],
});
