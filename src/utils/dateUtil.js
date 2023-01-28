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

export default {
	getWeekInYear,
};
