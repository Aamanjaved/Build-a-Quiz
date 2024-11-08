const questions = [
    {
        question: "What does DOM stand for?",
        answers: [
            { text: "Document Object Model", correct: true },
            { text: "Data Object Module", correct: false },
            { text: "Document Order Model", correct: false },
            { text: "Display Object Management", correct: false }
        ]
    },
    {
        question: "Which of these is a JavaScript framework?",
        answers: [
            { text: "Python", correct: false },
            { text: "Django", correct: false },
            { text: "React", correct: true },
            { text: "Flask", correct: false }
        ]
    },
    {
        question: "What is the purpose of the 'this' keyword in JavaScript?",
        answers: [
            { text: "To refer to the current object", correct: true },
            { text: "To refer to the previous function", correct: false },
            { text: "To refer to the global scope", correct: false },
            { text: "To refer to the parent function", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const resultMessage = document.getElementById("result-message");

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    document.getElementById("homepage").style.display = "none";
    quizContainer.style.display = "block";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });
    nextBtn.style.display = "block";
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    scoreElement.innerText = `${score} out of ${questions.length}`;
    resultMessage.innerText = score >= 2 ? "Great job! Keep practicing." : "Try again to improve!";
}

function restartQuiz() {
    resultContainer.style.display = "none";
    document.getElementById("homepage").style.display = "block";
}