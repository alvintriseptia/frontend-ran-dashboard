const toCapitalize = (str) => {
	const strArr = str.trim().split(" ");

	const strArrCapitalize = strArr.map((str) => {
		return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	});

	return strArrCapitalize.join(" ");
};

export default { toCapitalize };
