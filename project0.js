const player1 = "Player1";
const player2 = "Player2";
let turn = player1;

const player = document.getElementById("player")
// console.log(player)
const cells = document.getElementsByClassName("cell") 
// console.log(cells.a1)

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
let gameOver = false;

const won = () => {
    for (let i = 0; i < win.length; i++) {
        const winCondition = win[i];
        const condition0 = state[winCondition[0]]
        const condition1 = state[winCondition[1]]
        const condition2 = state[winCondition[2]]
        console.log("------");
        console.log("index:", i, "winCondition", winCondition);
        console.log("condition0", condition0, "condition1", condition1, "condition2", condition2);
        // console.log(state, winCondition);
        if(condition0 === "X" && condition1 === "X" && condition2 === "X") {
            gameOver = true;
            console.log("Player2 wins");
        } 
        if(condition0 === "O" && condition1 === "O" && condition2 === "O") {
            gameOver = true;
            console.log("Player1 wins");
        }
    }
}
const cellClicked = (event) => {
    const cellId = event.target.id
    const index = event.target.getAttribute("data-index")
    if(gameOver===true) {
        return;
    }
    if(state[index] !== "") {
        return;
    } 
    if (turn === player1) {
        turn = player2;
        player.innerHTML ="turn: player2";
        state[index] ="X";
        document.getElementById(cellId).setAttribute("class","cell X");
    } else {
        turn = player1;
        player.innerHTML ="turn: player1";
        state[index] ="O";
        document.getElementById(cellId).setAttribute("class","cell O");
    }
    console.log(state)
    won()
}

for (let i=0; i < cells.length; i++){
    cells[i].addEventListener("click", cellClicked)
}


// Any of these combinations is a win: array of arrays.
// store and check your rules. 
// 0, 1, 2 break it up smaller 
// 3, 4, 5
// 6, 7, 8
// 0, 3, 6
// 1, 4, 7
// 2, 5, 8
// 0, 4, 8
// 2, 4, 6

// Any of these is a draw:

// Check:
// Valid move - is box empty or taken
//     is game over? - has someone already won? Is there a draw?