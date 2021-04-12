var quizContentEl = document.querySelector("#quiz-content");

var quizQuestionDiv = document.querySelector("#quiz-question-div");

var timerEl = document.getElementById('countdown');

var endGameDiv = document.getElementById('end-game-div');

var questionNumber = 0

var timeLeft = 50;

var quizScore = 0;

var timerFunction;



// create array to store questions
var quizQuestionsArray = [
    {
        question: "This is question 1",
        choices: ["string a", "string b", "string c", "string d"],
        correctAnswer: 1,
    },
    {
        question: "This is question 2",
        choices: ["string a", "string b", "string c", "string d"],
        correctAnswer: 2,
    },
    {
        question: "This is question 3",
        choices: ["string a", "string b", "string c", "string d"],
        correctAnswer: 3,
    },
    {
        question: "This is question 4",
        choices: ["string a", "string b", "string c", "string d"],
        correctAnswer: 0,
    },

];

// create function to render question
function renderQuestion() {
    if (questionNumber < 4) {
        quizQuestionDiv.innerHTML = "";
        var quizQuestionEl = document.createElement("h2");
        // create choice buttons
        var choiceAEl = document.createElement("button");
        // choiceAEl.className = ("correctChoice");
        var choiceBEl = document.createElement("button");
        var choiceCEl = document.createElement("button");
        var choiceDEl = document.createElement("button");
        choiceAEl.innerHTML = quizQuestionsArray[questionNumber].choices[0];
        choiceBEl.innerHTML = quizQuestionsArray[questionNumber].choices[1];
        choiceCEl.innerHTML = quizQuestionsArray[questionNumber].choices[2];
        choiceDEl.innerHTML = quizQuestionsArray[questionNumber].choices[3];
        quizQuestionEl.innerHTML = quizQuestionsArray[questionNumber].question;
        var choicesDiv = document.createElement("div");
        choicesDiv.className = ("questionChoice");
        choicesDiv.append(choiceAEl, choiceBEl, choiceCEl, choiceDEl);
        quizQuestionDiv.append(quizQuestionEl, choicesDiv);
        document.querySelectorAll(".questionChoice button").forEach(function (button) {
            button.addEventListener("click", clickHandler);
        });
    }
    else {
        endGame();
    }
    

}

function clickHandler() {
    console.log(quizQuestionsArray[questionNumber].correctAnswer);
    
    if (quizQuestionsArray[questionNumber].correctAnswer) {
        console.log('correct!');
        quizScore = quizScore + 15;
    }
    else {
        console.log('incorrect!');
        timeLeft = timeLeft - 10;
    }
    // console.log("worked");
    questionNumber++
    renderQuestion();
}

// create function to create the dynamic html
var createQuizContent = function () {
    renderQuestion();
    timer();
}

function timer() {
    var timeLeft = 50;


    timerDisplay = document.createElement("h2");
    console.log(timerEl);
    timerEl.appendChild(timerDisplay);

    timerFunction = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 1) {
            // Set the `textContent` of `timerEl` to show the remaining seconds
            timerDisplay.textContent = timeLeft + ' seconds remaining';
            // Decrement `timeLeft` by 1
            timeLeft--;
        } else if (timeLeft === 1) {
            // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
            timerDisplay.textContent = timeLeft + ' second remaining';
            timeLeft--;
        } else {
            // Once `timeLeft` gets to 0, set `timerEl` to an empty string
            timerDisplay.textContent = "Time's up!";
            // Use `clearInterval()` to stop the timer
            // clearInterval(timeInterval);

            endGame();
        }
    }, 1000);
}

var endGame = function () {
    clearInterval(timerFunction);
    timerEl.innerHTML = "";
    quizQuestionDiv.innerHTML = "";
    // create html elements
    var finalScore = document.createElement("h2");
    finalScore.innerHTML = "Your score was " + quizScore;
    var saveScoreForm = document.createElement("form");
    var userInitialsLabel = document.createElement("label");
    userInitialsLabel.setAttribute("for", "initials");
    userInitialsLabel.innerHTML = "Enter your initials to save your score:";
    var userInitialsInput = document.createElement("input");
    userInitialsInput.setAttribute("type", "text");
    userInitialsInput.setAttribute("id", "initials");
    userInitialsInput.setAttribute("name", "initials");
    var userInitialsSubmit = document.createElement("input");
    userInitialsSubmit.setAttribute("type", "submit");
    userInitialsSubmit.setAttribute("value", "Submit");
    
    // append finalScore to EndGameDiv, then append the form's input and label to the form, and the form to endGameDiv
    endGameDiv.appendChild(finalScore);
    saveScoreForm.append(userInitialsLabel, userInitialsInput, userInitialsSubmit);
    endGameDiv.appendChild(saveScoreForm);
    // userInitialsSubmit.addEventListener("click", displayHighScores);
}



var highScoresArray = [];

localStorage.setItem('highscores', JSON.stringify(highScoresArray));

quizContentEl.addEventListener("click", createQuizContent);
// quizQuestionDiv.addEventListener("click", "button", clickHandler);
