
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


const attemptPlacingAStone = (row:number , column:number, color:number) => {
  GameLogic.attemptStonePlacement(row, column, color)

  if (GameLogic.attemptStonePlacement(row, column, color) == "nonEmpty"){
    nonEmptyError()
    return
  }

  if (GameLogic.attemptStonePlacement(row, column, color) == "ko"){
    koError()
    return
  }

  if (GameLogic.attemptStonePlacement(row, column, color) == "suicide"){
    suicideError()
    return
  }

}




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

const nonEmptyError = () => {
  console.log("nonEmpty")
}

const koError = () => {
  console.log("ko")
}

const suicideError = () => {
  console.log("suicide")
}


//testing stuff from the past


startGame(5,7.5)

attemptPlacingAStone(0,1,1)
attemptPlacingAStone(1,0,1)
attemptPlacingAStone(1,2,1)
attemptPlacingAStone(2,1,1)
//shouldn't work
attemptPlacingAStone(0,1,1)
attemptPlacingAStone(0,1,-1)

attemptPlacingAStone(0,2,-1)
attemptPlacingAStone(2,2,-1)
attemptPlacingAStone(1,3,-1)

attemptPlacingAStone(1,1,-1)
attemptPlacingAStone(1,2,1)

attemptPlacingAStone(4,3,1)
attemptPlacingAStone(3,4,1)
attemptPlacingAStone(3,3,1)
attemptPlacingAStone(3,3,1)


attemptPlacingAStone(4,4,-1)



//Shapes.killShape(Shapes.findShapeByIndex(1,1))


//attemptPlacingAStone(3,4)

console.log(BoardStateList.boardStateList)

//BoardStateList.createNewBoardWithReplacedValue(1,1,-1)

//GameLogic.captureDueToPlacement(1,1)


console.log(Score.score)




// Export
