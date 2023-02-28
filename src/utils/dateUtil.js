const convertDateToDDMMMYY = (date) => {
	const d = new Date(date);
	if (d instanceof Date && !isNaN(d)) {
		const day = d.getDate();
		const month = d.getMonth() + 1;
		const year = d.getFullYear();
		return `${day}/${month}/${year}`;
	} else {
		return "";
	}
};

const convertDateToMMMDDYY = (date) => {
	const d = new Date(date);
	if (d instanceof Date && !isNaN(d)) {
		const day = d.getDate();
		// get month name
		const month = d.toLocaleString("default", { month: "short" });
		const year = d.getFullYear();
		return `${month}, ${day} ${year}`;
	} else {
		return "";
	}
};

const convertDateToMMMDDYYHHMM = (date) => {
	const d = new Date(date);
	if (d instanceof Date && !isNaN(d)) {
		const day = d.getDate();
		// get month name
		const month = d.toLocaleString("default", { month: "short" });
		const year = d.getFullYear();

		const hours = d.getHours();
		let minutes = d.getMinutes();
		// if minutes < 10, add 0
		if (parseInt(minutes) < 10) {
			minutes = "0" + minutes;
		}

		return `${month}, ${day} ${year} ${hours}:${minutes} WIB`;
	} else {
		return "";
	}
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

const resetDateFormat = (date) => {
	const d = new Date(date);
	d.setDate(d.getDate() + 1);

	// get date
	const result = d.toISOString().split("T")[0];
	return result;
};

const convertDateToLocaleString = (date) => {
	const d = new Date(date);
	if (d instanceof Date && !isNaN(d)) {
		//if is still today, return hour
		if (d.toDateString() === new Date().toDateString()) {
			return d.toLocaleString("en-US", {
				hour: "numeric",
				minute: "numeric",
				hour12: true,
			});
		} else {
			return d.toLocaleString();
		}
	} else {
		return "";
	}
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
	convertDateToMMMDDYY,
	resetDateFormat,
	convertDateToLocaleString,
	convertDateToMMMDDYYHHMM,
};
