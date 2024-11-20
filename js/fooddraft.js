
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

	// 检测是否为移动端
	const isMobile =
		window.innerWidth <= 768 ||
		window.matchMedia("(max-device-width: 768px)").matches;

	// 根据设备类型调整半径
	const wheelSize = isMobile
		? document.querySelector(".wheel").offsetWidth
		: 300;
	const textRadius = isMobile ? wheelSize * 0.32 : 85; // 调整移动端文字距离

	// 调整各种尺寸
	const wheelRadius = isMobile ? wheelSize : 150;
	const borderWidth = isMobile ? wheelSize * 0.08 : 25;
	const dotRadius = (wheelSize - borderWidth) / 2;

	// 创建扇形背景
	let gradientString = "";
	foods.forEach((_, index) => {
		const startAngle = sectorAngle * index;
		const endAngle = sectorAngle * (index + 1);
		const color = index % 2 === 0 ? COLOR_1 : COLOR_2;
		gradientString += `${color} ${startAngle}deg ${endAngle}deg${index < foods.length - 1 ? "," : ""
			}`;
	});
	wheel.style.background = `conic-gradient(${gradientString})`;

	// 添加文字
	foods.forEach((food, index) => {
		const text = document.createElement("div");
		text.className = "sector-text";
		text.textContent = food;

		const angleInDegrees = sectorAngle * index + sectorAngle / 2;
		const angleInRadians = (angleInDegrees * Math.PI) / 180;

		const x = Math.sin(angleInRadians) * textRadius;
		const y = -Math.cos(angleInRadians) * textRadius;

		// 设置文字位置和旋转
		text.style.transform = `
      translate(${x}px, ${y}px)
      rotate(${angleInDegrees + 90}deg)`;

		wheel.appendChild(text);
	});

	// 圆点位置计算
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

	document.querySelector(".wheel-container").appendChild(dots);
}

// 初始化页面时创建转盘
initWheel();

let isSpinning = false;

document.getElementById("spinBtn").addEventListener("click", () => {
	if (isSpinning) return;

	isSpinning = true;
	const wheel = document.getElementById("wheel");
	const result = document.getElementById("result");
	const resultText = document.getElementById("resultText");

	// 清除上一次的结果
	resultText.textContent = "";

	// 先重置转盘位置到0度
	wheel.style.transition = "none";
	// 使用 style.setProperty 分别设置 transform 属性
	wheel.style.setProperty("transform", "translate(-50%, -50%) rotate(0deg)");

	// 强制浏览器重排
	wheel.offsetHeight;

	// 恢复 transition
	wheel.style.transition = "transform 3s ease-out";

	// 计算扇形角度
	const sectorAngle = 360 / foods.length;

	// 随机选择一个扇形
	const randomSector = Math.floor(Math.random() * foods.length);

	// 计算基础旋转圈数（6-10圈）
	const baseRotations = 4 + Math.floor(Math.random() * 8);
	const baseRotationDegrees = baseRotations * 360;

	// 计算最终旋转角度，使指针指向选中扇形的中心
	const finalRotation =
		baseRotationDegrees + randomSector * sectorAngle + sectorAngle / 2;

	// 设置转盘旋转，保持位移
	requestAnimationFrame(() => {
		wheel.style.setProperty(
			"transform",
			`translate(-50%, -50%) rotate(${finalRotation}deg)`
		);
	});

	// 监听转动完成事件
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

// 中心轴点击事件也使用相同的逻辑
document.querySelector(".wheel-center").addEventListener("click", () => {
	// 只有在不旋转时才触发点击事件
	document.getElementById("result").style.display = "none";
	if (!isSpinning) {
		document.getElementById("spinBtn").click();
	}
});

// again
document.querySelector(".result-again").addEventListener("click", () => {
	// 只有在不旋转时才触发点击事件
	if (!isSpinning) {
		document.getElementById("result").style.display = "none";
		document.getElementById("spinBtn").click();
	}
});

// 关闭窗口
document.querySelector(".result-close").addEventListener("click", () => {
	// 只有在不旋转时才触发点击事件
	document.getElementById("result").style.display = "none";
});

// 添加窗口大小变化监听
window.addEventListener("resize", () => {
	const wheel = document.getElementById("wheel");
	wheel.innerHTML = "";
	// 移除现有的圆点容器
	const oldDots = document.querySelector(".dots");
	if (oldDots) oldDots.remove();
	// 重新初始化
	initWheel();
});
