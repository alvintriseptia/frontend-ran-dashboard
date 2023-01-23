/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#ed1c24",
				secondary: "#ff9d0b",
			},
		},
	},
	plugins: [],
};
