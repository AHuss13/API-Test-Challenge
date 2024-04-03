let questions = [
{
  title: "Commonly used data types DO NOT include:",
  choices: ["strings", "booleans", "alerts", "numbers"],
  answer: "alerts"
},
{
  title: "The condition in an if / else statement is enclosed within ____.",
  choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
  answer: "parentheses"
},
{
  title: "Arrays in Javascript can be used to store ____.",
  choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
  answer: "all of the above"
},
{
  title: "String values must be enclosed within ____ when being assigned to variables.",
  choices: ["commas", "curly brackets", "quotes", "parenthesis"],
  answer: "quotes"
},
{
  title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
  choices: ["Javascript", "terminal / bash", "for loops", "console log"],
  answer: "console log"
}
];

let timerInterval;
let timeLeft = 60;
let questionNumber = 0;

const startBtn = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const questionLine = document.getElementById('question-line');
const answerChoices = document.getElementById('answer-choices');
const timerTime = document.getElementById('timer');
const submitBtn = document.getElementById('submit-btn');
const finalForm = document.getElementById('end-screen');
// const  = document.getElementById('');

startBtn.addEventListener('click', startQuiz);
submitBtn.addEventListener('click', scoreBtn); //rename after getting there

function startQuiz() {
  showQuestion();
  timerInterval = setInterval(updateTimer, 1000);
  startBtn.style.display = 'none';
}

function updateTimer() {
  timerTime.textContent = `Time: ${timeLeft} seconds`;
  if (timeLeft === 0) {
    finishHim();
  } else {
    timeLeft--;
  }
}

function showQuestion() {
  let currentQuestion = questions[questionNumber];
  questionLine.textContent = currentQuestion.title;
  answerChoices.innerHTML = '';
  currentQuestion.choices.forEach(choice=> {
    let li = document.createElement("li");
    li.textContent = choice;
    li.addEventListener('click', () => checkAnswer(choice));
    answerChoices.appendChild(li);
  })
};

function checkAnswer(choice) {
  let currentQuestion = questions[questionNumber]
  if (choice === currentQuestion.answer) {
    questionNumber++;
  } else {
    timeLeft -= 10;
    if (timeLeft < 0) {
      timeLeft = 0;
    } else {questionNumber++}
  }
  if (questionNumber < questions.length) {
    showQuestion();
  } else {
    finishHim();
  }
};

// Finish him!💀 (Stop all)
function finishHim () {
  clearInterval(timerInterval);
  document.getElementById('end-score').textContent = `Score: ${timeLeft}`; // Mismatch in score with time
  quizContainer.style.display = "none";
  finalForm.style.display = "block";
}

// score 👾
let savedScore = localStorage.getItem("score")