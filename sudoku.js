"use strict"

class Sudoku {
  constructor(board_string) {
    this._number = board_string;
  }

  solve() {
    let pos = this.posZero()
    let board = this._number;
    let limit = 9;
    let row,col,val,found,i;

    for( i=0; i < pos.length;){
      row = pos[i][0];

      col = pos[i][1];

      val = board[row][col] + 1;

      found = false;

      while(found === false && val <= limit){
        if(this.getNumber(board,row,col,val)){
          board[row][col] = val;
          found = true;
          i++;
        } else {
          val++;
        }
      }
      if(found == false){
        board[row][col]=0;
        i--;
      }
    }

    for(let i=0; i<board.length; i++){
      i==0||i==3||i==6 ? console.log('---------------------') : null;
      console.log(`${board[i].slice(0,3).join(' ')} | ${board[i].slice(3,6).join(' ')} | ${board[i].slice(6).join(' ')}`);
      i==8 ? console.log('---------------------') : null;
    }
  }

  posZero(){
    let arr = [];
    for(let i=0; i<this._number.length; i++){
      for(let j=0; j<this._number[i].length; j++){
        this._number[i][j] == 0 ? arr.push([i,j]): null;
      }
    }
    return arr;
  }

  getNumber(board,row,col,val){
    if(this.checkRow(board,row,val) && this.checkCol(board,col,val) && this.checkBox(board,row,col,val)){
      return true;
    } else {
      return false;
    }
  }

  checkRow(board,row,val){
    for(let i=0; i<board[row].length; i++){
      if(val === board[row][i]){
        return false;
      }
    }
    return true;
  }

  checkCol(board,col,val){
    for(let i=0; i<board.length;i++){
      if (val === board[i][col] ){
        return false;
      }
    }
    return true;
  }

  checkBox(board,row,col,val){
    let box = 3;
    for(let i=row; i<box; i++){
      for(let j=col; j<box; j++){
        val == board[i][j] ? false : null;
      }
    }
    return true;
  }

  // Returns a string representing the current state of the board
  board() {
    let arrnum = this._number .split('').map(Number);
    let board = [];
    let row = 9;
    for(let i=0; i<arrnum.length; i+=row)
      board.push(arrnum.slice(i,i+row));

    this._number = board;
    for(let i=0; i<row; i++){
      i==0||i==3||i==6 ? console.log('---------------------') : null;
      console.log(`${board[i].slice(0,3).join(' ')} | ${board[i].slice(3,6).join(' ')} | ${board[i].slice(6).join(' ')}`);
      i==8 ? console.log('---------------------') : null;
    }
  }
}

var fs = require('fs');
var board_string = fs.readFileSync('set-01_sample.unsolved.txt');
  .toString();
  .split("\n")[0];


var game = new Sudoku(board_string);

game.board();
console.log('===================');
game.solve();