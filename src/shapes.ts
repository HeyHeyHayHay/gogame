

import * as BoardStateList from "./boardStateList"
import * as BoardFunctions from "./board"
import * as Score from "./score"


//shape functions

export const checkIfIndexIsInIndexList = (firstElement:number, secondElement:number, indices:Array<Array<number>>) => {
  let foundIt = 0;

  for (let index = 0; index < indices.length; index++) {
    if (
      (indices[index][0] == firstElement)
      &&
      (indices[index][1] == secondElement)
    ) {
      foundIt = 1;
      return foundIt;
    }
  }
  return foundIt;
}

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

export const findNeighborsOfShape = (indices:Array<Array<number>>) => {
  let neighborIndices:Array<Array<number>> = [];
  if (indices[0] == undefined) return;

  let shapeColor = (BoardStateList.latestBoard())[(indices[0][0])][(indices[0][1])]

  for (let i:number = 0; i < indices.length; i++){
    let testNeighborIndices = BoardFunctions.findNeighborIndices(indices[i][0], indices[i][1])

    const addNeighbor = (test:number) => {

      for (let i = 0; i < neighborIndices.length; i++){
        if (
          (
            neighborIndices[i][0] == (testNeighborIndices[test][0])
          )
          &&
          (
            neighborIndices[i][1] == (testNeighborIndices[test][1])
          )
        ) return;
      }

      if (
        BoardStateList.latestBoard()[(testNeighborIndices[test][0])] == undefined
      ) return;

      if (
          BoardStateList.latestBoard()[(testNeighborIndices[test][0])][(testNeighborIndices[test][1])] == undefined
      ) return;

      if (
          BoardStateList.latestBoard()[(testNeighborIndices[test][0])][(testNeighborIndices[test][1])] == shapeColor
      ) return;

      neighborIndices.push(
        [
          (testNeighborIndices[test][0]), (testNeighborIndices[test][1])
        ]
      )
    }

    for (let test:number = 0; test < 4; test++){

      addNeighbor(test)

    }
  }
  return neighborIndices;
}

export const findNonZeroNeighborIndices = (row:number, column:number) => {
  let indices = [];

  if (
    (BoardStateList.latestBoard())[row+1] != undefined
      &&
      (BoardStateList.latestBoard())[row+1][column] != 0
  ) { indices.push([row+1,column]) }

  if (
    (BoardStateList.latestBoard())[row-1] != undefined
        &&
    (BoardStateList.latestBoard())[row-1][column] != 0
  ) { indices.push([row-1,column]) }

  if (
    (BoardStateList.latestBoard())[row][column+1] != undefined
      &&
    (BoardStateList.latestBoard())[row][column+1] != 0
  ) { indices.push([row,column+1]) }

  if (
    (BoardStateList.latestBoard())[row][column-1] != undefined
      &&
    (BoardStateList.latestBoard())[row][column-1] != 0
  ) { indices.push([row,column-1]) }


  return indices;
}



export const calculateNumberOfLibertiesOfShape = (indices:Array<Array<number>>) => {
  if (indices[0] == undefined) return;
  let neighborIndices = findNeighborsOfShape(indices);
  if (neighborIndices == undefined) return;
  let numberOfLiberties:number = 0;

  for (let i:number = 0; i < neighborIndices.length; i++){

    if (
      0 == BoardStateList.latestBoard()[(neighborIndices[i][0])][(neighborIndices[i][1])]
    ) numberOfLiberties++;
  }
return numberOfLiberties;
}

export const lifeOrDeath = (indices:Array<Array<number>>) => {
  // 1 for life and 0 for death
  let numberOfLiberties = calculateNumberOfLibertiesOfShape(indices);
  let lifeOrDeath = 1;
  if (numberOfLiberties == 0){
    lifeOrDeath = 0;
  } else {
    lifeOrDeath = 1;
  }
  return lifeOrDeath;
}

export const killShape = (indices:Array<Array<number>>) => {

  let scoreToAdd = (sizeAndColor(indices))[0];

  let colorOfShape = (sizeAndColor(indices))[1];

  Score.addScore(scoreToAdd, -colorOfShape)

  turnShapeToValue(indices, 0)

}

export const sizeAndColor = (indices:Array<Array<number>>) => {
  let size:number = indices.length;
  let color:number = BoardStateList.latestBoard()[
    (indices[0][0])
  ][
    (indices[0][1])
  ];
  return [size, color];
}

export const turnShapeToValue = (indices:Array<Array<number>>, value:number) => {

let newBoard = BoardStateList.createNewBoardWhichMatchesThisBoard(BoardStateList.latestBoard())

  for (let index = 0; index < indices.length; index++) {
    BoardFunctions.changeValueAtRowColumnTo(
      newBoard, indices[index][0], indices[index][1], value
    )
  }

  BoardStateList.deleteLatestBoard()
  BoardStateList.pushBoard(newBoard)

}

export const findShapesByIndices = (indices:Array<Array<number>>) => {
  if (indices.length == 0) return;

  let listOfShapes = [findShapeByIndex(indices[0][0], indices[0][1])];
  for (let index = 1; index < indices.length; index++) {
    //for each spot we are checking
    let foundIndexInPreviousShape = 0;
    for (let shape = 0; shape < listOfShapes.length; shape++) {
        //for each shape make sure the spot isn't in a shape we already found

      if (
        checkIfIndexIsInIndexList(indices[index][0], indices[index][1], listOfShapes[shape])
      ) {
        foundIndexInPreviousShape = 1;
      }

    }
    if (!foundIndexInPreviousShape) {

        listOfShapes.push(
          findShapeByIndex(
            indices[index][0], indices[index][1]
          )
        )

    }

  }
  return listOfShapes;
}
