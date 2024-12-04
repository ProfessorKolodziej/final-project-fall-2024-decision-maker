// 随机答案数组
const answers = [
	"Yes, you will succeed!",
	"No, it’s not the right time.",
	"Maybe, but you must try harder.",
	"Definitely not!",
	"Absolutely, go for it!",
	"It’s a 50/50 chance.",
	"It will happen when you least expect it.",
	"Trust your gut feeling.",
	"You’re on the right path!",
	"Things are looking up for you."
];

// 生成随机答案并显示
window.onload = function () {
	const randomIndex = Math.floor(Math.random() * answers.length);
	const randomAnswer = answers[randomIndex];

	// 找到显示答案的元素并更新它
	const answerElement = document.getElementById("random-answer");
	answerElement.textContent = randomAnswer;
};
