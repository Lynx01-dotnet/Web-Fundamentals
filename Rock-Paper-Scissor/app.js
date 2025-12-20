state = {
    playerScore: 0,
    playerChoice: '',
    computerScore: 0,
    computerChoice: '',
    gameOver: false,
    resultMessage: ''
}

initialState = {...state};

const choices = document.querySelectorAll(".choice");

const renderUi = () => {
    const userScore = document.querySelector("#user-score");
    const computerScore = document.querySelector("#comp-score");
    const resultMessage = document.querySelector("#msg");

    userScore.textContent = state.playerScore;
    computerScore.textContent = state.computerScore;
    resultMessage.textContent = state.resultMessage;
}

const computerChoice = () => {
    const compChoiceId = Math.floor(Math.random() * 3);
    const compChoice = choices[compChoiceId].getAttribute("id");
    state.computerChoice = compChoice;
};

const checkGameOver = () => {
    if (state.playerScore === 3 || state.computerScore === 3){
        state.gameOver = !state.gameOver;
        if (state.playerScore === 3){
            state.resultMessage = "Congratulations! You won the entire game!";
        }
        else{
            state.resultMessage = "Game Over! Computer won the entire game!";
        }
    }
}

const playGame = () => {
    computerChoice();
    decideWinner(state.playerChoice, state.computerChoice);
    checkGameOver();
    renderUi();
};

const decideWinner = (player, computer) => {
    if (player === computer) {
        state.resultMessage = "It's a tie!";
    }
    else if( (player === "rock" && computer === "scissors") ||
             (player === "paper" && computer === "rock") ||
             (player === "scissors" && computer === "paper")) {
                state.playerScore += 1;
                state.resultMessage = "You win this round!";
    }
    else{
        state.computerScore += 1;
        state.resultMessage = "Computer wins this round!";
    }
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        if (state.gameOver) {
            state = {...initialState};
            renderUi();
        }
        const choiceId = choice.getAttribute("id");
        state.playerChoice = choiceId;
        playGame();
    });
});

