const player1 = "Player1"; //Bubble
const player2 = "Player2"; //Bubble
let turn = player1; // Automates the first turn as Player1 
let winner; //Bubble 
const player = document.getElementById( "player" ) // This joins HTML "player" element to JS via DOM
const cells = document.getElementsByClassName( "cell" ) // ^^ Joins HTML "cell"s element - any element in the HTML file with class "cell"
const state = ["", "", "", "", "", "",  "", "", ""] // This array allows us to store data in the cells, which we can then access to check what the state of the game is at each step 
const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
] // This Array inside an array is a list of all possible win sequences 
let gameOver = false; //gameOver is set to false, until the code checks the state to determine if there has been a winner (Below, "checkingForDraw, checkingForWinner etc")

const checkingForWinner = () => {
    for ( let i = 0; i < win.length; i++ ) {
        const winCondition = win[i];
        const condition0 = state[ winCondition[0] ]
        const condition1 = state[ winCondition[1] ]
        const condition2 = state[ winCondition[2] ] //Checking through the index, top to bottom, left to right. Wrote this way in order to keep the if statement code short as possible 
        if( condition0 === "X" && condition1 === "X" && condition2 === "X" ) {
            gameOver = true;
            winner = player1;
        } 
        if( condition0 === "O" && condition1 === "O" && condition2 === "O" ) {
            gameOver = true;
            winner = player2;
        }
    }
} // This function goes through the moves and cells to determine whether the game has been won, by checking the moves against the possible win sequences listed in the above array 

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
} // This function checks through each cell and player moves to determine whether or not there has been a draw. If so, the game ends. If not the game continues. 

const render = () => {
    if ( turn === player1 ) {
        player.innerHTML = "Turn: Player1";
    } else {
        player.innerHTML = "Turn: Player2";
    }
    if ( winner === player1 ) {
        player.innerHTML = "Player1 Wins";
    } else if ( winner === player2 ) {
        player.innerHTML = "Player2 Wins";
    } else if ( gameOver === true ) {
        player.innerHTML = "DRAW.. Rematch? >:-)";
    }
} // The function updates the html after every click. Check the turn and winner bubbles in order to update display as needed. 

const cellClicked = (event) => { // This function gets called every time a player clicks on a cell 
    const cellId = event.target.id // Gets the cell that was clicked from the event 
    const index = event.target.getAttribute( "data-index" ) // We need the data index to connect to the state array and update it
    if( gameOver === true ) {
        return;
    } // ending early as game is already over 
    if(state[index] !== "") {
        return;
    } // If the cell is not empty, the function ends early as there is already an X or O in the cell (invalid move)
    if ( turn === player1 ) {
        turn = player2; // Switching players turn 
        state[index] ="X"; //storing move in the cell clicked (in state array)
        document.getElementById( cellId ).setAttribute( "class","cell X" ); //Update cell colour
    } else {
        turn = player1;
        state[index] ="O"; //storing move in the cell clicked (in state array)
        document.getElementById(cellId).setAttribute( "class","cell O" ); // Update cell colour 
    }
    checkingForWinner(); //After each click - is a winner? 
    checkingForDraw(); // Is a draw?
    render(); // Update screen 
}

for ( let i=0; i < cells.length; i++ ) {
    cells[i].addEventListener( "click", cellClicked )
} // cells is link html to the js, this is where we go through each cell and link the cellClicked function to the click event 

// break it up smaller
// Check: