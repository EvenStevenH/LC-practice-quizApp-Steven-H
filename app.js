const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
const answer4 = document.getElementById("answer4");
const question = document.getElementById("question");
const feedback = document.getElementById("feedback");
const nextQuestionBtn = document.getElementById("nextQuestionBtn");

let currentQuestionIndex = 0; // start at first question
const answerBtns = [answer1, answer2, answer3, answer4];
const questions = [
	{
		question: "What is the national dish of Japan?",
		answers: ["Ramen", "Curry", "Sushi", "Takoyaki"],
		correctAnswerIndex: 2,
	},
	{
		question: "Which planet is known as the Red Planet?",
		answers: ["Earth", "Mars", "Jupiter", "Saturn"],
		correctAnswerIndex: 1,
	},
	{
		question: "What is the tallest breed of dog?",
		answers: ["Anatolian Shepherd", "Scottish Deerhound", "Great Dane", "Irish Wolfhound"],
		correctAnswerIndex: 3,
	},
];

function displayQuestion() {
	const currentQuestion = questions[currentQuestionIndex];
	question.textContent = currentQuestion.question;
	feedback.textContent = ""; // clear previous feedback
	nextQuestionBtn.style.display = "none";

	// update answer buttons > event listener for each
	for (let i = 0; i < answerBtns.length; i++) {
		answerBtns[i].textContent = currentQuestion.answers[i];
		answerBtns[i].disabled = false;
	}
	answerBtns.forEach((button, index) => {
		button.addEventListener("click", () => handleAnswer(index));
	});
}

function handleAnswer(selectedIndex) {
	const currentQuestion = questions[currentQuestionIndex];

	// disable answers > show next question button
	answerBtns.forEach((button) => {
		button.removeEventListener("click", () => handleAnswer());
		// button.disabled = true; // alternative to removeEventListener
	});
	nextQuestionBtn.style.display = "block";

	// check if answer is correct > update feedback
	if (selectedIndex === currentQuestion.correctAnswerIndex) {
		feedback.textContent = "Correct!";
		feedback.style.color = "#53D448";
	} else {
		feedback.textContent = `Incorrect. The answer was ${currentQuestion.answers[currentQuestion.correctAnswerIndex]}!`;
		feedback.style.color = "#FF5B38";
	}
}

function loadNextQuestion() {
	currentQuestionIndex++; // next question
	if (currentQuestionIndex < questions.length) {
		displayQuestion();
	} else {
		feedback.textContent = "Quiz completed!";
		feedback.style.color = "white";
		nextQuestionBtn.style.display = "none";
	}
}

/* -------------------------------------------------------------------------- */
// on init > display first question
nextQuestionBtn.addEventListener("click", loadNextQuestion);
displayQuestion();
