
// functions on a board

const findValueAtRowColumn = (board:Array<Array<number>>, row:number, column:number) => {
  return board[row][column];
}

const changeValueAtRowColumnTo = (board:Array<Array<number>>, row:number, column:number, value:number) => {
  board[row][column] = value;
}

export {findValueAtRowColumn, changeValueAtRowColumnTo};
