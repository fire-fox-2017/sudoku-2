"use strict"

class Sudoku {
  constructor(board_string) {
  this._value = board_string;
  this._board = [];
  }

  board() {
    let baris =[]
    let k=0;
    for(let i=0; i<9;i++){
      baris =[];
      for(let j=0;j<9;j++){
          baris.push(this._value[k])
          k++;
      }
      this._board.push(baris);
    }
    console.log(this._board);
  }

  cekValueTersisa(arrTerpakai){
    let string;
    let valueTersisa=[];
    for(let i=1;i<=9;i++){
        string=''+i;
        if(arrTerpakai.indexOf(string) == -1 ){
            valueTersisa.push(''+i)
        }
    }
    return valueTersisa;
  }


  cekValueTerpakai(baris, kolom){
    let tmpValue=[]

    for(let i=0; i<9;i++){
      for(let j=0;j<9;j++){
          if(i==baris){
              tmpValue.push(this._board[i][j])
          }

          if(j==kolom){
              tmpValue.push(this._board[i][j])
          }
      }
    }

    var columnCorner = 0,
        rowCorner = 0,
        squareSize = 3;

    // Find the left-most column
    while(kolom >= columnCorner + squareSize) {
      columnCorner += squareSize;
    }

    // Find the upper-most row
    while(baris >= rowCorner + squareSize) {
      rowCorner += squareSize;
    }

    // Iterate through each row
    for(var i = rowCorner; i < rowCorner + squareSize; i++) {
      // Iterate through each column
      for(var j = columnCorner; j < columnCorner + squareSize; j++) {
        // Return false is a match is found
        tmpValue.push(this._board[i][j])
      }
    }
    return tmpValue;
  }

  cekKordinatKosong(){
    let arr=[]
    for(let row=0; row<9 ; row++){
      for(let col=0; col<9; col++){
        if(this._board[row][col] == '0'){
          arr.push([row, col])
        }
      }
    }
    return arr;
  }


  solve() {
    let kordinatKosong = this.cekKordinatKosong() //berbentuk array of array
    let kordinatKosongTerakhir = kordinatKosong[kordinatKosong.length-1]
    let i=0
    let j=0
    let z=0
    // console.log(this._board[kordinatKosong[i][0]][kordinatKosong[i][1]])
    // let cek = this.cekValueTerpakai(kordinatKosong[1][0], kordinatKosong[1][1])
    // console.log(kordinatKosong[0][0], kordinatKosong[0][1])
    // let sisaValue = this.cekValueTersisa(cek)
    // console.log(sisaValue)
    do{
      // let row = kordinatKosong[i][0]
      // let col = kordinatKosong[i][1]
      let cek = this.cekValueTerpakai(kordinatKosong[1][0], kordinatKosong[1][1])
      let sisaValue = this.cekValueTersisa(cek)
      // console.log(i)
      // console.log(sisaValue)


      //jika tidak ada nilai tersisa saat maju di set 0, dan saat mundur, tidak ada nilai juga
      if(sisaValue.length == 0) {
        // console.log('masuk if', i)
        // console.log(sisaValue)
        // console.log(''+kordinatKosong[i][0]+' '+kordinatKosong[i][1])
        // console.log(this._board[kordinatKosong[i][0]][kordinatKosong[i][1]]);
        this._board[kordinatKosong[i][0]][kordinatKosong[i][1]] = '0'
        i--
      }


      else if(sisaValue.length>0){
          if(this._board[kordinatKosong[i][0]][kordinatKosong[i][1]]!= '0'){
            let valuesebelumnya = this._board[kordinatKosong[i][0]][kordinatKosong[i][1]]
            this._board[kordinatKosong[i][0]][kordinatKosong[i][1]] = '0'

            for(let i=0; i<sisaValue.length; i++){
              if(sisaValue[i] == valuesebelumnya){
                var k=i;
              }
            }
            j=k+1;
          }
          this._board[kordinatKosong[i][0]][kordinatKosong[i][1]] = sisaValue[j]
          i++;
          j=0
      }

      //klo saat next, tidak ada nilai



      console.log('i nya ini',i)
      z++
    }while(z<10)

    console.log(this._board)
  }



}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku('619030040270061008000047621486302079000014580031009060005720806320106057160400030')


game.board();
console.log('-------')

game.solve()


