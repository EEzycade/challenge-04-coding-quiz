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
        question: "Where is the correct place to link to your JS file?",
        choices: ["At the very top of your HTML", "The body section", "The head section", "None of the above"],
        correctAnswer: "1",
    },
    {
        question: "What is the scope that everything can access?",
        choices: ["Universal", "scopeAll", "Global", "SCOPE"],
        correctAnswer: "2",
    },
    {
        question: "What is the correct syntax to create an HTML element?",
        choices: ["var blank = document.Element('h2');", 
        "var blank = createEl h1", 
        "Nike, Just Do It", 
        "var blank = document.createElement('h2');"],
        correctAnswer: "3",
    },
    {
        question: "The two ways to create a function are...",
        choices: ["A declaration and a salutation", "A declaration and an expression", "There's only 1 way", "You can make a function?"],
        correctAnswer: "1",
    },

];

// create function to render question
function renderQuestion() {
    if (questionNumber < 4) {
        quizQuestionDiv.innerHTML = "";
        var quizQuestionEl = document.createElement("h2");
        // create choice buttons
        var choiceAEl = document.createElement("button");
        
        var choiceBEl = document.createElement("button");
        
        var choiceCEl = document.createElement("button");
        
        var choiceDEl = document.createElement("button");
        
        choiceAEl.innerHTML = quizQuestionsArray[questionNumber].choices[0];
        choiceAEl.setAttribute('data-choice', 0);
        choiceBEl.innerHTML = quizQuestionsArray[questionNumber].choices[1];
        choiceBEl.setAttribute('data-choice', 1);
        choiceCEl.innerHTML = quizQuestionsArray[questionNumber].choices[2];
        choiceCEl.setAttribute('data-choice', 2);
        choiceDEl.innerHTML = quizQuestionsArray[questionNumber].choices[3];
        choiceDEl.setAttribute('data-choice', 3);
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

function clickHandler(event) {
    console.log(quizQuestionsArray[questionNumber].correctAnswer);
    var userAnswer = event.target.getAttribute('data-choice');
    console.log(userAnswer);
    if (quizQuestionsArray[questionNumber].correctAnswer === userAnswer) {
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
    timeLeft = 50;


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
