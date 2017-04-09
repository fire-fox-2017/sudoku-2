"use strict"

class Sudoku {
  constructor(board_string) {
    this.boards = this.generate(board_string);
    this.empty = this.get_empty();
  }

  generate(str) {
    debugger;
    let matrix = [];
    for (let i = 0, idx = 0; i < 9; i++) {
      matrix.push([]);
      for (let j = 0; j < 9; j++, idx++) {
        matrix[i].push(parseInt(str[idx]));
      }
    }
    return matrix;
  }

  get_empty() {
    let arr = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.boards[i][j] == 0) {
          arr.push([i, j]);
        }
      }
    }
    return arr;
  }

  validate_column(value, j) {
    for (let i = 0; i < 9; i++) {
      if (value == this.boards[i][j]) {
        return false;
      }
    }
    return true;
  }

  validate_row(value, i) {
    for (let j = 0; j < 9; j++) {
      if (value == this.boards[i][j]) {
        return false;
      }
    }
    return true;
  }

  validate_block(value, i, j) {
    let rowStart = Math.floor(i / 3) * 3;
    let columnStart = Math.floor(j / 3) * 3;
    for (let k = rowStart; k < 9 / 3 + rowStart; k++) {
      for (let l = columnStart; l < 9 / 3 + columnStart; l++) {
        if (value == this.boards[k][l]) {
          return false;
        }
      }
    }
    return true;
  }

  validate_value(value, i, j) {
    return (this.validate_column(value, j) && this.validate_row(value, i) && this.validate_block(value, i, j));
  }

  solve() {
    for (let i = 0; i < this.empty.length;) {
      let row = this.empty[i][0];
      let column = this.empty[i][1];
      let value = this.boards[row][column] + 1;
      let found = false;
      while (!found && value <= 9) {
        if (this.validate_value(value, row, column)) {
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
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
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
}

// so we call split to remove it (\n)
var fs = require('fs');
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0];

var game = new Sudoku(board_string);

//Remember: this will just fill out what it can and not "guess"

game.solve();
