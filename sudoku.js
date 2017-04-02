"use strict"
const DEBUG = false;

class Sudoku {
  constructor(board_string) {
    this._board_string = board_string;
    this._board = [];
    this.createBoard();
  }

  createBoard() {
    let temp = this._board_string.split('');
    for (let i = 0 ; i < temp.length ; i++) {
      this._board.push(temp[i]);
    }

  }

  solve() {
    console.log("solve!");

    // get index zeros
    let zeroIndex = this.findZeroIndex();
    console.log(`zeroIndex = ${zeroIndex}, length = ${zeroIndex.length}`);

    // find index of 0
    // let zero = this._board.indexOf('0');

    while (zeroIndex.length > 0) {

      for (let z = 0 ; z < zeroIndex.length ; z++) {
        let zero = zeroIndex[z];

        if(DEBUG) console.log(`zero = ${zero}`);

        // check possible answer with the row, col, grid
        let answer = ['1','2','3','4','5','6','7','8','9'];

        // check horizontally
        // get start index of row
        let ri = Math.floor(zero/9) * 9;
        if(DEBUG) console.log(`start ri = ${ri}`)
        let rend = ri+9;
        for ( ; ri < rend ; ri++ ) {
          if(DEBUG) console.log(`ri = ${ri}`)
          let pos = answer.indexOf(this._board[ri]);

          // if number is found in the possible answer, delete from possible answer
          if (pos > -1)
            answer.splice(pos,1);
        }
        if(DEBUG) console.log(`check horizontally ---> answer = ${answer}`);


        // check vertically
        // get start index of col
        let ci = zero % 9;
        if(DEBUG) console.log(`start ci = ${ci}`)
        let cend = ci + 73;
        for ( ; ci < cend ; ci+=9 ) {
          if(DEBUG) console.log(`ci = ${ci}`)
          let pos = answer.indexOf(this._board[ci]);
          if(DEBUG) console.log(`pos = ${pos}`)
          if (pos > -1)
            answer.splice(pos,1);
        }
        if(DEBUG) console.log(`check vertically ---> answer = ${answer}`);

        // check grid
        let gi = (Math.floor((zero%9)/3) * 3) + (Math.floor(zero/27) * 27);
        if(DEBUG) console.log(`start gi = ${gi}`)
        for ( let x = 0 ; x < 3 ; x++ ) {
          for (let y = 0 ; y < 3 ; y++) {

            let pos = answer.indexOf(this._board[(gi+(x*9))+y]);
            if(DEBUG) console.log(`this._board[${(gi+(x*9))+y}] = ${this._board[(gi+(x*9))+y]}, pos = ${pos}`)
            if (pos > -1)
              answer.splice(pos,1);
          }
        }
        if(DEBUG) console.log(`check grid ---> answer = ${answer}`);

        // after checking row, col, grid
        //  check if possible answer is only 1, if it is only 1, then assign zero to that answer.
        if (answer.length == 1){
          this._board[zero] = answer[0];

          // remove this index from zeroIndex
          // zeroIndex.splice(zero,1);
        }

        if(DEBUG) console.log(this.board());
      } // end of for zeroIndex

      console.log(this.board());
      // get the index of zeros again
      zeroIndex = this.findZeroIndex();
      console.log(`zeroIndex = ${zeroIndex}, length = ${zeroIndex.length}`);
    } //end of while zeroIndex

  }


  // find index of zero
  findZeroIndex() {
    let zeroIndex = [];
    for (let i = 0 ; i < this._board.length ; i++) {
      if (this._board[i] == '0')
        zeroIndex.push(i);
    }
    return zeroIndex;
  }

  // Returns a string representing the current state of the board
  board() {
    let str = "";
    for (let i = 0 ; i < 9 ; i++) {
      if ( i % 3 === 0)
        str += "---------------------\n";
      for (let j = 0 ; j < 9 ; j++) {
        if (j % 3 === 0 && j != 0)
          str += "| ";
        str += this._board[i*9+j] + " ";
      }
      str += "\n";
    }
    str += "---------------------\n";

    // console.log("\n");
    // console.log(str);
    // console.log("\n");
    return str;
  }


  // =====================================================================
  // Backtracking strategy
  // =====================================================================

  // check horizontal, return true if valid
  checkHorizontal (current) {
    let ri = Math.floor(current/9) * 9;
    if(DEBUG) console.log(`start ri = ${ri}`)
    let rend = ri+9;
    for ( ; ri < rend ; ri++ ) {
      if(DEBUG) console.log(`ri = ${ri}`)
      if( ri != current && this._board[ri] == this._board[current])
        return false;
    }
    return true;
  }

  checkVertical (current) {
    let ci = current % 9;
    if(DEBUG) console.log(`start ci = ${ci}`)
    let cend = ci + 73;
    for ( ; ci < cend ; ci+=9 ) {
      if(DEBUG) console.log(`ci = ${ci}`)
      if( ci != current && this._board[ci] == this._board[current])
        return false;
    }
    return true;
  }

  checkGrid (current) {
    // check grid
    let gi = (Math.floor((current%9)/3) * 3) + (Math.floor(current/27) * 27);
    if(DEBUG) console.log(`start gi = ${gi}`)
    for ( let x = 0 ; x < 3 ; x++ ) {
      for (let y = 0 ; y < 3 ; y++) {

        if( gi != current && this._board[gi] == this._board[current])
          return false;
      }
    }
    return true;
  }


  backtrack (position) {
    position++;
    if (position > 80)
      return true;

    if (this._board[position] != 0) {
      if(!(this.checkHorizontal(position) && this.checkVertical(position) && this.checkGrid(position)))
        return false;

      return this.backtrack(position);
    }
    else {
      for (let num = 1 ; num < 10 ; num++) {
        this._board[position] = num;

        if (this.checkHorizontal(position) && this.checkVertical(position) && this.checkGrid(position)) {
          if (this.backtrack(position))
            return true;
        }

      }
      this._board[position] = 0;
      return false;
    }
  }

  solve_backtrack() {
    for (let i = 0 ; i < this._board.length ; i++) {
      if(this._board[i] != 0 && !(this.checkHorizontal(i) && this.checkVertical(i) && this.checkGrid(i) )) {
        return false;
      }
    }

    return this.backtrack(-1);
  }

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
// var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
//   .toString()
//   .split("\n")[4]

var board_string = fs.readFileSync('set-04_peter-norvig_11-hardest-puzzles.txt')
  .toString()
  .split("\n")[0]


var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
// game.solve()
game.solve_backtrack()

console.log(game.board())
