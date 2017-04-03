"use strict"

class Sudoku {
  constructor(board_string) {
    this.BOARD_LENGTH = 9;
    this.boards = this.generateBoard(board_string);
    this.emptySquares = this.getEmptySquare();
  }

  generateBoard(str) {
    // Mengembalikan string menjadi array 2 dimensi yang berisi value awal tiap square
    let matrix = [];
    for (let i = 0, idx = 0; i < this.BOARD_LENGTH; i++) {
      matrix.push([]);
      for (let j = 0; j < this.BOARD_LENGTH; j++, idx++) {
        matrix[i].push(parseInt(str[idx]));
      }
    }
    return matrix;
  }

  getEmptySquare() {
    // Mengembalikan array yang berisi key to empty square dan kemungkinan angka yang bisa diisi
    let arr = [];
    for (let i = 0; i < this.BOARD_LENGTH; i++) {
      for (let j = 0; j < this.BOARD_LENGTH; j++) {
        if (this.boards[i][j] == 0) {
          arr.push([i, j]);
        }
      }
    }
    return arr;
  }

  checkColumn(value, j) {
    // Mengembalikan true jika tidak ada value pada kolom yg sama
    for (let i = 0; i < this.BOARD_LENGTH; i++) {
      if (value == this.boards[i][j]) {
        return false;
      }
    }
    return true;
  }

  checkRow(value, i) {
    // Mengembalikan true jika tidak ada value pada baris yg sama
    for (let j = 0; j < this.BOARD_LENGTH; j++) {
      if (value == this.boards[i][j]) {
        return false;
      }
    }
    return true;
  }

  checkBlock(value, i, j) {
    // Mengembalikan true jika tidak ada value pada blok yang sama
    let rowStart = Math.floor(i / 3) * 3;
    let columnStart = Math.floor(j / 3) * 3;
    for (let k = rowStart; k < this.BOARD_LENGTH / 3 + rowStart; k++) {
      for (let l = columnStart; l < this.BOARD_LENGTH / 3 + columnStart; l++) {
        if (value == this.boards[k][l]) {
          return false;
        }
      }
    }
    return true;
  }

  checkValue(value, i, j) {
    // Mengembalikan true jika tidak ada value pada baris, kolom, dan blok yang sama
    return (this.checkColumn(value, j) && this.checkRow(value, i) && this.checkBlock(value, i, j));
  }

  solve() {
    for (let i = 0; i < this.emptySquares.length;) {
      let row = this.emptySquares[i][0];
      let column = this.emptySquares[i][1];
      let value = this.boards[row][column] + 1;
      let found = false;
      while (!found && value <= this.BOARD_LENGTH) {
        if (this.checkValue(value, row, column)) {
          found = true;
          this.boards[row][column] = value;
          i++;
        } else {
          value++;
        }
      }
      if (!found) {
        this.boards[row][column] = 0;
        i--;
      }
    }
    this.board();
  }

  board() {
    let str = "---------------------\n";
    for (let i = 0; i < this.BOARD_LENGTH; i++) {
      for (let j = 0; j < this.BOARD_LENGTH; j++) {
        if (j == 8) {
          str += this.boards[i][j] + "\n";
        } else if (j == 2 || j == 5) {
          str += this.boards[i][j] + " | ";
        } else {
          str += this.boards[i][j] + " ";
        }
      }

      if (i == 2 | i == 5 | i == 8) {
        str += "\n---------------------\n";
      } else {
        str += "\n";
      }
    }
    console.log(str);
  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  reset_board() {
    console.log("\x1B[2J")
  }


}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs');
var board_string = fs.readFileSync('set-04_peter-norvig_11-hardest-puzzles.txt')
  .toString()
  .split("\n")[0];

var game = new Sudoku(board_string);

//Remember: this will just fill out what it can and not "guess"
game.board();
game.solve();
