"use strict"

class Sudoku {
  constructor(board_string) {
    this.str = board_string
  }

  solve(board, emptyPositions) {
    let limit = 9,
    i, row, column, value, found;
    for(i = 0; i < emptyPositions.length;) {
      row = emptyPositions[i][0];
      column = emptyPositions[i][1];
      value = board[row][column] + 1;
      found = false;
      while(!found && value <= limit) {
        if(this.checkValue(board, column, row, value)) {
          found = true;
          board[row][column] = value;
          i++;
        } 
        else {
          value++;
        }
      }
      if(!found) {
        board[row][column] = 0;
        i--;
      }
    }

    board.forEach(function(row) {
      console.log(row);
    });
    
    return board;
  }


  board() {
    let board = [];
    let n = 0;
    for (let i=0; i<9; i++){
      board.push([])
      for (let j=0; j<9; j++){
        board[i].push(Number(this.str[n]));
        n++;
      }
    }
    return board
  }
  
  saveEmptyPositions(board){
    let emptyPositions = [];
    for(let i = 0; i < board.length; i++) {
      for(let j = 0; j < board[i].length; j++) {
        if(board[i][j] === 0) {
          emptyPositions.push([i, j]);
        }
      }
    }
    return emptyPositions;
  }
  checkRow(board,row,value){
    for(let i = 0; i < board[row].length; i++) {
      if(board[row][i] === value) {
        return false;
      }
    }
    return true;
  }
  checkColumn(board,column,value){
    for(let i = 0; i < board.length; i++) {
      if(board[i][column] === value) {
        return false;
      }
    }
    return true;
  }
  checkSquare(board, column, row, value){
    let columnCorner = 0,
    rowCorner = 0,
    squareSize = 3;
    while(column >= columnCorner + squareSize) {
      columnCorner += squareSize;
    }
    while(row >= rowCorner + squareSize) {
      rowCorner += squareSize;
    }
    for(let i = rowCorner; i < rowCorner + squareSize; i++) {
      for(let j = columnCorner; j < columnCorner + squareSize; j++) {
        if(board[i][j] === value) {        
          return false;
        }
      }
    }
    return true;  
  }
  checkValue(board, column, row, value){
    if(this.checkRow(board, row, value) &&
    this.checkColumn(board, column, value) &&
    this.checkSquare(board, column, row, value)) {
      return true;
    } else {
      return false;
    }
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
let fs = require('fs')
let board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

let game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"


console.log(game.board())
game.solve(game.board(), game.saveEmptyPositions(game.board()))