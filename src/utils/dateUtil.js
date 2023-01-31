const convertDateToDDMMMYY = (date) => {
	const d = new Date(date);
	const day = d.getDate();
	const month = d.toLocaleString("id-ID", { month: "short" });
	const year = d.getFullYear().toString().substring(-2);
	return `${day} ${month} ${year}`;
};

const getWeekInYear = () => {
	// get current date
	const date = new Date();
	// get first day of year
	const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
	// calculate elapsed days since first day of year
	const pastDaysOfYear = (date - firstDayOfYear) / 8.64e7;
	// return week number
	return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

const getWeekOfMonth = (month) => {
	if (month >= 0 && month < 12) {
		// get current date to get the year
		const date = new Date();

		// get first day of month
		const firstOfMonth = new Date(date.getFullYear(), month, 1);

		// get last day of month
		const lastOfMonth = new Date(date.getFullYear(), month + 1, 0);

		// calculate used days (first day of month + last day of month)
		const used = firstOfMonth.getDay() + lastOfMonth.getDate();

		// return week number
		return Math.ceil(used / 7);
	}
};

const getTotalWeeks = () => {
	const weekInMonth = Array.from({ length: 12 }, (_, i) => getWeekOfMonth(i));
	return weekInMonth.reduce((a, b) => a + b, 0);
};

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export default {
	getWeekInYear,
	getWeekOfMonth,
	getTotalWeeks,
	monthNames,
	convertDateToDDMMMYY,
};
