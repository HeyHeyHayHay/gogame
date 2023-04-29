
// Import

//import Shape from "src/shape.ts";
import * as BoardStateList from "./boardStateList"
import * as GameLogic from "./gameLogic"
import * as Score from "./score"
import * as BoardFunctions from "./board"
import * as Shapes from "./shapes"


// Initialize


// Actions

const startGame = (boardSideLength:number, komi:number) => {
  BoardStateList.beginList(boardSideLength);
  Score.initializeScore(komi);
}




/*
const attemptPlacingAStone = (row, column) => {
  GameLogic.attemptStonePlacement(row, column)

  if (GameLogic.KO == true){
    //ko error
  }

  if (GameLogic.suicide == true){
    //suicide error
  }

}
*/


const pass = () => {
  BoardStateList.pushBoard(
    BoardStateList.latestBoard()
  )
}


/*
const endGame = () => {

}
*/


startGame(2,7.5)

pass()
pass()

//attemptPlacingAStone(3,4)

Score.addScore(3,1);

console.log(Score.score);

console.log(BoardStateList.listLength())

console.log(BoardStateList.boardStateList)

// Export
