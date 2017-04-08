"use strict"

class Sudoku {
    constructor(board_string) {
        this._dataString = board_string.match(/\d{9}/g);
        this._arrBoad = [];
        this._tempBoard = [];
        this._maxLength = 9;
        this._groupBoard = [
            ['0,0', '0,1', '0,2', '1,0', '1,1', '1,2', '2,0', '2,1', '2,2'],
            ['0,3', '0,4', '0,5', '1,3', '1,4', '1,5', '2,3', '2,4', '2,5'],
            ['0,6', '0,7', '0,8', '1,6', '1,7', '1,8', '2,6', '2,7', '2,8'],
            ['3,0', '3,1', '3,2', '4,0', '4,1', '4,2', '5,0', '5,1', '5,2'],
            ['3,3', '3,4', '3,5', '4,3', '4,4', '4,5', '5,3', '5,4', '5,5'],
            ['3,6', '3,7', '3,8', '4,6', '4,7', '4,8', '5,6', '5,7', '5,8'],
            ['6,0', '6,1', '6,2', '7,0', '7,1', '7,2', '8,0', '8,1', '8,2'],
            ['6,3', '6,4', '6,5', '7,3', '7,4', '7,5', '8,3', '8,4', '8,5'],
            ['6,6', '6,7', '6,8', '7,6', '7,7', '7,8', '8,6', '8,7', '8,8']
        ]; //TEMPLATE BOARD index 3x3
    }

    board() { //PRINT BOARD
        for (let i = 0; i < this._dataString.length; i++) {
            this._arrBoad.push([]);
            for (let j = 0; j < this._dataString.length; j++) {
                this._arrBoad[i].push(Number(this._dataString[i][j]));
                if (this._dataString[i][j] == '0') {
                    this._tempBoard.push([i, j]); //BOARD KOSONG
                }
            }
        }
        return this._arrBoad;
    }
    solve() {
        let indI, indJ, value, status;
        for (let i = 0; i < this._tempBoard.length;) {
            indI = this._tempBoard[i][0];
            indJ = this._tempBoard[i][1];
            value = this._arrBoad[indI][indJ] + 1;
            status = false;
            while (!status && value <= this._maxLength) {
                if (this.check_value(indI, indJ, value)) {
                    status = true;
                    this._arrBoad[indI][indJ] = value
                    i++
                } else {
                    value++;
                }
            }
            if (!status) {
                this._arrBoad[indI][indJ] = 0;
                i--;
            }
        }
        return this._arrBoad;
    }
    check_value(indI, indJ, value) { // CHECK BARIS DAN GROUP
        if (this.check_row(indI, value) && this.check_column(indJ, value) && this.checkGroup(indI + "," + indJ, value)) {
            return true
        } else {
            return false
        }
    }
    checkGroup(Str, value) {
        let ind = 0;
        for (let i = 0; i < this._groupBoard.length; i++) {
            for (let j = 0; j < this._groupBoard.length; j++) {
                if (Str == this._groupBoard[i][j]) {
                    ind = i;
                }
            }
        }
        for (let i = 0; i < 9; i++) {
            let temp = this._groupBoard[ind][i];
            if (this._arrBoad[temp[0]][temp[2]] == value) {
                return false;
            }
        }
        return true;
    }
    check_row(indI, value) {
        for (let i = 0; i < 9; i++) {
            if (this._arrBoad[indI][i] == value) {
                return false;
            }
        }
        return true;
    }

    check_column(indJ, value) {
        for (let i = 0; i < 9; i++) {
            if (this._arrBoad[i][indJ] == value) {
                return false;
            }
        }
        return true;
    }
}
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
    .toString()
    .split("\n")[0]

var game = new Sudoku(board_string)

console.log(game.board())
console.log(game.solve())
