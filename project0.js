const player1 = "The Six Fingered Man"; //Bubble
const player2 = "Inigo Montoya"; //Bubble
let turn = player1; // Auto-sets first turn as Player1 
let winner = null; //Bubble 
const player = document.getElementById( "player" ); // Joins HTML "player" element to JS via DOM
const cells = document.getElementsByClassName( "cell" ); // ^^ Joins all HTML "cell" elements to JS via DOM
const state = ["", "", "", "", "", "",  "", "", ""]; // Allows data storage in the cells, allowing access to check what the state of the game is at each turn
const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]; // List of all possible win sequences 
let gameOver = false; //gameOver is set to false, until the state changes to have a draw or winner (Below functions, "checkingForDraw, checkingForWinner etc")

const checkingForWinner = () => {
    for ( let i = 0; i < win.length; i++ ) {
        const winCondition = win[i];
        const condition0 = state[ winCondition[0] ];
        const condition1 = state[ winCondition[1] ];
        const condition2 = state[ winCondition[2] ]; //Checking through the index, top to bottom, left to right. Wrote this way to keep the if statement code short-hand
        if( condition0 === "X" && condition1 === "X" && condition2 === "X" ) {
            gameOver = true;
            winner = player1;
        } 
        if( condition0 === "O" && condition1 === "O" && condition2 === "O" ) {
            gameOver = true;
            winner = player2;
        }
    }
} // Runs through the moves made/ available and cells, to determine whether the game has been won. Checks the moves against the possible win sequences listed in array above 

const checkingForDraw = () => {
    if ( gameOver === true ) {
        return;
    } // Ends function if game is already over
    let movesRemaining = false;
    for( let i = 0; i < state.length; i++ ) {
        if ( state[i] === "" ) {
            movesRemaining = true;
        }
    } // Checking if there are any empty cells left 
    if ( movesRemaining === false ) {
        gameOver = true;
    } // Ifno empty cells left = draw = end the game
}; // This function checks through each cell and player moves to determine whether or not there has been a draw. If so, the game ends. If not the game continues. 

const render = () => {
    if ( turn === player1 ) {
        player.innerHTML = "The Six Fingered Man, your turn";
    } else {
        player.innerHTML = "Inigo Montoya, go!";
    }
    if ( winner === player1 ) {
        player.innerHTML = "WINNER: The Six Fingered Man";
    } else if ( winner === player2 ) {
        player.innerHTML = "WINNER: Inigo Montoya";
    } else if ( gameOver === true ) {
        player.innerHTML = "DRAW.. Rematch.. >=)?";
    }
}; // The function updates the html after every click. Check the turn and winner bubbles in order to update display as needed. 

const cellClicked = (event) => { // This function gets called every time a player clicks on a cell 
    const cellId = event.target.id; // Gets the cell that was clicked from the event 
    const index = event.target.getAttribute( "data-index" ); // We need the data index to connect to the state array and update it
    if( gameOver === true ) {
        return;
    } // ending early as game is already over 
    if(state[index] !== "") {
        return;
    } // If the cell is not empty, the function ends early as there is already an X or O in the cell (invalid move)
    if ( turn === player1 ) {
        turn = player2; // Switching players turn 
        state[index] ="X"; //storing move in the cell clicked (in state array)
        document.getElementById( cellId ).setAttribute( "class", "cell X" ); //Update cell colour
    } else {
        turn = player1;
        state[index] ="O"; //storing move in the cell clicked (in state array)
        document.getElementById(cellId).setAttribute( "class", "cell O" ); // Update cell colour 
    }
    checkingForWinner(); //After each click - is a winner? 
    checkingForDraw(); // Is a draw?
    render(); // Update screen 
}

for ( let i = 0; i < cells.length; i++ ) {
    cells[i].addEventListener( "click", cellClicked );
}; // cells is link html to the js, this is where we go through each cell and link the cellClicked function to the click event 

const rematchButton = document.getElementById("rematch");

const reset = () => {
    winner = null;
    gameOver = false;
    turn = player1;
    state = ["", "", "", "", "", "",  "", "", ""];
    render();
    for ( let i = 0; i < cells.length; i++ ) {
        cells[i].setAttribute( "class", "cell" );
    };
};
rematchButton.addEventListener( "click", reset);