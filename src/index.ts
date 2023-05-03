
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

GameLogic.attemptStonePlacement(0,1,1)
GameLogic.attemptStonePlacement(1,0,1)
GameLogic.attemptStonePlacement(1,2,1)
GameLogic.attemptStonePlacement(2,1,1)
//shouldn't work
GameLogic.attemptStonePlacement(0,1,1)
GameLogic.attemptStonePlacement(0,1,-1)

GameLogic.attemptStonePlacement(0,2,-1)
GameLogic.attemptStonePlacement(2,2,-1)
GameLogic.attemptStonePlacement(1,3,-1)

GameLogic.attemptStonePlacement(1,1,-1)
GameLogic.attemptStonePlacement(1,2,1)



//Shapes.killShape(Shapes.findShapeByIndex(1,1))


//attemptPlacingAStone(3,4)

console.log(BoardStateList.boardStateList)

//BoardStateList.createNewBoardWithReplacedValue(1,1,-1)

//GameLogic.captureDueToPlacement(1,1)


console.log(Score.score)




// Export
