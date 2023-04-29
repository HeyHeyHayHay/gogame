import * as BoardStateList from "./boardStateList"
import * as BoardFunctions from "./board"
import * as Shapes from "./shapes"

//Game Logic Stuff
// stone placement, ko, suicide

export const attemptStonePlacement = (row:number, column:number) => {
  if (
    BoardStateList.latestBoard()[row][column] != 0
  ) return //nonempty();



}

/*
export const ko = (list:Array<Array<number>>) => {
  var ko = (
    list[list.length-1] == list[list.length-3]
  )
  return ko;
}
*/

export const ko = () => {
  var ko = (
    BoardStateList.compareByIndex(
      BoardStateList.listLength()-3, BoardStateList.listLength()-1
    )
  )
  return ko;
}
