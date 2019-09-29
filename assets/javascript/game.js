// words list
var pokemonList = ["PIKACHU", "BULBASAUR", "CHARMANDER", "SQUIRTLE", "LAPRAS"];

var maxNumGuesses = 8; // the maximum amount of guesses
var guessedLetters = []; // guessed letters will be store here
var ansWordArr = []; // store the "_" and to be used to replace the word answer
var remainingGuess = 0; // the amont of guesses remaining
var winnerCounter = 0; // records number of wins
var loserCounter = 0; // records number of losses
var isFinished = false; // if true then game can start again
var currentWord; // the word that is currently being played

// function runs at the start of page and used to restart after game isFinished
function setup() {
    // randomly selects a word from the array of Pokemon name list
    currentWord = pokemonList[Math.floor(Math.random() * pokemonList.length)];

    ansWordArr = [];

    // adds "_" to ansWordArr
    for (var i = 0; i < currentWord.length; i++) {
        ansWordArr[i] = "_";
    }

    // reset the variables 
    remainingGuess = maxNumGuesses;
    guessedLetters = [];

    //clears giphy-embed to now show any gifs
    document.getElementById("giphy-embed").src = "";
    //removes color from numGuesses
    document.getElementById("numGuesses").style.color = "";

    //show the selected elements on the screen 
    updateScreen();
};

//updates the HTML from the functions
function updateScreen() {
    document.getElementById("winCounter").innerText = winnerCounter;
    document.getElementById("lossCounter").innerText = loserCounter;
    document.getElementById("numGuesses").innerText = remainingGuess;
    document.getElementById("wordAnswer").innerText = ansWordArr.join("");
    document.getElementById("guessedLetters").innerText = guessedLetters;

};

//function to check the key that's pressed
function checkGuess(letter) {
    //if letter is not in guessedLetters array then push the letter to the array
    if (guessedLetters.indexOf(letter) === -1) {
        guessedLetters.push(letter);
        //if the letter isn't in the answer word then -1 the remainingGuess
        if (currentWord.indexOf(letter) === -1) {
            remainingGuess--;
            //if remainingGuess is 3 or less then change the color
            if (remainingGuess <=3) {
                document.getElementById("numGuesses").style.color = "#e12d2e";
            }
            //if letter is in answer then replace the positioned "_" with the letter
        } else { 
            for (var i = 0; i < currentWord.length; i++) {
                if (letter === currentWord[i]) {
                    ansWordArr[i] = letter;
                } 
            }                
        }
    }

}; 

//function to check if the player is a winner
function isWinner() {
    //if there are no more "_" in the ansWordArr then +1 to Wins and switch isFinished to true
    if (ansWordArr.indexOf("_") === -1) {
        winnerCounter++;
        isFinished = true;
        //if the answer is guessed then play assigned gif
        if(currentWord === "PIKACHU") {
            document.getElementById("giphy-embed").src = "https://giphy.com/embed/xuXzcHMkuwvf2";
        } else if (currentWord === "BULBASAUR") {
            document.getElementById("giphy-embed").src = "https://giphy.com/embed/N7UQCEtGgRMRi";
        } else if (currentWord === "CHARMANDER") {
            document.getElementById("giphy-embed").src = "https://giphy.com/embed/3VQDfP4q4ZYyY";
        } else if (currentWord === "SQUIRTLE") {
            document.getElementById("giphy-embed").src = "https://giphy.com/embed/3xgR6JaucMaXe";
        } else if (currentWord === "LAPRAS") {
            document.getElementById("giphy-embed").src = "https://giphy.com/embed/JkX8vKR26hjbO";
        }
            
    }
};
//function to check if player is a loser
function isLoser() {
    // if the remaingGuess is 0 then -1 loserCounter and switch isFinished to true
    if(remainingGuess <= 0) {
        loserCounter++;
        isFinished = true;
        //play the loser gif
        document.getElementById("giphy-embed").src = "https://giphy.com/embed/cr9vIO7NsP5cY";
        document.getElementById("lossCounter").style.color = "#e12d2e";
    }

};


//event listener for key pressed
document.onkeyup = function(event) {
    //if isFinished is true then restart the game to the initial setup 
    //and switch isFinished back to false
    if (isFinished) {
        setup();
        isFinished = false;
    } else {
        //check to see if only letters A-Z are pressed
        //functions are executed when user presses A-Z key
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            checkGuess(event.key.toUpperCase()); 
            updateScreen();
            isWinner();
            isLoser();
        }
    }
};


setup();
updateScreen();

console.log(currentWord);








