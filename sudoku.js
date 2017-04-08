"use strict"

class Sudoku {
    constructor(board_string) {
        this._boardString = board_string;
        this._board = this.board();
        this._empty_board = [];
    }

    // Returns a string representing the current state of the board
    board() {
        let tempBoard1 = [],
            tempBoard2 = [];
        let board = Math.sqrt(this._boardString.length);
        for (let i = 0; i < this._boardString.length; i++) {
            if (this._boardString[i] !== '0') {
                tempBoard1.push(+this._boardString[i]);
            } else {
                tempBoard1.push(+' ');
            }
        }
        for (let j = 0; j < tempBoard1.length; j += board) {
            tempBoard2.push(tempBoard1.slice(j, j + board));
        }
        return tempBoard2;
    }

    empty_board() {
        for (let x = 0; x < this._board.length; x++) {
            for (let y = 0; y < this._board[x].length; y++) {
                if (this._board[x][y] == 0) {
                    this._empty_board.push([x, y])
                }
            }
        }
        return this._empty_board;
    }

    check_row(row, value) {
        for (let i = 0; i < 9; i++) {
            if (this._board[row][i] == value) {
                return false;
            }
        }
        return true;
    }

    check_column(column, value) {
        for (let i = 0; i < 9; i++) {
            if (this._board[i][column] == value) {
                return false;
            }
        }
        return true;
    }

    check_3x3_square(row, column, value) {
        let columnCorner = 0,
            rowCorner = 0,
            squareSize = 3;

        while (column >= columnCorner + squareSize) {
            columnCorner += squareSize
        }

        while (row >= rowCorner + squareSize) {
            rowCorner += squareSize
        }

        for (let i = rowCorner; i < rowCorner + squareSize; i++) {
            for (let j = columnCorner; j < columnCorner + squareSize; j++) {
                if (this._board[i][j] == value) {
                    return false
                }
            }
        }
        return true
    }

    check_value(column, row, value) {
        if (this.check_row(row, value) && this.check_column(column, value) && this.check_3x3_square(row, column, value)) {
            return true
        } else {
            return false
        }
    }

    solve() {
        let limit = 9,
            row, column, value, found;
        for (let i = 0; i < this._empty_board.length;) {
            row = this._empty_board[i][0]
            column = this._empty_board[i][1];
            value = this._board[row][column] + 1;
            found = false;
            while (!found && value <= limit) {
                if (this.check_value(column, row, value)) {
                    found = true;
                    this._board[row][column] = value
                    i++
                } else {
                    value++;
                }
            }

            if (!found) {
                this._board[row][column] = 0;
                i--;
            }
        }

        // this._board.forEach(function(row){
        // console.log(this._board)
        // });

        return this._board;
    }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
    .toString()
    .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
console.log(game.board())
game.empty_board()
console.log(game.solve())
