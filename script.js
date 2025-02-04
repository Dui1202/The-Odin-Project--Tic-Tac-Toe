const readline = require("readline");

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
function GameBoard() {
  const rows = 3;
  const cols = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push("* ");
    }
  }

  const drawXO = (player, row, col) => {
    board[row][col] = player.playerSymbol;
  };
  const isFull = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (board[i][j] === "* ") {
          return false;
        }
      }
    }
    return true;
  };
  const printBoard = () => {
    for (let i = 0; i < rows; i++) {
      let rowString = "";
      for (let j = 0; j < cols; j++) {
        rowString += board[i][j];
      }
      console.log(rowString);
    }
  };

  return { drawXO, printBoard, isFull, board, cols, rows };
}

function GameManager() {
  const board = GameBoard();
  const players = [
    {
      id: 1,
      name: "Player 1",
      playerSymbol: "O ",
    },
    {
      id: 2,
      name: "Player 2",
      playerSymbol: "X ",
    },
  ];
  let currentPlayerTurn = players[0];
  let isTie = false;
  const hasWinner = () => {
    for (let i = 0; i < 3; i++) {
      if (
        board.board[i][0] === board.board[i][1] &&
        board.board[i][1] === board.board[i][2] &&
        board.board[i][0] !== "* "
      ) {
        return true;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (
        board.board[0][i] === board.board[1][i] &&
        board.board[2][i] === board.board[1][i] &&
        board.board[0][i] !== "* "
      ) {
        return true;
      }
    }
    if (
      (board.board[0][0] === board.board[1][1] &&
        board.board[2][2] === board.board[1][1] &&
        board.board[0][0] !== "* ") ||
      (board.board[0][2] === board.board[1][1] &&
        board.board[2][0] === board.board[1][1] &&
        board.board[0][2] !== "* ")
    ) {
      return true;
    }
    if (board.isFull() && !isTie) {
      isTie = true;
      return false;
    }
    return false;
  };
  const switchTurn = () => {
    if (currentPlayerTurn.id === 1) {
      currentPlayerTurn = players[1];
    } else {
      currentPlayerTurn = players[0];
    }
  };
  const playTurn = () => {
    console.log(`${currentPlayerTurn.name} 's turn!`);
    rl.question("Enter row: ", (row) => {
      rl.question("Enter col: ", (col) => {
        board.drawXO(currentPlayerTurn, row, col);
        board.printBoard();
        if (hasWinner()) {
          console.log(`${currentPlayerTurn.name} wins!`);
          rl.close();
          return;
        } else if (isTie) {
          console.log("Tie!");
          rl.close();
          return;
        }
        switchTurn();
        playTurn();
      });
    });
  };

  return { playTurn };
}
const game = new GameManager();
game.playTurn();
