var startBtn = document.getElementById("start-Btn");
var questionSpot = document.getElementById("question-title");
var scoreContainer = document.querySelector("#score-container");
var finalScore = document.getElementById("final-score");
var finalAnswer = document.querySelector("#answers");
var enterInitials = document.querySelector("#enter-initials");
var submitButton = document.querySelector("#submit-btn");
var answers = document.querySelector("#answers");
var ansEval = document.querySelector("#evaluate-answer");
var Answers = document.getElementById("Answer");
var showScores = document.getElementById("highscores");
var timer = document.querySelector("#timer");
var choice1 =document.getElementById("btn1");
var choice2 =document.getElementById("btn2");
var choice3 =document.getElementById("btn3");
var choice4 =document.getElementById("btn4");

var timer = 30;
var score = 0;
let QuestionIndex = 0
// let index = questions[QuestionIndex];

var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

var questions = [{
        title: "What is HTML?",
        choices: [
            "A website",
            "Hyper Talking Markup Language", 
            "Hyper Text Markup Language", 
            "Help the Male Lion", 
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        title: "What is CSS used for?",
        choices: [
            "Adding Text",
            "Sending Messages", 
            "Styling", 
            "Retriving Data", 
        ],
        answer: "Styling"
    },
    {
        title: "What is stored in between square brackets [] ?",
        choices: [
            "A Shark",
            "Data",
            "A Function", 
            "An Array", 
        ],
        answer: "An Array"
    }
]

startBtn.addEventListener("click", startTimer);
choice1.addEventListener("click", askQuestion);
choice2.addEventListener("click", askQuestion);
choice3.addEventListener("click", askQuestion);
choice4.addEventListener("click", askQuestion);
submitButton.addEventListener("click", enterName);

var timeLeft = 60;
var timer;
function startTimer() {
  timer = setInterval(function () {
    timeLeft--;
    startBtn.textContent = timeLeft + " seconds remaining";
    if (timeLeft === 0) {
      clearInterval(timer);

      scoreKeeper();
    }
  }, 1000);
  questionSpot.textContent = questions[QuestionIndex].title;
  choice1.textContent = questions[QuestionIndex].choices[0];
  choice2.textContent = questions[QuestionIndex].choices[1];
  choice3.textContent = questions[QuestionIndex].choices[2];
  choice4.textContent = questions[QuestionIndex].choices[3];
}

function askQuestion(event) {
  if (QuestionIndex + 1 === questions.length) {
    scoreContainer.style.display = "flex";
    clearInterval(timer);

    scoreKeeper();
    return;
  }
  var userChoice = event.target.id;
  if (
    questions[QuestionIndex].choices[userChoice] ===
    questions[QuestionIndex].answer
  ) {
    //handles a correct answer
    userScore += 1;
    Answers.textContent = "Correct answer!";
  } else {
    // handles a wrong answer
    Answers.textContent = "Incorrect answer!";
    timeLeft = timeLeft - 10;
  }

  QuestionIndex += 1;
  questionSpot.textContent = questions[QuestionIndex].title;
  choice1.textContent = questions[QuestionIndex].choices[0];
  choice2.textContent = questions[QuestionIndex].choices[1];
  choice3.textContent = questions[QuestionIndex].choices[2];
  choice4.textContent = questions[QuestionIndex].choices[3];
}

function scoreKeeper() {
  finalScore.textContent = "Final Score " + (score + timeLeft);
}

function enterName(event) {
  var name = enterInitials.value;
  localStorage.setItem(name, score + timeLeft);
  enterInitials.value = "";
  displayScores();
}

function displayScores() {
  var length = localStorage.length;
  for (var i = 0; i < length; i++) {
    var key = localStorage.key(i);
    var value = Number(localStorage[key]);
    var element = document.createElement("li");
    element.innerHTML = `Initials: ${key} : Score: ${value}`;
    showScores.appendChild(element);
  }
}
