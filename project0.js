const player1 = "Player1";
const player2 = "Player2";
let turn = player1;
let winner;
const player = document.getElementById( "player" )
const cells = document.getElementsByClassName( "cell" )
const state = ["", "", "", "", "", "",  "", "", ""]
const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
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
}
const checkingForDraw = () => {
    if ( gameOver === true ) {
        return;
    }
    let movesRemaining = false;
    for( let i = 0; i < state.length; i++ ) {
        if ( state[i] === "" ) {
            movesRemaining = true;
        }
    }
    if ( movesRemaining === false ) {
        gameOver = true;
    }
}

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
}

const cellClicked = (event) => {
    const cellId = event.target.id
    const index = event.target.getAttribute( "data-index" )
    if( gameOver === true ) {
        return;
    }
    if(state[index] !== "") {
        return;
    } 
    if ( turn === player1 ) {
        turn = player2;
        state[index] ="X";
        document.getElementById( cellId ).setAttribute( "class","cell X" );
    } else {
        turn = player1;
        state[index] ="O";
        document.getElementById(cellId).setAttribute("class","cell O");
    }
    checkingForWinner();
    checkingForDraw();
    render();
}

for ( let i=0; i < cells.length; i++ ) {
    cells[i].addEventListener( "click", cellClicked )
}

// break it up smaller
// Check: