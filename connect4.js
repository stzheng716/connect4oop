"use strict";

const startGameBtn = document.querySelector('#startGame');

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

class Game {
  constructor(p1, p2, height = 6, width = 7) {
    this.players = [p1, p2]
    this.width = width;
    this.height = height;
    this.currPlayer = p1;
    this.handleClick = this.handleClick.bind(this);
    this.makeBoard();
    this.makeHtmlBoard();
    this.lockBoard = false;
  }

  /** makeBoard: create in-JS board structure:
 *   board = array of rows, each row is array of cells  (board[y][x])
 */
  makeBoard() {
    this.board = [];
    for (let y = 0; y < this.height; y++) {
      this.board.push(Array.from({ length: this.width }));
    }
  }

  makeHtmlBoard() {
    const board = document.getElementById('board');
    board.innerHTML = "";
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', this.handleClick);

    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', `top-${x}`);
      top.append(headCell);
    }

    board.append(top);

    for (let y = 0; y < this.height; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `c-${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  }

  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundColor = this.currPlayer.color;
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`c-${y}-${x}`);
    spot.append(piece);
  }

  endGame(msg) {
    this.lockBoard = true;
    alert(msg);
  }

  handleClick(evt) {
    if(this.lockBoard){return}
    const x = Number(evt.target.id.slice('top-'.length));

    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);

    if (this.checkForWin()) {
      return this.endGame(`Player ${this.currPlayer} won!`);
    }

    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }

    this.currPlayer = 
      this.currPlayer === this.players[0] ? this.players[1] : this.players[0] ;
  }

  checkForWin() {
    const _win = cells =>
      cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          this.board[y][x] === this.currPlayer
      );

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
        
        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}

class Player {
  constructor(color){
    this.color = color;
  }
}

/** init a new Game */
function startGame(){
  const player1Color = document.querySelector('#player1')
  const player2Color = document.querySelector('#player2')
  const player1 = new Player(player1Color.value)
  const player2 = new Player(player2Color.value)
  new Game(player1,player2)
}

startGameBtn.addEventListener('click', startGame)



/** makeHtmlBoard: make HTML table and row of column tops. */

  // make column tops (clickable area for adding a piece to that column)






  // make main part of board


/** findSpotForCol: given column x, return top empty y (null if filled) */


/** placeInTable: update DOM to place piece into HTML table of board */



/** endGame: announce game end */

/** handleClick: handle click of column top to play piece */

  // get x from ID of clicked cell

  // get next spot in column (if none, ignore click)


  // place piece in board and add to HTML table


  // check for win


  // check for tie


  // switch players



/** checkForWin: check board cell-by-cell for "does a win start here?" */

    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer







