const readline = require("readline");
const box1 = document.getElementById("1");
const box2 = document.getElementById("2");
const box3 = document.getElementById("3");
const box4 = document.getElementById("4");
const box5 = document.getElementById("5");
const box6 = document.getElementById("6");
const box7 = document.getElementById("7");
const box8 = document.getElementById("8");
const box9 = document.getElementById("9");
const boxes = document.querySelectorAll(".box");

//Create the X svg
const svgNS = "http://www.w3.org/2000/svg";
const svgXViewBox = "0 0 384 512";
const xPathD =
  "M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z";
const xPath = document.createElementNS(svgNS, "path");
xPath.setAttribute("d", xPathD);
const xSymbol = document.createElementNS(svgNS, "svg");
xSymbol.setAttribute("viewBox", svgXViewBox);
xSymbol.appendChild(xPath);

//Create the O svg
const svgOViewBox = "0 0 448 512";
const oPathD =
  "M224 96a160 160 0 1 0 0 320 160 160 0 1 0 0-320zM448 256A224 224 0 1 1 0 256a224 224 0 1 1 448 0z";
const oPath = document.createElementNS(svgNS, "path");
oPath.setAttribute("d", oPathD);
const oSymbol = document.createElementNS(svgNS, "svg");
oSymbol.setAttribute("viewBox", svgOViewBox);
oSymbol.appendChild(oPath);

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
  const isValid = (cell) => {
    if (cell !== "* ") {
      return false;
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

  return { drawXO, printBoard, isFull, board, cols, rows, isValid };
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
        if (board.isValid(board.board[row][col])) {
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
        } else {
          console.log("Invalid move!");
          playTurn();
        }
      });
    });
  };

  return { playTurn, currentPlayerTurn, switchTurn, board };
}

function GameGraphic() {
  const updateScreen = () => {};
  const clickHandlerBoard = (currentPlayerTurn) => {
    boxes.forEach((box) => {
      box.addEventListener("click", () => {
        if (currentPlayerTurn.playerSymbol == "X ") {
          box.appendChild(xSymbol);
        } else {
          box.appendChild(oSymbol);
        }
      });
    });
  };
}
function StartGame() {
  const gameManager = GameManager();
  const gameGraphic = GameGraphic();
}
