// 1. Questions Array: Stores questions, options, and correct answers
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyperlink and Text Management Language",
            "Home Tool Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: ["font-color", "text-color", "color", "background-color"],
        answer: "color"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<js>", "<scripting>", "<javascript>", "<script>"],
        answer: "<script>"
    },
    {
        question: "Which method is used to select an element by its ID in JavaScript?",
        options: [
            "document.querySelectorAll()",
            "document.getElementById()",
            "document.getElementsByClass()",
            "document.findId()"
        ],
        answer: "document.getElementById()"
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: ["<!-- -->", "/* */", "//", "#"],
        answer: "//"
    }
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
const TIME_LIMIT = 15;
let timeLeft = TIME_LIMIT;
let answerSubmitted = false;

// 2. Randomly shuffles the questions array
function shuffleQuestions() {
    shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
}

// 3. Sets a countdown timer for each question
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = TIME_LIMIT;
    document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeUp();
        }
    }, 1000);
}

function handleTimeUp() {
    if (answerSubmitted) return;
    answerSubmitted = true;

    const currentQ = shuffledQuestions[currentQuestionIndex];
    const feedbackEl = document.getElementById("feedback-section");
    feedbackEl.textContent = `Time's up! The correct answer was: ${currentQ.answer}`;
    feedbackEl.className = "feedback incorrect";

    disableOptions();
    document.getElementById("submit-btn").classList.add("hidden");
    document.getElementById("next-btn").classList.remove("hidden");
}

// 4. Displays the current question and answer options
function displayQuestion() {
    answerSubmitted = false;
    const currentQ = shuffledQuestions[currentQuestionIndex];

    document.getElementById("question-progress").textContent =
        `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
    document.getElementById("question-text").textContent = currentQ.question;

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    currentQ.options.forEach((option) => {
        const label = document.createElement("label");
        label.className = "option-label";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "quiz-option";
        radio.value = option;

        label.appendChild(radio);
        label.appendChild(document.createTextNode(option));
        optionsContainer.appendChild(label);
    });

    // Reset feedback and buttons
    const feedbackEl = document.getElementById("feedback-section");
    feedbackEl.className = "feedback hidden";
    feedbackEl.textContent = "";

    document.getElementById("submit-btn").classList.remove("hidden");
    document.getElementById("next-btn").classList.add("hidden");
}

// 5. Checks whether the selected answer is correct and updates the score
function checkAnswer() {
    if (answerSubmitted) return;

    const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
    const feedbackEl = document.getElementById("feedback-section");

    if (!selectedOption) {
        feedbackEl.textContent = "Please select an answer before submitting!";
        feedbackEl.className = "feedback incorrect";
        return;
    }

    clearInterval(timerInterval);
    answerSubmitted = true;
    disableOptions();

    const currentQ = shuffledQuestions[currentQuestionIndex];
    if (selectedOption.value === currentQ.answer) {
        score++;
        feedbackEl.textContent = "Correct!";
        feedbackEl.className = "feedback correct";
    } else {
        feedbackEl.textContent = `Incorrect! The correct answer is: ${currentQ.answer}`;
        feedbackEl.className = "feedback incorrect";
    }

    document.getElementById("score-display").textContent = `Current Score: ${score}`;
    document.getElementById("submit-btn").classList.add("hidden");
    document.getElementById("next-btn").classList.remove("hidden");
}

function disableOptions() {
    const radios = document.querySelectorAll('input[name="quiz-option"]');
    radios.forEach((radio) => (radio.disabled = true));
}

// 6. Moves to the next question, resetting the timer and updating the score
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {
        displayQuestion();
        startTimer();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    clearInterval(timerInterval);
    document.getElementById("quiz-section").classList.add("hidden");
    document.getElementById("score-display").textContent =
        `Quiz Completed! Final Score: ${score} / ${shuffledQuestions.length}`;
    document.getElementById("restart-btn").classList.remove("hidden");
}

// 7. Starts the quiz by shuffling questions, displaying the first question, and starting the timer
function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;

    document.getElementById("quiz-section").classList.remove("hidden");
    document.getElementById("restart-btn").classList.add("hidden");
    document.getElementById("score-display").textContent = `Current Score: 0`;

    shuffleQuestions();
    displayQuestion();
    startTimer();
}

// Initialize quiz on page load
window.onload = startQuiz;
