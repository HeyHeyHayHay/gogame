
// Import

//import Shape from "src/shape.ts";
import * as BoardStateList from "./boardStateList"
import * as GameLogic from "./gameLogic"
import * as Score from "./score"
import * as BoardFunctions from "./board"
import * as Shapes from "./shapes"

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


//Errors

const koError = () => {

}

const suicideError = () => {

}


//testing stuff from the past


startGame(5,7.5)

BoardStateList.createNewBoardWithReplacedValue(0,0,-1)
BoardStateList.createNewBoardWithReplacedValue(0,1,-1)
BoardStateList.createNewBoardWithReplacedValue(1,0,-1)
BoardStateList.createNewBoardWithReplacedValue(1,2,-1)
BoardStateList.createNewBoardWithReplacedValue(2,1,-1)
BoardStateList.createNewBoardWithReplacedValue(1,1,1)

pass()

Shapes.killShape(Shapes.findShapeByIndex(1,1))



//attemptPlacingAStone(3,4)

//console.log(BoardStateList.boardStateList)

console.log(Shapes.findShapeByIndex(1,1))

let neighbors = Shapes.findNeighborsOfShape(Shapes.findShapeByIndex(1,1))

console.log(neighbors)

console.log(Shapes.calculateNumberOfLibertiesOfShape(Shapes.findShapeByIndex(1,1)))

console.log(Shapes.lifeOrDeath(Shapes.findShapeByIndex(1,1)))

console.log(Score.score)



// Export
