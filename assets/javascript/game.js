//DOM Elements
console.log('working')
var $newGameButton = document.getElementById("new-game");

// var wordBank = document.getElementById("word-bank");
// selects the html div id=placeholders
var $placeholders = document.getElementById("placeholders");
var $guessedLetters = document.getElementById("guessed-letters");
var $guessesLeft = document.getElementById("guesses-left");
var $wins = document.getElementById("wins");
var $losses = document.getElementById("losses");

/////////////////////*********************************************************************** */

//Var for Game


var wordBank = ["Sideways", "Election", "Midnight in Paris", "Amadeus","Fargo"];

// console.log(wordBank);
var guessedLetterBank = [];
// randomly choosen word from wordBank
var pickedWord = '';
var pickedWordPlaceholderArr = [];
var incorrectLetterBank = [];
var guessesLeft = 8;
var wins = 0;
var losses = 0;
gameRunning = false;
/////////////////////*********************************************************************** */

//Run Game

function newGame() {
    console.log('working')

    gameRunning = true;
    guessesLeft = 8;
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];
    guessedLetterBank = [];

    /////////////////////*********************************************************************** */


    //pick new word

    pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    //create placeholders from new picked word

    for (var i = 0; i < pickedWord.length; i++) {

        if (pickedWord[i] === " ") {

            pickedWordPlaceholderArr.push("  ");

        } else {
            pickedWordPlaceholderArr.push(" _ ");

        }

    }

    //Write to DOM

    $placeholders.textContent = pickedWordPlaceholderArr.join('');

    $guessedLetters.textContent = incorrectLetterBank;

    $guessesLeft.textContent = guessesLeft;

}

function letterGuess(letter) {
    if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {

        //run game
        guessedLetterBank.push(letter);
        for (var i = 0; i < pickedWord.length; i++) {

            if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {

                pickedWordPlaceholderArr[i] = pickedWord[i];
            }
        }
        $placeholders.textContent = pickedWordPlaceholderArr.join('');
        checkIncorrect(letter);

    } else {
        if (!gameRunning) {

            alert("Click New Game Button");
        } else {

            alert("Try a different letter");
        }

    }

}

function checkIncorrect(letter) {

    if (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 &&

        pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1) {

        guessesLeft--;
        incorrectLetterBank.push(letter);

        $guessedLetters.textContent = incorrectLetterBank.join(' ');

        $guessesLeft.textContent = guessesLeft;
    }
    checkLoss();
}

function checkLoss() {

    if (guessesLeft === 0) {
        losses++;
        gameRunning = false;
        $losses.textContent = losses;
    }
    checkWin()
}

function checkWin() {
    if (pickedWord.toLowerCase() === pickedWordPlaceholderArr.join('').toLowerCase()) {
        wins++;
        $wins.textContent = wins;
        gameRunning = false;
       
    }

}
//new game button

$newGameButton.addEventListener('click', newGame);

document.onkeyup = function (event) {

    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
    }
}