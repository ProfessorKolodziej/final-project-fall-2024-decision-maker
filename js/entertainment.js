const foods = [
	"Movies",
	"Bowling",
	"Hiking",
	"Picnic",
	"Games",
	"Karaoke",
	"Reading",
	"Painting"
];

let isSpinning = false;
let currentRotation = 0;

// 修改文字半径计算方法
function getTextRadius() {
	const containerWidth = document.querySelector('.wheel-container').offsetWidth;
	// 根据容器大小动态计算合适的半径
	// 使用容器宽度的 35% 作为文字到圆心的距离
	return containerWidth * 0.35;
}

function createWheel() {
	const wheel = document.getElementById("wheel");
	wheel.innerHTML = '';
	const anglePerSection = 360 / foods.length;

	// 添加分割线
	for (let i = 0; i < foods.length; i++) {
		const divider = document.createElement("div");
		divider.className = "divider";
		divider.style.transform = `rotate(${anglePerSection * i}deg)`;
		wheel.appendChild(divider);
	}

	// 添加文本
	const radius = getTextRadius();
	foods.forEach((food, index) => {
		const text = document.createElement("div");
		text.className = "wheel-text";
		text.innerText = food;

		const angle = (index * anglePerSection) + (anglePerSection / 2);
		const x = radius * Math.cos((angle - 90) * Math.PI / 180);
		const y = radius * Math.sin((angle - 90) * Math.PI / 180);

		text.style.transform = `
		 translate(${x}px, ${y}px)
		 rotate(${angle + 90}deg)
		 translate(-50%, -50%)
	  `;

		wheel.appendChild(text);
	});
}

window.onload = function () {
	createWheel();

	const wheel = document.getElementById("wheel");
	wheel.addEventListener('transitionend', function () {
		if (isSpinning) {
			const finalAngle = currentRotation % 360;
			const sectionAngle = 360 / foods.length;
			const sectionIndex = Math.floor((360 - (finalAngle % 360)) / sectionAngle) % foods.length;
			const result = foods[sectionIndex];

			document.getElementById("resultText").innerText = `${result}！`;
			document.getElementById("resultModal").style.display = "flex";
			isSpinning = false;
		}
	});
};

let resizeTimeout;
window.addEventListener('resize', function () {
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(createWheel, 250);
});

function spinWheel() {
	if (isSpinning) return;

	isSpinning = true;
	const wheel = document.getElementById("wheel");

	const spins = 1 + Math.random();
	const extraDegrees = Math.random() * 360;
	const additionalRotation = spins * 360 + extraDegrees;

	currentRotation += additionalRotation;
	wheel.style.transform = `rotate(${currentRotation}deg)`;
}

function closeModal() {
	document.getElementById("resultModal").style.display = "none";
}
