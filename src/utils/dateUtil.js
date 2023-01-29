const getWeekInYear = () => {
	// get current date
	const date = new Date();
	// get first day of year
	const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
	// calculate full weeks to current date
	const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
	// return week number
	return Math.floor((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
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
	const year = new Date().getFullYear();
	const firstDayOfYear = new Date(year, 0, 1);
	const lastDayOfYear = new Date(year, 11, 31);
	const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
	return Math.ceil((lastDayOfYear - firstDayOfYear) / millisecondsPerWeek);
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
};
