"use strict"

class Sudoku {
    constructor(board_string) {
        this._boardString = board_string;
        this._papanSudoku = this.board();
        this._posisiKosong = [];
    }

    // Returns a string representing the current state of the board
    board() {
      let ukuranPapan = 9;
      let lokasiAngka = 0;
      let tmp = [];

      for (var i = 0; i < ukuranPapan; i++) {
          let tmpPapanSudoku = [];
          for (var j = 0; j < ukuranPapan; j++) {
              tmpPapanSudoku.push(+this._boardString[lokasiAngka]);
              lokasiAngka++;
          }
          tmp.push(tmpPapanSudoku);
      }
      return tmp;
    }

    cariPosisiKosong() {
        for (var baris = 0; baris < this._papanSudoku.length; baris++) {
            for (let kolom = 0; kolom < this._papanSudoku[baris].length; kolom++) {
                if (this._papanSudoku[baris][kolom] == 0) {
                    this._posisiKosong.push([baris, kolom]);
                }
            }
        }
        return this._posisiKosong;
    }

    cekBarisPapan(kolomAngka, angka) {
        for (var baris = 0; baris < 9; baris++) {
            if (this._papanSudoku[baris][kolomAngka] == angka) {
                return false;
            }
        }
        return true;
    }

    //cek pada kolom papan, dimulai dari kolom 0, lalu lanjut ke kanan
    cekKolomPapan(barisAngka, angka) {
        for (var kolom = 0; kolom < 9; kolom++) {
            if (this._papanSudoku[barisAngka][kolom] == angka) {
                return false;
            }
        }
        return true;
    }

    cekKolom3x3(barisAngka, kolomAngka, angka) {
        var kotak = 3;
        var posKolom = 0;
        var posBaris = 0;

        //untuk mencari baris kotak 3x3 dari posisi angka yang ada di papan sudoku
        while (barisAngka >= posBaris + kotak) {
            posBaris += kotak; //batas baris min
        }

        //untuk mencari kolom kotak 3x3 dari posisi angka yang ada di papan sudoku
        while (kolomAngka >= posKolom + kotak) {
            posKolom += kotak; //batas kolom min
        }

        for (var baris3x3 = posBaris; baris3x3 < posBaris + kotak; baris3x3++) {
            for (var kolom3x3 = posKolom; kolom3x3 < posKolom + kotak; kolom3x3++) {
                if (this._papanSudoku[baris3x3][kolom3x3] == angka) {
                    return false;
                }
            }
        }
        return true;
    }

    cekAngka(barisAngka, kolomAngka, angka) {
        if (this.cekBarisPapan(kolomAngka, angka) &&
            this.cekKolomPapan(barisAngka, angka) &&
            this.cekKolom3x3(barisAngka, kolomAngka, angka)) {
            return true;
        } else {
            return false;
        }
    }

    solve() {
        var limit = 9;
        var baris;
        var kolom;
        var angka;
        var found;
        for (let i = 0; i < this._posisiKosong.length;) {
            baris = this._posisiKosong[i][0]
            kolom = this._posisiKosong[i][1];
            angka = this._papanSudoku[baris][kolom] + 1;
            found = false;
            while (!found && angka <= limit) {
                if (this.cekAngka(baris, kolom ,angka)) {
                    found = true;
                    this._papanSudoku[baris][kolom] = angka
                    i++
                } else {
                    angka++;
                }
            }

            if (!found) {
                this._papanSudoku[baris][kolom] = 0;
                i--;
            }
        }

        return this._papanSudoku;
    }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-04_peter-norvig_11-hardest-puzzles.txt')
    .toString()
    .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
console.log(game.board());
game.cariPosisiKosong();
console.log(`\n Hasil :`);
console.log(game.solve());
