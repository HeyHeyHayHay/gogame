

import * as BoardStateList from "./boardStateList"
import * as BoardFunctions from "./board"

//shape functions

export const findShapeByIndex = (row:number, column:number) => {
  let indices:Array<Array<number>> = [];
  if (BoardStateList.latestBoard()[row] == undefined) return indices;
  let color = BoardStateList.latestBoard()[row][column];

  if (color == undefined) return indices;

  const addIndex = (testRow:number, testColumn:number) => {

    for (let i = 0; i < indices.length; i++){
      if (
        (indices[i][0] == testRow) && (indices[i][1] == testColumn)
      ) return;
    }

    if (BoardStateList.latestBoard()[testRow] == undefined) return;
    if (BoardStateList.latestBoard()[testRow][testColumn] != color) return;

    indices.push([testRow, testColumn])
    addIndex(testRow+1,testColumn)
    addIndex(testRow-1,testColumn)
    addIndex(testRow,testColumn+1)
    addIndex(testRow,testColumn-1)
  }

  addIndex(row, column)

  return indices;
}
