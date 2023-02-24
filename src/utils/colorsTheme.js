const primary = "#FF0000";
const orange = "#FF7723";
const lightRed = "#FBF6F6";
const green = "rgb(22, 163, 74)";
const gray = "rgb(107, 114, 128)";
const lightGray = "rgb(229, 231, 235)";
const dark = "#333";
const white = "#fff";
const yellow = "#FFD700";

const defaultPastelColors = [
	"#77dd77",
	"#89cff0",
	"#99c5c4",
	"#9adedb",
	"#b2fba5",
	"#cb99c9",
	"#E4DCCF",
	"#fdfd96",
	"#ff964f",
	"#ff6961",
	"#ff9899",
	"#6096B4",
	"#FFF2F2",
	"#E8F3D6",
	"#C8FFD4",
	"#FFD1D1",
	"#FFF5E4",
];

const getPastelColor = (index) => {
	if (index < defaultPastelColors.length) {
		return defaultPastelColors[index];
	}

	const startNumber = (index % 10) * 40;
	const totalColors = 40 * (index + 1.5);

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
