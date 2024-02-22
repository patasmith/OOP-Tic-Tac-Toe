class Player {
  #mark;
  constructor(mark) {
    this.#mark = String(mark);
  }
  getMark() {
    return this.#mark;
  }
}

class Gameboard {
  #size;
  #range;
  #board;
  
  constructor(size) {
    this.#size = parseInt(size) || 0;
  }
  
  initializeBoard() {
    this.#range = Array.from(Array(this.#size ** 2).keys());
  }
  
  #rangeToBoard() {
    let range = [...this.#range];
    this.#board = [];
    while (range.length > 0) {
      this.#board.push(range.splice(0, this.#size));
    }
  }
  
  moveWithinRange(move) {
    return move >= 0 && move < this.#range.length;
  }
  
  setMove(move, mark) {
    this.#range[move] = mark;
  }
  
  #horizontalMatch() {
    for (let row = 0; row < this.#size; row++) {
      if (this.#board[row].every((col, _, r) => col === r[0])) {
        return this.#board[row][0];
      }
    }
    return false;
  }
  #verticalMatch() {
    for (let col = 0; col < this.#size; col++) {
      let column = this.#board.map(row => row[col]);
      if (column.every((row, _, c) => row === c[0])) {
        return column[0];
      }
    }
    return false;
  }
  #leftDiagonalMatch() {
    let match = [];
    for (let i = 0; i < this.#size; i++) {
      match.push(this.#board[i][i]);
    }
    return match.every((move, _, m) => move === m[0]) ? match[0] : false;
  }
  #rightDiagonalMatch() {
    let match = [];
    let col = this.#size;
    for (let row = 0; row < this.#size; row++) {
      col--;
      match.push(this.#board[row][col]);
    }
    return match.every((move, _, m) => move === m[0]) ? match[0] : false;
  }
  getWinner() {
    this.#rangeToBoard();
    return this.#horizontalMatch()
        || this.#verticalMatch()
        || this.#leftDiagonalMatch()
        || this.#rightDiagonalMatch();
  }
}

export class Game {
  #p1;
  #p2;
  #gameboard;
  #activePlayer;
  #winner;
  
  constructor(size) {
    this.#p1 = new Player("X");
    this.#p2 = new Player("O");
    this.#gameboard = new Gameboard(size);
  }
  
  #switchPlayer() {
    this.#activePlayer = !this.#activePlayer;
  }

  #getActivePlayer() {
    return this.#activePlayer ? this.#p1 : this.#p2;
  }
  
  startGame() {
    this.#activePlayer = true;
    this.#winner = false;
    this.#gameboard.initializeBoard();
    // TODO: count is temp to prevent infinite loops while testing
    let count = 0;
    while (count < 9) {
      this.#nextMove(this.#getActivePlayer());
      this.#checkWin();
      if (this.#winner) break;
      this.#switchPlayer();
      count++;
    }
    console.log("The winner is", this.#winner);
  }

  #askForMove() {
    return parseInt(prompt("What is your move?"));
  }
  
  #nextMove(player) {
    let move = false;
    while (!move) {
      move = this.#askForMove();
      if (this.#gameboard.moveWithinRange(move)) {
        break;
      }
      move = false;
    }
    console.log(move, player.getMark());
    this.#gameboard.setMove(move, player.getMark());
  }
  #checkWin() {
    this.#winner = this.#gameboard.getWinner();
  }
}
