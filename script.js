function GameBoard(){
    const rows = 3;
    const cols = 3;
    const board = [];

    for(let i = 0; i < rows; i++){
        board[i] = []
        for (let j = 0; j < cols; j++) {
            board[i].push('* ');
        }
    }

    const drawXO = (player, row, col)=>{
        board[row][col] = player.playerSymbol;
    }

    const printBoard = ()=>{
        for(let i = 0; i < rows; i++){
            for (let j = 0; j < cols; j++) {
                console.log(board[i][j]);
            }
            console.log()
        }
    }

    return {drawXO,printBoard}
}

function GameManager(){
    const board = GameBoard();
    const players = [
        {
            id : 1,
            name: "Player 1",
            playerSymbol: "O "
        },
        {
            id : 2,
            name: "Player 2",
            playerSymbol: "X ",
        }
    ]
    let currentPlayerTurn = players[0];
    const switchTurn = ()=>{
        if(currentPlayerTurn.id === 1){
            currentPlayerTurn = players[1];
        } else {
            currentPlayerTurn = players[0];
        }
    }
    const playTurn = (row, col)=>{
        console.log(`${currentPlayerTurn.name} 's turn!`);
        GameBoard.drawXO(currentPlayerTurn, row, col);
    }

}
