let boxes= document.querySelectorAll(".box");
let resetBtn= document.getElementById("reset-btn");
let newGameBtn= document.getElementById("newgame-btn");
let msg= document.getElementById("msg");
let winContainer= document.querySelector(".winContainer");

let turnX = true;
let moves = 0;
let gameOver = false;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    })
}

boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        const currentPlayer = turnX ? 'X' : 'O';
        box.textContent = currentPlayer;
        turnX = !turnX;
        box.disabled = true;
        moves++;
        if (checkWin()) return;
        if (moves === 9) drawGame();    
    })
})

const checkWin = () => {
    for(let pattern of winPatterns){
        let box1 = boxes[pattern[0]].textContent;
        let box2 = boxes[pattern[1]].textContent;
        let box3 = boxes[pattern[2]].textContent;
        if(box1 && box1 === box2 && box2 === box3){
            disableBoxes();
            winMsg(box1);
            gameOver = true;
            return true;
        }
    }
}

const winMsg = (player) => {
    showMsg(`Player ${player} wins!`);
}

const resetGame = () => {
    turnX = true;
    moves = 0;
    enableBoxes();
    gameOver = false;
    winContainer.classList.add('hide');
}

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.textContent = "";
    })
}

const drawGame = () => {
    showMsg("It's a Draw!");
}

const showMsg = (message) => {
    winContainer.classList.remove("hide"); 
    msg.textContent = message;
}

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);