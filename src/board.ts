
// functions on a board


export const changeValueAtRowColumnTo = (board:Array<Array<number>>, row:number, column:number, value:number) => {
  board[row][column] = value;
  return board;
}

export const findNeighborIndices = (row:number, column:number) => {
  let indices = [];
  indices.push([row+1,column])
  indices.push([row-1,column])
  indices.push([row,column+1])
  indices.push([row,column-1])
  return indices;
}
