function generateRandomValue(minValue:number, maxValue:number):number{
    var random = Math.floor(Math.random() * maxValue) + minValue;

    return random;
}


function changePlayers():void{
    let currentPlayerName:string = document.getElementById("current").innerText;
    let player1Name:string = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name:string = (<HTMLInputElement>document.getElementById("player2")).value;

   //set currentPlayerName to the next player
    if(/*currentPlayerName.length == 1 || */currentPlayerName == player2Name){
        document.getElementById("current").innerText = player1Name;
    }
    else{
        document.getElementById("current").innerText = player2Name;
    }
}

window.onload = function(){
    let newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;

    document.getElementById("roll").onclick = rollDie;

    document.getElementById("hold").onclick = holdDie;
}

function createNewGame(){
    //delete player wins element if it exists
    if(document.getElementById("wins") != null){
        let wins:HTMLElement = document.getElementById("wins");
        wins.parentNode.removeChild(wins);
    }

    //enable roll button
    let rollButton:HTMLInputElement = <HTMLInputElement>(document.getElementById("roll"));
    rollButton.disabled = false;

    //set player names
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;

    //set first player to player 1's name
    document.getElementById("current").innerText = player1Name;
   
    //set player 1 and player 2 scores to 0
    let player1Score:HTMLInputElement = <HTMLInputElement>document.getElementById("score1");
    player1Score.value = "0";

    let player2Score:HTMLInputElement = <HTMLInputElement>document.getElementById("score2");
    player2Score.value = "0";

    //verify each player has a name
    //if both players don't have a name display error
    if( player1Name == "" || player2Name == ""){
        alert("Please Enter a name for both players");
    }
    else{
        //if both players do have a name start the game!
        document.getElementById("turn").classList.add("open");
        let total:HTMLInputElement = <HTMLInputElement>document.getElementById("total");
        total.value = "0";

        //lock in player names and then change players
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        //changePlayers();
    }
}

function rollDie():void{
    //show video of rolling dice
        (<HTMLAudioElement>(document.getElementById("roll-dice"))).play();

    //get the current total from form
    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);
    
    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    let diceRoll:number = generateRandomValue(1, 6);

    // if the roll is greater than 1
    // add roll value to current total
    if(diceRoll > 1){
        currTotal += diceRoll; 
    }

    //set the die roll to value player rolled
    (<HTMLInputElement>document.getElementById("die")).value = diceRoll.toString();

    //display current total on form
    (<HTMLInputElement>document.getElementById("total")).value = currTotal.toString();

    //if the roll is 1, alert that the players turn is over
    //changePlayers and set current total to 0
    if(diceRoll == 1){
        currTotal = 0;
        (<HTMLInputElement>document.getElementById("total")).value = currTotal.toString();
        setTimeout(function(){
            alert("You rolled a 1. Next Player's turn!")
        }, 2)
        changePlayers();
    }
}

function holdDie():void{
    //get the current turn total
    let turnTotal:number = parseInt((<HTMLInputElement>document.getElementById("total")).value);

    //determine who the current player is
    let currPlayer:string = document.getElementById("current").innerText;

    //get player current score
    let player1Score:number = parseInt((<HTMLInputElement>document.getElementById("score1")).value);
    let player2Score:number = parseInt((<HTMLInputElement>document.getElementById("score2")).value);

    //add the current turn total to the player's total score
    if(currPlayer == (<HTMLInputElement>document.getElementById("player1")).value){
        let currScore:number = parseInt((<HTMLInputElement>document.getElementById("score1")).value);
        player1Score = (turnTotal + currScore);
        (<HTMLInputElement>document.getElementById("score1")).value = player1Score.toString();
    }
    else{
        let currScore:number = parseInt((<HTMLInputElement>document.getElementById("score2")).value);
        player2Score = (turnTotal + currScore);
        (<HTMLInputElement>document.getElementById("score2")).value = player2Score.toString();
  
    }

    //reset the turn total to 0
    turnTotal = 0;
    (<HTMLInputElement>document.getElementById("total")).value = turnTotal.toString();

    //determine if there is a winner yet
    //if not, change players
    if(noWinnerYet(player1Score, player2Score)){
        changePlayers();
    }
    else{
        let rollButton:HTMLInputElement = <HTMLInputElement>(document.getElementById("roll"));
        rollButton.disabled = true;
    }
}

function noWinnerYet(player1Score:number, player2Score:number):boolean {
    if (player1Score >= 20) {
        let winner:HTMLElement = document.createElement("h2");
        winner.id = "wins";
        winner.innerText = (<HTMLInputElement>document.getElementById("player1")).value + " Wins!!!";
        document.getElementById("winner").appendChild(winner);

        return false;
    }

    if (player2Score >= 20) {
        let winner:HTMLElement = document.createElement("h2");
        winner.id = "wins";
        winner.innerText = (<HTMLInputElement>document.getElementById("player2")).value + " Wins!!!";
        document.getElementById("winner").appendChild(winner);

        return false;
    }

    else{
        return true;
    }
}
