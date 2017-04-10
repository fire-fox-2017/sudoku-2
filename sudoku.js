"use strict"

class Sudoku {
  constructor(board_string) {
    this.BOARD_LENGTH = 9;
    this.content = this.strToMatrix(board_string);
  }

  strToMatrix(str) {
    let matrix = [];
    for (let i = 0, idx = 0; i < this.BOARD_LENGTH; i++) {
      matrix.push([]);
      for (let j = 0; j < this.BOARD_LENGTH; j++, idx++) {
        if (str[idx] != undefined) {
          matrix[i].push(parseInt(str[idx]));
        } else {
          matrix[i].push(0);
        }
      }
    }
    return matrix;
  }

  checkColumn(value, i, j) {
    // Mengembalikan true jika tidak ada value pada kolom yg sama
    for (let k = 0; k < this.BOARD_LENGTH; k++) {
      if (value == this.content[k][j]) {
        return false;
      }
    }
    return true;
  }

  checkRow(value, i, j) {
    // Mengembalikan true jika tidak ada value pada baris yg sama
    for (let k = 0; k < this.BOARD_LENGTH; k++) {
      if (value == this.content[i][k]) {
        return false;
      }
    }
    return true;
  }

  checkBlock(value, i, j) {
    // Mengembalikan true jika tidak ada value pada blok yang sama
    let columnStart = Math.floor(j / 3) * 3;
    let rowStart = Math.floor(i / 3) * 3;
    for (let k = rowStart; k < Math.sqrt(this.BOARD_LENGTH) + rowStart; k++) {
      for (let l = columnStart; l < Math.sqrt(this.BOARD_LENGTH) + columnStart; l++) {
        if (value == this.content[k][l]) {
          return false;
        }
      }
    }
    return true;
  }

  solve() {
    for (let i = 0; i < this.BOARD_LENGTH; i++) {
      for (let j = 0; j < this.BOARD_LENGTH; j++) {
        // Cek jika elemen matrix bernilai 0
        if (this.content[i][j] == 0) {
          // Proses pengisian
          // Cek 3 kondisi terpenuhi
          for (let k = 1; k < 10; k++) {
            if (this.checkRow(k, i, j) && this.checkColumn(k, i, j) && this.checkBlock(k, i, j)) {
              this.content[i][j] = k;
              break;
            }
          }

        }
      }
    }
    return this;
  }

  // Returns a string representing the current state of the board
  board() {
    let str = "---------------------\n";
    for (let i = 0; i < this.BOARD_LENGTH; i++) {
      for (let j = 0; j < this.BOARD_LENGTH; j++) {
        if (j == 8) {
          str += this.content[i][j] + "\n";
        } else if (j == 2 || j == 5) {
          str += this.content[i][j] + " | ";
        } else {
          str += this.content[i][j] + " ";
        }
      }

      if (i == 2 | i == 5 | i == 8) {
        str += "\n---------------------\n";
      } else {
        str += "\n";
      }
    }
    return str;
  }


}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)


//Remember: this will just fill out what it can and not "guess"
console.log("Sudoku board state before solved");
console.log(game.board());
game.solve();
console.log("Sudoku board state after solved");
console.log(game.board());
