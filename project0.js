const player1 = "Player1";
const player2 = "Player2";
let turn = player1;


const cells = document.getElementsByClassName("cell") 
console.log(cells.a1)

const cellClicked = (event) => {
    console.log("Hello", event.target.id)
    const cellId = event.target.id
    if (turn === player1) {
        turn = player2;
        document.getElementById(cellId).setAttribute("class","cell X");
    } else {
        turn = player1;
        document.getElementById(cellId).setAttribute("class","cell O");
    }
}

for (let i=0; i < cells.length; i++){
    cells[i].addEventListener("click", cellClicked)
}