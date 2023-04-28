import { isEqual, findIndex } from "lodash";


// Score board to keep track of scores

class Score {
  blackScore: number;
  whiteScore: number;
  komi: number;

  constructor(komi: number){
    this.komi = komi;
    this.blackScore = 0;
    this.whiteScore = this.komi;

  };

  addScore(points: number, color: number){

      if (color == 1){
        this.blackScore = this.blackScore + points;
      };
      if (color == -1){
        this.whiteScore = this.whiteScore + points;
      };
  };

  consoleLogScore(){
    if (this.blackScore > this.whiteScore){
      console.log('Black: '+this.blackScore+' White: '+this.whiteScore)
      const winBy = this.blackScore - this.whiteScore;
      console.log('Black wins by '+winBy)
    } else {
      console.log('Black: '+this.blackScore+' White: '+this.whiteScore)
      const winBy = this.whiteScore - this.blackScore;
      console.log('White wins by '+winBy)
    };
    return;
  };


//end of Score class
};

//Create bitBoard 0 empty 1 black -1 white

class BitBoard {
  binaryBoard: Array<number>;
  pastBinaryBoard: Array<number>;
  sideLength: number;
  size: number;

  constructor(sideLength: number){
      this.sideLength = sideLength;
      this.size = sideLength*sideLength;
      const startingBoard = Array.apply(null, new Array(this.size)).map(()=> 0);
      this.binaryBoard = startingBoard;
      this.pastBinaryBoard = startingBoard;
  };

  clearBoard(){
    const startingBoard = Array.apply(null, new Array(this.size)).map(()=> 0);
    this.binaryBoard = startingBoard;
    return;
  };

  toMatrix(){
      let matrix = [];

      for (let i = 0; i < this.sideLength; i++) {
        let row = [];
        for (let j = 0; j < this.sideLength; j++) {
          let index = i * this.sideLength + j;
          row.push(this.binaryBoard[index]);
        }
        matrix.push(row);
      }
      return matrix;
  };

  convertSymbols(empty, white, black){
    for (let i = 0; i < this.size; i++){
      if (this.binaryBoard[i] == 1) {
        this.binaryBoard.splice(i,1,black);
      } else if (this.binaryBoard[i] == -1) {
        this.binaryBoard.splice(i,1,white);
      } else {
        this.binaryBoard.splice(i,1,empty);
      };
    };
    return;
  };

  placeStone(row,column,color){
    const index = (row-1)*5 + column - 1;

    //save current board state
    const currentBoardState = this.binaryBoard;

    if (this.binaryBoard[index] != 0){
      return; // check if board is empty at that spot
    } else {
      //place the stone
      this.binaryBoard.splice(index,1,color);
    };


    const newShape = new Shape();
    newShape.firstStone(index, color);

      //test the new future board state

    newShape.findNeighbors();

    const listOfShapesToCheckLifeOrDeath = [];

    (newShape.allNeighborIndices).forEach(index => {
      if (newShape.shape[index] == -color){
        let testShape = findShapeWithIndex(index);
        listOfShapesToCheckLifeOrDeath.push(testShape);
      };
    });

    /*
    for (var testShape of listOfShapesToCheckLifeOrDeath){
      let lifeorDeathValue = testShape.lifeOrDeath()
      if (lifeorDeathValue == 0){
        testShape.capture();
      };
    };
    */

    //future = past. KO error

    if (this.binaryBoard == this.pastBinaryBoard){
      this.binaryBoard = currentBoardState;
      //KO error
      return;
    };

    (newShape.allNeighborIndices).forEach(index => {
      if (newShape.shape[index] == color){
        let oldShape = findShapeWithIndex(index);
        //combinedShape = newShape.combine(oldShape);
      };
    });

    /*
    let suicideValue = newShape.lifeOrDeath()

    if (suicideValue == 0){
      this.binaryBoard = currentBoardState;
      //Suicide error
      return;
    };
    */

    return;

    //end of place stone
  };


//end of bit board class
};

// shapes
const allShapes = [];

class Shape {
  shape: Array<number>;
  neighbors: Array<number>;
  allStoneIndices: Array<number>;
  allNeighborIndices: Array<number>;
  boardSideLength: number;
  boardsize: number;
  numberOfStones: number;
  numberOfLiberties: number;

  constructor(){
    this.boardSideLength = gameBoard.sideLength;
    this.boardsize = this.boardSideLength*this.boardSideLength;
    const startingBoard = Array.apply(null, new Array(this.boardsize)).map(()=> 0);
    this.shape = startingBoard;
    this.neighbors = startingBoard;
    this.allStoneIndices = [];
    this.allNeighborIndices = [];
    this.numberOfStones = 0;
    this.numberOfLiberties = 0;

  };

  findValidDirections(index){
    //create array of valid directions for an index
    let validDirections = [];
    // going above and below board size is okay because they arnt in there
    if (index%this.boardSideLength == 0){
      validDirections.push(index+1);
      validDirections.push(index+this.boardSideLength);
      validDirections.push(index-this.boardSideLength);
    } else if (index%this.boardSideLength == this.boardSideLength - 1){
      validDirections.push(index-1);
      validDirections.push(index+this.boardSideLength);
      validDirections.push(index-this.boardSideLength);
    } else {
      validDirections.push(index+1);
      validDirections.push(index-1);
      validDirections.push(index+this.boardSideLength);
      validDirections.push(index-this.boardSideLength);
    };
    return validDirections;
  };

  findNeighbors(){
    //reset neighbors to zero
    const startingBoard = Array.apply(null, new Array(this.boardsize)).map(()=> 0);
    this.neighbors = startingBoard;

        for (var i of this.allStoneIndices) {
          //interate through all stones in shape
          const directionIndices = this.findValidDirections(i);
          for (var direction of directionIndices) {
            if (this.shape[direction] == 0){
              //add direction to neighbor if it is not in shape already
              this.neighbors[direction] = this.shape[i];
              (this.allNeighborIndices).push(direction);
            };
          };
        };

    return;
  };

  calculateLiberties(){

    let numberOfLiberties = 0;

    for (var i of this.allNeighborIndices) {
      if (gameBoard.binaryBoard[i] == 0){
        numberOfLiberties = numberOfLiberties + 1;
      };
    };

    this.numberOfLiberties = numberOfLiberties;
    return numberOfLiberties;

  };

  calculateStones(){

    this.numberOfStones = (this.allStoneIndices).length;
    return this.numberOfStones;

  };

  firstStone(stoneIndex: number, color){

    (this.allStoneIndices).push(stoneIndex);

    this.shape.splice(stoneIndex,1,color);

    this.findNeighbors();
    this.calculateStones();
    this.calculateLiberties();

    allShapes.push(this);

  };

  lifeOrDeath(){
    this.calculateLiberties()
    if (this.numberOfLiberties == 0){
      return 0;
    } else {
      return life;
    };
  };

  toMatrix(array: Array<number>){
      let matrix = [];

      for (let i = 0; i < this.boardSideLength; i++) {
        let row = [];
        for (let j = 0; j < this.boardSideLength; j++) {
          let index = i * this.boardSideLength + j;
          row.push(array[index]);
        }
        matrix.push(row);
      }
      return matrix;
  };

//end of shape class
};


//Game rules and actions

const findShapeWithIndex = index => {
  let thisIsTheShape = 0;
  for (var shape in allShapes){

    for (var stoneIndex in shape.allStoneIndices){
      if(stoneIndex == index){
        thisIsTheShape = 1;
      };

      if (thisIsTheShape == 1){
        return shape;
      };
    };
  };
}

const findShape = (r,c) => {
  let indices = [];
  let color = gameBoard.binaryBoard[r][c]

  if (color == undefined || color == 0) return [];

  const addIndex = (r2,c2) => {
    if (
      findIndex(
        indices,
        index => index[0] == r2 && index[1] == c2
      ) != -1
    ) return;

    if (gameBoard.binaryBoard[r2][c2] != color) return;

    indices.push([r2,c2])
    addIndex(r2+1,c2)
    addIndex(r2-1,c2)
    addIndex(r2,c2+1)
    addIndex(r2,c2-1)
  }


  return indices;
}


const shape = findShapeWithIndex(3)


// Initialize Data

const score = new Score(6.5);

const gameBoard = new BitBoard(5);

// Testing


gameBoard.placeStone(2,3,1);
gameBoard.placeStone(2,4,-1);

gameBoard.placeStone(4,5,-1);

Function.apply(shape1,gameBoard["lifeOrDeath"])

console.log(allShapes);

export Shape;
export findShapeWithIndex;
export findShape;
