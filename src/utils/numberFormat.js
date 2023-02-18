const currencyFormat = (value) => {
	const formatter = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	});
	return formatter.format(value);
};

const digitFormat = (value) => {
	const formatter = new Intl.NumberFormat("id-ID", {
		minimumFractionDigits: 0,
	});
	return formatter.format(value);
};

const resetCurrencyFormat = (value) => {
	const newValue = value.replace(/[^0-9]/g, "");
	return newValue;
};

export default {
	currencyFormat,
	digitFormat,
	resetCurrencyFormat,
};
