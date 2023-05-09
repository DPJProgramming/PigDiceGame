function generateRandomValue(minValue, maxValue) {
    var random = Math.floor(Math.random() * maxValue) + minValue;
    return random;
}
function changePlayers() {
    let currentPlayerName = document.getElementById("current").innerText;
    let player1Name = document.getElementById("player1").value;
    let player2Name = document.getElementById("player2").value;
    if (currentPlayerName == player2Name) {
        document.getElementById("current").innerText = player1Name;
    }
    else {
        document.getElementById("current").innerText = player2Name;
    }
}
window.onload = function () {
    let newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
};
function createNewGame() {
    if (document.getElementById("wins") != null) {
        let wins = document.getElementById("wins");
        wins.parentNode.removeChild(wins);
    }
    let rollButton = (document.getElementById("roll"));
    rollButton.disabled = false;
    let player1Name = document.getElementById("player1").value;
    let player2Name = document.getElementById("player2").value;
    document.getElementById("current").innerText = player1Name;
    let player1Score = document.getElementById("score1");
    player1Score.value = "0";
    let player2Score = document.getElementById("score2");
    player2Score.value = "0";
    if (player1Name == "" || player2Name == "") {
        alert("Please Enter a name for both players");
    }
    else {
        document.getElementById("turn").classList.add("open");
        let total = document.getElementById("total");
        total.value = "0";
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
    }
}
function rollDie() {
    (document.getElementById("roll-dice")).play();
    let currTotal = parseInt(document.getElementById("total").value);
    let diceRoll = generateRandomValue(1, 6);
    if (diceRoll > 1) {
        currTotal += diceRoll;
    }
    document.getElementById("die").value = diceRoll.toString();
    document.getElementById("total").value = currTotal.toString();
    if (diceRoll == 1) {
        currTotal = 0;
        document.getElementById("total").value = currTotal.toString();
        setTimeout(function () {
            alert("You rolled a 1. Next Player's turn!");
        }, 2);
        changePlayers();
    }
}
function holdDie() {
    let turnTotal = parseInt(document.getElementById("total").value);
    let currPlayer = document.getElementById("current").innerText;
    let player1Score = parseInt(document.getElementById("score1").value);
    let player2Score = parseInt(document.getElementById("score2").value);
    if (currPlayer == document.getElementById("player1").value) {
        let currScore = parseInt(document.getElementById("score1").value);
        player1Score = (turnTotal + currScore);
        document.getElementById("score1").value = player1Score.toString();
    }
    else {
        let currScore = parseInt(document.getElementById("score2").value);
        player2Score = (turnTotal + currScore);
        document.getElementById("score2").value = player2Score.toString();
    }
    turnTotal = 0;
    document.getElementById("total").value = turnTotal.toString();
    if (noWinnerYet(player1Score, player2Score)) {
        changePlayers();
    }
    else {
        let rollButton = (document.getElementById("roll"));
        rollButton.disabled = true;
    }
}
function noWinnerYet(player1Score, player2Score) {
    if (player1Score >= 20) {
        let winner = document.createElement("h2");
        winner.id = "wins";
        winner.innerText = document.getElementById("player1").value + " Wins!!!";
        document.getElementById("winner").appendChild(winner);
        return false;
    }
    if (player2Score >= 20) {
        let winner = document.createElement("h2");
        winner.id = "wins";
        winner.innerText = document.getElementById("player2").value + " Wins!!!";
        document.getElementById("winner").appendChild(winner);
        return false;
    }
    else {
        return true;
    }
}
