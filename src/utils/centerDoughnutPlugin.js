export const centerDoughnutPlugin = {
	id: "center-text",
	beforeDraw: (chart) => {
		// get canvas width and height
		const width = chart.width;
		const height = chart.height;
		const ctx = chart.ctx;

		// get text to display
		ctx.restore();
		let fontSize = (height / 114).toFixed(2);
		ctx.font = "bold " + fontSize + "em helvetica";
		ctx.textBaseline = "middle";

		// get total done and not done
		const totalDone = chart.config.data.datasets[0].data[0];
		const totalNotDone = chart.config.data.datasets[0].data[1];
		let percentage = ((totalDone / (totalDone + totalNotDone)) * 100).toFixed(
			1
		);

		// if last digit is 0, remove it
		if (percentage % 1 === 0) {
			percentage = Math.round(percentage);
		}

		// display text
		let text = "";
		if (isNaN(percentage)) {
			text = "Tidak ada data";
			ctx.font = fontSize + "em helvetica";
			ctx.fillStyle = colorsTheme.gray;
		} else {
			text = percentage + "%";
		}

		let textX = Math.round((width - ctx.measureText(text).width) / 2);
		let textY = height / 1.87;

		ctx.fillText(text, textX, textY);
		ctx.save();
	},
};
