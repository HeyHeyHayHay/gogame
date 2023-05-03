import * as BoardStateList from "./boardStateList"
import * as BoardFunctions from "./board"
import * as Shapes from "./shapes"
import * as Score from "./score"


//Game Logic Stuff
// stone placement, ko, suicide

export const attemptStonePlacement = (row:number, column:number, color:number) => {
  let currentScore = [Score.score[0], Score.score[1]];

  if (
    BoardStateList.latestBoard()[row][column] != 0
  ) {return} //nonempty();

  BoardStateList.createNewBoardWithReplacedValue(row, column, color)

  captureDueToPlacement(row, column)

  if (ko()){
    BoardStateList.deleteLatestBoard()
    Score.score[0] = currentScore[0];
    Score.score[1] = currentScore[1];
    return "ko";
  }

  let shape = Shapes.findShapeByIndex(row, column);
  if (Shapes.lifeOrDeath(shape)==0){
    BoardStateList.deleteLatestBoard()
    return "suicide";
  }

}

export const captureDueToPlacement = (row:number, column:number) => {
  let neighbors = Shapes.findNonZeroNeighborIndices(row, column);

  let listOfShapesToCheckLifeOrDeath = Shapes.findShapesByIndices(neighbors);

  if (listOfShapesToCheckLifeOrDeath == undefined) return;

  for (let shape = 0; shape < listOfShapesToCheckLifeOrDeath.length; shape++) {
    if (
      Shapes.lifeOrDeath(listOfShapesToCheckLifeOrDeath[shape]) == 0
    ) {
      Shapes.killShape(listOfShapesToCheckLifeOrDeath[shape])
    }

  }
}

/*
export const ko = (list:Array<Array<number>>) => {
  var ko = (
    list[list.length-1] == list[list.length-3]
  )
  return ko;
}
*/

const ko = () => {
  var ko = (
    BoardStateList.compareByIndex(
      BoardStateList.listLength()-3, BoardStateList.listLength()-1
    )
  )
  return ko;
}
