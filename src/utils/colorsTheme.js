const primary = "#FF0000";
const orange = "#FF7723";
const lightRed = "#FBF6F6";
const green = "rgb(22, 163, 74)";
const gray = "rgb(107, 114, 128)";
const lightGray = "rgb(229, 231, 235)";
const dark = "#333";
const white = "#fff";
const yellow = "#FFD700";

const getPastelColor = (index) => {
	const startNumber = (index % 10) * 40;
	const totalColors = 40 * (index + 1);

	const randomNumber = Math.random() * totalColors + startNumber;

	return "hsl(" + randomNumber + ", 80%, 65%)";
};

export default {
	primary,
	orange,
	lightRed,
	green,
	gray,
	dark,
	white,
	yellow,
	lightGray,
	getPastelColor,
};
