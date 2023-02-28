<template>
	<input ref="inputRef" class="el-input__inner" type="text" />
</template>

<script>
import { useCurrencyInput } from "vue-currency-input";

export default {
	name: "CurrencyInput",
	setup(props) {
		const currencyOptions = {
			currency: "IDR",
			currencyDisplay: "symbol",
			locale: "id-ID",
			min: null,
			max: null,
		};
		const { inputRef } = useCurrencyInput(currencyOptions);

		return { inputRef };
	},
};
</script>
