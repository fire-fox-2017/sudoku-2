"use strict"

class Sudoku {
  constructor(board_string) {
  	this.board_string = board_string;
  	this.arrBoard = this.createFirstBoard();
  	this.emptyPositions = this.saveEmptyPositions(this.arrBoard);
  }

  createFirstBoard(){
    let temp = new Array(9);
    let index = 0;
    for(let i=0;i<temp.length;i++){
      temp[i] = new Array(9);
      for(let j=0;j<temp.length;j++){
        temp[i][j] = +this.board_string[index++];
      }
    }
    return temp;
  }
  // Returns a string representing the current state of the board
  board() {
    let temp = [];
    for(let i=0;i<this.arrBoard.length;i++){
      if(i%3 == 0){
        console.log('---------------------');
      }
      for(let j=0;j<this.arrBoard.length;j++){
        if(j!=0 && j%3 == 0) {
          temp.push('|');
        }
        temp.push(this.arrBoard[i][j]);
      }
      console.log(temp.join(' '));
      temp = [];
    }
    console.log('---------------------');
  }


	saveEmptyPositions(board){
		let emptyPositions = [];

	  // Check every square in the puzzle for a zero
	  for(let i = 0; i < board.length; i++) {
  		for(let j = 0; j < board[i].length; j++) {
  		  // If a zero is found, save that position
  		  if(board[i][j] === 0) {
  			emptyPositions.push([i, j]);
  		  }
  		}
	  }

	  // Return the positions
	  return emptyPositions;
	}

	checkRow(board,row,value){
		// Iterate through every value in the row
		for(let i = 0; i < board[row].length; i++) {
			// If a match is found, return false
  		if(board[row][i] === value) {
  			return false;
  		}
		 }
		  // If no match was found, return true
		  return true;
	}

	checkColumn(board, column, value) {
	  // Iterate through each value in the column
	  for(let i = 0; i < board.length; i++) {
		// If a match is found, return false
  		if(board[i][column] === value) {
  		  return false;
  		}
	  }
	  // If no match was found, return true
	  return true;
	}

	check3x3square(board, column, row, value){
	// Save the upper left corner
	  let columnCorner = 0,
		    rowCorner = 0,
		    squareSize = 3;

	  // Find the left-most column
	  while(column >= columnCorner + squareSize) {
		    columnCorner += squareSize;
	  }

	  // Find the upper-most row
	  while(row >= rowCorner + squareSize) {
		    rowCorner += squareSize;
	  }

	  // Iterate through each row
	  for(let i = rowCorner; i < rowCorner + squareSize; i++) {
  		// Iterate through each column
  		for(let j = columnCorner; j < columnCorner + squareSize; j++) {
  		  // Return false is a match is found
  		  if(board[i][j] === value) {
  			     return false;
  		  }
  		}
	  }
	  // If no match was found, return true
	  return true;
	}

	checkValue(board, row, column, value) {
	  if(this.checkRow(board, row, value) && this.checkColumn(board, column, value) && this.check3x3square(board, column, row, value)) {
		   return true;
	  } else {
		   return false;
	  }
	}

	solvePuzzle(board, emptyPosition){
		for(let i=0;i<emptyPosition.length;i++){
			let row = emptyPosition[i][0];
			let column = emptyPosition[i][1];
			let start = board[row][column] + 1;
			//backtracking
			if(start > 9){
				//console.log(`i = ${i}`);
				board[row][column] = 0;
				i-=2;
			}
			for(let j=start;j<=9;j++){
        // console.log("row : "+row+" column : "+column+" value : ",board[row][column]+" start :"+ j);
				if(this.checkValue(board, row, column, j)){
					  board[row][column] = j;
					break;
				}
				//backtracking
				else if(j==9){
					//console.log(`i = ${i}`);
					board[row][column] = 0;
					i-=2;
				}
			}
      // console.log("------------------------------------");
      this.sleep(100)
      this.clean()
      this.board()
		}
		return board;
	}
  clean() {
    console.log("\x1B[2J")
  }
  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

	solve(){
		this.arrBoard = this.solvePuzzle(this.arrBoard, this.emptyPositions);
	}


}



// The file has newlines at the end of each line,
// so we call split to remove it (\n)
let fs = require('fs')
let board_string = fs.readFileSync('set-04_peter-norvig_11-hardest-puzzles.txt')
  .toString()
  .split("\n")

let game = new Sudoku(board_string[1])
console.log("=====================",game.emptyPositions);

console.log("-------Solve this puzzle!-------");
game.board();
game.solve();
console.log('-------This is the answer!--------');
game.board();

// for(let i = 0; i < board_string.length; i++) {
//   let game = new Sudoku(board_string[i])
//
//   console.log("-------Solve this puzzle!-------");
//   game.board();
//   game.solve();
//   console.log('-------This is the answer!--------');
//   game.board();
// }



// Remember: this will just fill out what it can and not "guess"
//game.solve();

//console.log(game.emptyPositions);

// console.log(game.arrBoard);
