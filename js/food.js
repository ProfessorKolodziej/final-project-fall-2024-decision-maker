
const foods = [
	"Pizza",
	"Pasta",
	"Salad",
	"Wrap",
	"Rice Bowl",
	"Sandwich",
	"Sushi",
	"Fried Rice",
];


const COLOR_1 = "#ff4823";
const COLOR_2 = "#e6e9ee";


function initWheel() {
	const wheel = document.getElementById("wheel");
	const sectorAngle = 360 / foods.length;


	const isMobile =
		window.innerWidth <= 768 ||
		window.matchMedia("(max-device-width: 768px)").matches;


	const wheelSize = isMobile
		? document.querySelector(".wheel").offsetWidth
		: 300;
	const textRadius = isMobile ? wheelSize * 0.32 : 85;


	const wheelRadius = isMobile ? wheelSize : 150;
	const borderWidth = isMobile ? wheelSize * 0.08 : 25;
	const dotRadius = (wheelSize - borderWidth) / 2;


	let gradientString = "";
	foods.forEach((_, index) => {
		const startAngle = sectorAngle * index;
		const endAngle = sectorAngle * (index + 1);
		const color = index % 2 === 0 ? COLOR_1 : COLOR_2;
		gradientString += `${color} ${startAngle}deg ${endAngle}deg${index < foods.length - 1 ? "," : ""
			}`;
	});
	wheel.style.background = `conic-gradient(${gradientString})`;


	foods.forEach((food, index) => {
		const text = document.createElement("div");
		text.className = "sector-text";
		text.textContent = food;

		const angleInDegrees = sectorAngle * index + sectorAngle / 2;
		const angleInRadians = (angleInDegrees * Math.PI) / 180;

		const x = Math.sin(angleInRadians) * textRadius;
		const y = -Math.cos(angleInRadians) * textRadius;


		text.style.transform = `
      translate(${x}px, ${y}px)
      rotate(${angleInDegrees + 90}deg)`;

		wheel.appendChild(text);
	});


	const dots = document.createElement("div");
	dots.className = "dots";

	const numDots = 8;
	const angleStep = 360 / numDots;

	for (let i = 0; i < numDots; i++) {
		const dot = document.createElement("div");
		dot.className = "dot";

		const angle = angleStep * i;
		const x = Math.cos((angle * Math.PI) / 180) * dotRadius;
		const y = Math.sin((angle * Math.PI) / 180) * dotRadius;

		dot.style.transform = `translate(${x}px, ${y}px)`;
		dots.appendChild(dot);
	}

	//document.querySelector(".wheel-container").appendChild(dots);
}

initWheel();

let isSpinning = false;

document.getElementById("spinBtn").addEventListener("click", () => {
	if (isSpinning) return;

	isSpinning = true;
	const wheel = document.getElementById("wheel");
	const result = document.getElementById("result");
	const resultText = document.getElementById("resultText");


	resultText.textContent = "";


	wheel.style.transition = "none";

	wheel.style.setProperty("transform", "translate(-50%, -50%) rotate(0deg)");


	wheel.offsetHeight;


	wheel.style.transition = "transform 3s ease-out";


	const sectorAngle = 360 / foods.length;


	const randomSector = Math.floor(Math.random() * foods.length);


	const baseRotations = 4 + Math.floor(Math.random() * 8);
	const baseRotationDegrees = baseRotations * 360;


	const finalRotation =
		baseRotationDegrees + randomSector * sectorAngle + sectorAngle / 2;


	requestAnimationFrame(() => {
		wheel.style.setProperty(
			"transform",
			`translate(-50%, -50%) rotate(${finalRotation}deg)`
		);
	});


	wheel.addEventListener(
		"transitionend",
		function handleTransitionEnd() {
			let selectedIndex = (foods.length - randomSector) % foods.length;
			if (selectedIndex == 0) {
				selectedIndex = foods.length - 1;
			} else {
				selectedIndex -= 1;
			}
			console.log(selectedIndex);
			resultText.textContent = `${foods[selectedIndex]}`;
			result.style.display = "block";
			isSpinning = false;
			wheel.removeEventListener("transitionend", handleTransitionEnd);
		},
		{ once: true }
	);
});


document.querySelector(".wheel-center").addEventListener("click", () => {

	document.getElementById("result").style.display = "none";
	if (!isSpinning) {
		document.getElementById("spinBtn").click();
	}
});



document.querySelector(".result-close").addEventListener("click", () => {

	document.getElementById("result").style.display = "none";
});


window.addEventListener("resize", () => {
	const wheel = document.getElementById("wheel");
	wheel.innerHTML = "";

	const oldDots = document.querySelector(".dots");
	if (oldDots) oldDots.remove();

	initWheel();
});
