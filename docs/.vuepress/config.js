module.exports = {
	base: "/",
	title: "Documentation",
	description: "Manual Guide Dashboard Squad & Availability",
	head: [
		[
			"link",
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/favicons/apple-touch-icon.png",
			},
		],
		[
			"link",
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/favicons/favicon-32x32.png",
			},
		],
		[
			"link",
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: "/favicons/favicon-16x16.png",
			},
		],
		["link", { rel: "manifest", href: "/favicons/site.webmanifest" }],
		[
			"link",
			{
				rel: "mask-icon",
				href: "/favicons/safari-pinned-tab.svg",
				color: "#3a0839",
			},
		],
		["link", { rel: "shortcut icon", href: "/favicons/favicon.ico" }],
		["meta", { name: "msapplication-TileColor", content: "#3a0839" }],
		[
			"meta",
			{
				name: "msapplication-config",
				content: "/favicons/browserconfig.xml",
			},
		],
		["meta", { name: "theme-color", content: "#ffffff" }],
	],
	themeConfig: {
		sidebar: {
			"/": "auto" /* automatically generate single-page sidebars */,
			"/admin/": "auto" /* automatically generate single-page sidebars */,
			"/user/": "auto" /* automatically generate single-page sidebars */,
		},
		nav: [
			{ text: "Dashboard", link: "http://ran.telkomsel" },
			{ text: "Home", link: "/" },
			{
				text: "Guide",
				ariaLabel: "Manual Guide",
				items: [
					{ text: "Admin Guide", link: "/admin/" },
					{ text: "User Guide", link: "/user/" },
				],
			},
		],
	},
	plugins: [
		[
			"@vuepress/pwa",
			{
				serviceWorker: true,
				updatePopup: true,
			},
		],
	],
};
