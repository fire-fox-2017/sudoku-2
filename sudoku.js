"use strict"

class Sudoku {
  constructor(board_string) {
    this.string=board_string.split("");
    this.boardUrut=[];
    this.zona=[];
    this.digit=[];
    this.kosong=[];
  }

  getKosong(){
    for(let i=0;i<this.boardUrut.length;i++){
      for(let j=0;j<this.boardUrut.length;j++){
        if(this.boardUrut[i][j]==='0'){
          this.kosong.push({x:i,y:j});
        }
      }
    }
  }

  checkKosong(){

    for(let i=0;i<this.boardUrut.length;i++){
      for(let j=0;j<this.boardUrut.length;j++){
        if(this.boardUrut[i][j]==='0'){
          return false;
        }
      }
    }
    return true;
  }



  checkBariskosong(x){
    let temp = ['1','2','3','4','5','6','7','8','9',];
    for(let i=0;i<9;i++){
      if((this.boardUrut[x][i]!=='0')){
        temp.splice(temp.indexOf(this.boardUrut[x][i]),1);
      }
    }
    return temp;
  }

  checkBaris(n,x,arr){
    let bool=false;
    for(let i=x;i<=x;i++){
      for(let j=0;j<=8;j++){
        if(arr[i][j]===n){
          return false
        }
      }
    }
    return true
  }
//n=nilainya , y posisi baris hyang dicek, arr= array boardnya
  checkKolom(n,y,arr){
    for(let i=0;i<=8;i++){
      for(let j=y;j<=y;j++){
          if(arr[i][j]===n){
            return false
          }
      }
    }
    return true
  }

  checkKotak(n,x,y,arr){
    x = Math.floor(x / 3) * 3;
    y = Math.floor(y / 3) * 3;

    for (var r = 0; r < 3; r++){
      for (var c = 0; c < 3; c++){
        if (arr[x+r][y+c] == n){
          return false;
        }
      }
    }
    return true;
  }

  isiKotak(pos){
    if(this.checkKosong()===true){

      return true
    }

    let x = this.kosong[pos].x;
    let y = this.kosong[pos].y;
    let temp = this.checkBariskosong(x);

    for(let i=0;i<temp.length;i++){

      if(this.checkBaris(temp[i],x,this.boardUrut)&&this.checkKolom(temp[i],y,this.boardUrut)&&this.checkKotak(temp[i],x,y,this.boardUrut)){
        this.boardUrut[x][y]=temp[i];
        if(this.isiKotak(pos+1)===true){
            return true;
        }
      }
    }
    this.boardUrut[x][y]='0';
    return false;
  }




  solve() {

    for(let j = 0;j <=(9*9)-(9-1) ;j=j+9 ){
      this.boardUrut.push(this.string.slice(j,(j+9)));
    }
     this.getKosong();
     this.isiKotak(0);




  }

  // Returns a string representing the current state of the board
  board() {


    return this.boardUrut;


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
game.solve()

console.log(game.board())
