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
    const range = [...this.#range];
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
      const column = this.#board.map(row => row[col]);
      if (column.every((row, _, c) => row === c[0])) {
        return column[0];
      }
    }
    return false;
  }
  #leftDiagonalMatch() {
    const match = [];
    for (let i = 0; i < this.#size; i++) {
      match.push(this.#board[i][i]);
    }
    return match.every((move, _, m) => move === m[0]) ? match[0] : false;
  }
  #rightDiagonalMatch() {
    const match = [];
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
    this.handleMove = this.handleMove.bind(this);
  }
  
  #switchPlayer() {
    this.#activePlayer = !this.#activePlayer;
  }

  #getActivePlayer() {
    return this.#activePlayer ? this.#p1 : this.#p2;
  }

  initializeGame() {
    this.#activePlayer = true;
    this.#winner = false;
    this.#gameboard.initializeBoard();    
  }

  handleMove(move) {
    const mark = this.#getActivePlayer().getMark();
    console.log(`Player ${mark} made move at`, move);
    this.#gameboard.setMove(move, mark);
    this.#checkWin();
    this.#winner
      ? console.log("Winner:", this.#winner)
      : this.#switchPlayer();
    return mark;
  }
  
  #checkWin() {
    this.#winner = this.#gameboard.getWinner();
  }
}
