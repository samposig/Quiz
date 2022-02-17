// TODO: CREATE VARIABLES TO REFERENCE HTML ELEMENTS
// TODO: AND REQUIRED VALUES FOR GAME FUNCTIONALITY

var startBtn = document.querySelector(".start-btn");
var timerText = document.querySelector(".timer");
var scoresUl = document.querySelector(".scores-list");
var title = document.querySelector(".title");
var questionContainerElement = document.querySelector(".question-container");
// var questions = [
//     Question; "What is JS?"
//     answers; [
//        (text: 'JavaScript', correct: true ),
//        (text: 'JumpingSnakes', correct: false),
//     ]
// ]

var timer = 5;
var score = 0;


//creating var to save scores of user into local storage
var savedScores = JSON.parse(localStorage.getItem("score")) || []
console.log(savedScores);
// TODO: INITIALIZE PAGE WITH STARTER VALUES/IMAGES, RENDER ANY SAVED SCORES


function init() {
    // button disappears after button is clicked????
    startBtn.style.display = "none"
    renderQuestions();
    renderScores();
}

startBtn.addEventListener("click", startGame);

function startGame() {
    // TODO: HIDE START BUTTON
    startBtn.classList.add('hide');
    title.style.display ="none";
    questionContainerElement.classList.remove('hide');

    var gameTimer = setInterval(() => {
        timer--;
        timerText.textContent = "Timer:" + timer;

        if (timer <= 0) {
            clearInterval(gameTimer);
            endGame()
        }
    }, 1000);
    renderQuestions();

    // clickBtn.addEventListener("click", function () {
    //     score++;
    //     renderQuestions();
    // })
}

function setNextQuestion() {

}

function selectAnswer(){

}


function endGame() {
    // TODO: GET USER INITIALS
    var userInits = window.prompt("What are you Initials?")
    // TODO: SAVE USER/SCORE TO LOCALSTORAGE
    var userObj = {
        userInits,
        score
    }

    // UPDATE SAVED SCORE DATA (ARRAY)
    savedScores.push(userObj);
    // SET LOCAL STORAGE TO UPDATED DATA (STRINGIFIED)
    localStorage.setItem("score", JSON.stringify(savedScores))

    alert("Here is your score, " + userInits + "\nScore: " + score)
    // TODO: RESET PAGE AND VARIABLES FOR NEW GAME
    startBtn.style.display = "block";
    timer = 5;
    score = 0;
    // TODO: ...AND SHOW/RENDER SCORES
    renderScores();
}

function renderScores() {
    for (let i = 0; i < savedScores.length; i++) {
        const element = savedScores[i];
        var newLi = document.createElement("li")
        newLi.textContent = element.userInits + " -- " + element.score
        scoresUl.appendChild(newLi);

    }
}