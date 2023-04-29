
// Import

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

export const listLength = () => {
  return boardStateList.length;
}

//Export
//export {};
