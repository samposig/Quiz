// TODO: CREATE VARIABLES TO REFERENCE HTML ELEMENTS
// TODO: AND REQUIRED VALUES FOR GAME FUNCTIONALITY

var startBtn = document.querySelector(".start-btn");
var timerText = document.querySelector(".timer");
var scoresUl = document.querySelector(".scores-list");
var title = document.querySelector(".title");
var questionContainerElement = document.querySelector(".question-container");
var Questions = [{
        id: 0,
        q: "What is capital of India?",
        a: [{ text: "gandhinagar", isCorrect: false },
            { text: "Surat", isCorrect: false },
            { text: "Delhi", isCorrect: true },
            { text: "mumbai", isCorrect: false }
        ]
    },
    {
        id: 1,
        q: "What is the capital of Gujarat",
        a: [{ text: "surat", isCorrect: false },
            { text: "vadodara", isCorrect: false },
            { text: "gandhinagar", isCorrect: true },
            { text: "rajkot", isCorrect: false }
        ]
    },
    {
        id: 2,
        q: "What is the capital of Thailand?",
        a: [{ text: "Lampang", isCorrect: false, isSelected: false },
            { text: "phuket", isCorrect: false },
            { text: "Ayutthaya", isCorrect: false },
            { text: "Bangkok", isCorrect: true }
        ]
    }
]

var timer = 5;
var score = 0;


//creating var to save scores of user into local storage
var savedScores = JSON.parse(localStorage.getItem("score")) || []
console.log(savedScores);
// TODO: INITIALIZE PAGE WITH STARTER VALUES/IMAGES, RENDER ANY SAVED SCORES


// function init() {
//     // button disappears after button is clicked????
//     startBtn.style.display = "none"
//     renderQuestions();
//     renderScores();
// }

startBtn.addEventListener("click", startGame);

function startGame() {
    // TODO: HIDE START BUTTON
    startBtn.classList.add('hide');
    title.style.display ="none";
    var start = true;   
    function iterate(id) {
  
        // Getting the result display section
        var result = document.getElementsByClassName("result");
        result[0].innerText = "";
      
        // Getting the question
        const question = document.getElementById("question");
      
      
        // Setting the question text
        question.innerText = Questions[id].q;
      
        // Getting the options
        const op1 = document.getElementById('op1');
        const op2 = document.getElementById('op2');
        const op3 = document.getElementById('op3');
        const op4 = document.getElementById('op4');
    
    
        // Providing option text 
        op1.innerText = Questions[id].a[0].text;
        op2.innerText = Questions[id].a[1].text;
        op3.innerText = Questions[id].a[2].text;
        op4.innerText = Questions[id].a[3].text;
    
        // Providing the true or false value to the options
        op1.value = Questions[id].a[0].isCorrect;
        op2.value = Questions[id].a[1].isCorrect;
        op3.value = Questions[id].a[2].isCorrect;
        op4.value = Questions[id].a[3].isCorrect;
    
        var selected = "";
        
        op1.addEventListener("click", () => {
            op1.style.backgroundColor = "lightgoldenrodyellow";
            op2.style.backgroundColor = "lightskyblue";
            op3.style.backgroundColor = "lightskyblue";
            op4.style.backgroundColor = "lightskyblue";
            selected = op1.value;
        })
      
        // Show selection for op2
        op2.addEventListener("click", () => {
            op1.style.backgroundColor = "lightskyblue";
            op2.style.backgroundColor = "lightgoldenrodyellow";
            op3.style.backgroundColor = "lightskyblue";
            op4.style.backgroundColor = "lightskyblue";
            selected = op2.value;
        })
      
        // Show selection for op3
        op3.addEventListener("click", () => {
            op1.style.backgroundColor = "lightskyblue";
            op2.style.backgroundColor = "lightskyblue";
            op3.style.backgroundColor = "lightgoldenrodyellow";
            op4.style.backgroundColor = "lightskyblue";
            selected = op3.value;
        })
    
        // Show selection for op4
        op4.addEventListener("click", () => {
            op1.style.backgroundColor = "lightskyblue";
            op2.style.backgroundColor = "lightskyblue";
            op3.style.backgroundColor = "lightskyblue";
            op4.style.backgroundColor = "lightgoldenrodyellow";
            selected = op4.value;
        })
    }
if (start) {
    iterate("0");
}


    var gameTimer = setInterval(() => {
        timer--;
        timerText.textContent = "Timer:" + timer;

        if (timer <= 0) {
            clearInterval(gameTimer);
            endGame()
        }
    }, 1000);
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