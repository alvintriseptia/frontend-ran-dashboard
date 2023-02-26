module.exports = {
	base: "/",
	title: "Documentation",
	description: "Manual Guide Dashboard Squad & Availability",
	themeConfig: {
		sidebar: {
			"/": "auto" /* automatically generate single-page sidebars */,
			"/admin/": "auto" /* automatically generate single-page sidebars */,
			"/user/": "auto" /* automatically generate single-page sidebars */,
		},
		nav: [
			{ text: "Dashboard", link: "localhost:5173" },
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
};
