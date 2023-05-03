
// Import
import * as BoardFunctions from "./board"

/*
import {gameInitialTruths as GameInitialTruths} from "./index"

const boardSideLength:number = GameInitialTruths.boardSideLength;
*/

// board state list

export var boardStateList:Array<Array<Array<number>>> = [];

//functions

export const beginList = (boardSideLength:number) => {
  let firstBoard = createEmptyBoard(boardSideLength);
  pushBoard(firstBoard);
}

export const reset = () => {
  var newList:Array<Array<Array<number>>> = [[[]]];
  boardStateList = newList;
}

export const resetSameSize = (boardStateList:Array<Array<Array<number>>>) => {
  reset();
  let sameSideLength = boardStateList.length;
  beginList(sameSideLength);
}

export const createEmptyBoard = (boardSideLength:number) => {

  let board = Array(boardSideLength).fill(0).map(() => Array(boardSideLength).fill(0));

  return board;
}

export const pushBoard = (board:Array<Array<number>>) => {
  boardStateList.push(board);
}

export const boardFromIndex = (turn:number) => {
  return boardStateList[turn];
}

export const latestBoard = () => {
  return boardStateList[listLength()-1]
}

export const deleteLatestBoard = () => {

  boardStateList.splice(
    boardStateList.length-1,
    1
  )

}

export const listLength = () => {
  return boardStateList.length;
}

export const compareByIndex = (index1:number, index2:number) => {
  //returns true if they are the same
  let firstComparisonBoard = boardStateList[index1];
  let secondComparisonBoard = boardStateList[index2];

  if (
    firstComparisonBoard == undefined
    ||
    secondComparisonBoard == undefined
  ) { return false }

  for (let i = 0; i < boardStateList[index1].length; i++) {
    for (let j = 0; j < boardStateList[index1].length; j++) {
      if (
        boardStateList[index1][i][j] != boardStateList[index2][i][j]

      ) return false
    }
  }
  return true
}

export const createNewBoardWhichMatchesThisBoard = (board:Array<Array<number>>) =>{
let boardLength = board.length;
  let newBoard:Array<Array<number>> = createEmptyBoard(boardLength);

  for (let i = 0; i < boardLength; i++) {
    for (let j = 0; j < boardLength; j++) {
      newBoard[i][j] = board[i][j];
    }
  }
  return newBoard;
}

export const createNewBoardWithReplacedValue = (row:number, column:number, value:number) => {

  let newBoard:Array<Array<number>> = createNewBoardWhichMatchesThisBoard(latestBoard())

  newBoard = BoardFunctions.changeValueAtRowColumnTo(newBoard, row, column, value)

  pushBoard(newBoard)

}

//Export
//export {};
