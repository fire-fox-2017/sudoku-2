"use strict"
const fs = require('fs');
const board_string = fs.readFileSync('set-01_sample.unsolved.txt').toString().split("\n")[0]

class Sudoku {
  constructor(board_string) {
    this._board = this.makeBoard();
  }

  makeBoard(){
    let tempArray1 = [];
    for(let i=0 ; i<board_string.length ; i++){
      tempArray1.push(Number(board_string[i]));
    }
    let tempArray2 = [];
    for(let i=0 ; i<81 ; i+=9){
      tempArray2.push(tempArray1.slice(i,i+9));
    }
    return tempArray2;
  }

  get board(){
    return this._board;
  }

  checkEmptyPosition(){
    let array = [];
    for(let a=0 ; a<this.board.length ; a++){
      for(let b=0 ; b<this.board[a].length ; b++){
        if(this.board[a][b]===0){
          array.push([a,b]);
        }
      }
    }
    return array;
  }

  checkRow(row,value){
    for(let a=0 ; a<9 ; a++){
      if(this.board[row][a]==value){
        return false;
      }
    }
    return true;
  }

  checkColumn(col,value){
    for(let a=0 ; a<9 ; a++){
      if(this.board[a][col]==value){
        return false;
      }
    }
    return true;
  }

  checkSquare(row, col, value){
    let baseRow = 0;
    let baseColumn = 0;
    let dimension = 3;
    while (row >= baseRow + dimension) {
      baseRow += dimension;
    }
    while(col >= baseColumn + dimension){
      baseColumn += dimension;
    }
    for(let a=baseRow ; a<baseRow+dimension ; a++){
      for(let b=baseColumn ; b<baseColumn+dimension ; b++){
        if(this.board[baseRow][baseColumn]===value){
          return false;
        } else{
          return true;
        }
      }
    }
  }

  // solve() {
  //   debugger;
  //   for (let row = 0; row < 9; row++) {
  //     for (let col = 0; col < 9; col++) {
  //       if (this._board[row][col] == 0) {
  //         for (let x = 1; x < 10; x++) {
  //           if (this.checkRow(row, x)) {
  //             if(this.checkColumn(col,x)){
  //               if(this.checkSquare(row,col,x)){
  //                 this._board[row][col] = x;
  //                 break;
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return this._board;
  // }
  solve(){
    let tempArray = this.checkEmptyPosition();
    let i=0;
    while(i<tempArray.length){
      let condition = false;
      let guess = this.board[tempArray[i][0]][tempArray[i][1]];
      while (!condition && guess < 10) {
        if (this.checkRow(tempArray[i][0], guess)) {
          if(this.checkColumn(tempArray[i][1],guess)){
            if(this.checkSquare(tempArray[i][0],tempArray[i][1],guess)){
              this.board[tempArray[i][0]][tempArray[i][1]] = guess;
              condition = true;
              i++;
              break;
            }
          }
        }
        guess++;
      }
      if(!condition){
        this.board[tempArray[i][0]][tempArray[i][1]]=0;
        i--;
      }
    }
    return this.board;
  }
}


let game = new Sudoku(board_string)


console.log(game.board);
//console.log(game.checkEmptyPosition());
//game.solve();
console.log(game.solve());
