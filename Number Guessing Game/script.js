let randomNumber = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 5;

function checkGuess() {
    const userGuess = parseInt(document.getElementById('guessInput').value);
    const result = document.getElementById('result');
    const attempts = document.getElementById('attempts');

    if (!userGuess || userGuess < 1 || userGuess > 100) {
        result.textContent = "Please enter a number between 1 and 100.";
        return;
    }

    if (userGuess === randomNumber) {
        result.textContent = "Congratulations! You guessed the correct number!";
        endGame();
    } else if (userGuess < randomNumber) {
        if(userGuess + 25 < randomNumber){
            result.textContent = "Your number is too low.";
        } else {
            result.textContent = "Your number is low.";
        }
    } else {
        if(userGuess - 25 > randomNumber){
            result.textContent = "Your number is too high.";
        } else {
            result.textContent = "Your number is high.";
        }
    }

    attemptsLeft--;
    attempts.textContent = `You have ${attemptsLeft} chances`;

    if (attemptsLeft === 0) {
        result.textContent = `Game over! The correct number was ${randomNumber}.`;
        endGame();
    }
}

function endGame() {
    document.getElementById('guessInput').disabled = true;
    document.getElementById('restartBtn').style.display = "block";
}

function restartGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attemptsLeft = 5;
    document.getElementById('guessInput').disabled = false;
    document.getElementById('guessInput').value = "";
    document.getElementById('result').textContent = "";
    document.getElementById('attempts').textContent = `Attempts left: ${attemptsLeft}`;
    document.getElementById('restartBtn').style.display = "none";
}
