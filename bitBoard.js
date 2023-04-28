// Score board to keep track of scores
var Score = /** @class */ (function () {
    function Score(komi) {
        this.komi = komi;
        this.blackScore = 0;
        this.whiteScore = this.komi;
    }
    ;
    Score.prototype.addScore = function (points, color) {
        if (color == 1) {
            this.blackScore = this.blackScore + points;
        }
        ;
        if (color == -1) {
            this.whiteScore = this.whiteScore + points;
        }
        ;
    };
    ;
    Score.prototype.consoleLogScore = function () {
        if (this.blackScore > this.whiteScore) {
            console.log('Black: ' + this.blackScore + ' White: ' + this.whiteScore);
            var winBy = this.blackScore - this.whiteScore;
            console.log('Black wins by ' + winBy);
        }
        else {
            console.log('Black: ' + this.blackScore + ' White: ' + this.whiteScore);
            var winBy = this.whiteScore - this.blackScore;
            console.log('White wins by ' + winBy);
        }
        ;
        return;
    };
    ;
    return Score;
}());
;
//Create bitBoard 0 empty 1 black -1 white
var BitBoard = /** @class */ (function () {
    function BitBoard(sideLength) {
        this.sideLength = sideLength;
        this.size = sideLength * sideLength;
        var startingBoard = Array.apply(null, new Array(this.size)).map(function () { return 0; });
        this.binaryBoard = startingBoard;
        this.pastBinaryBoard = startingBoard;
    }
    ;
    BitBoard.prototype.clearBoard = function () {
        var startingBoard = Array.apply(null, new Array(this.size)).map(function () { return 0; });
        this.binaryBoard = startingBoard;
        return;
    };
    ;
    BitBoard.prototype.toMatrix = function () {
        var matrix = [];
        for (var i = 0; i < this.sideLength; i++) {
            var row = [];
            for (var j = 0; j < this.sideLength; j++) {
                var index = i * this.sideLength + j;
                row.push(this.binaryBoard[index]);
            }
            matrix.push(row);
        }
        return matrix;
    };
    ;
    BitBoard.prototype.convertSymbols = function (empty, white, black) {
        for (var i = 0; i < this.size; i++) {
            if (this.binaryBoard[i] == 1) {
                this.binaryBoard.splice(i, 1, black);
            }
            else if (this.binaryBoard[i] == -1) {
                this.binaryBoard.splice(i, 1, white);
            }
            else {
                this.binaryBoard.splice(i, 1, empty);
            }
            ;
        }
        ;
        return;
    };
    ;
    BitBoard.prototype.placeStone = function (row, column, color) {
        var index = (row - 1) * 5 + column - 1;
        //save current board state
        var currentBoardState = this.binaryBoard;
        if (this.binaryBoard[index] != 0) {
            return; // check if board is empty at that spot
        }
        else {
            //place the stone
            this.binaryBoard.splice(index, 1, color);
        }
        ;
        var newShape = new Shape();
        newShape.firstStone(index, color);
        //test the new future board state
        newShape.findNeighbors();
        var listOfShapesToCheckLifeOrDeath = [];
        (newShape.allNeighborIndices).forEach(function (index) {
            if (newShape.shape[index] == -color) {
                var testShape = findShapeWithIndex(index);
                listOfShapesToCheckLifeOrDeath.push(testShape);
            }
            ;
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
        if (this.binaryBoard == this.pastBinaryBoard) {
            this.binaryBoard = currentBoardState;
            //KO error
            return;
        }
        ;
        (newShape.allNeighborIndices).forEach(function (index) {
            if (newShape.shape[index] == color) {
                var oldShape = findShapeWithIndex(index);
                //combinedShape = newShape.combine(oldShape);
            }
            ;
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
    ;
    return BitBoard;
}());
;
// shapes
var allShapes = [];
var Shape = /** @class */ (function () {
    function Shape() {
        this.boardSideLength = gameBoard.sideLength;
        this.boardsize = this.boardSideLength * this.boardSideLength;
        var startingBoard = Array.apply(null, new Array(this.boardsize)).map(function () { return 0; });
        this.shape = startingBoard;
        this.neighbors = startingBoard;
        this.allStoneIndices = [];
        this.allNeighborIndices = [];
        this.numberOfStones = 0;
        this.numberOfLiberties = 0;
    }
    ;
    Shape.prototype.findValidDirections = function (index) {
        //create array of valid directions for an index
        var validDirections = [];
        // going above and below board size is okay because they arnt in there
        if (index % this.boardSideLength == 0) {
            validDirections.push(index + 1);
            validDirections.push(index + this.boardSideLength);
            validDirections.push(index - this.boardSideLength);
        }
        else if (index % this.boardSideLength == this.boardSideLength - 1) {
            validDirections.push(index - 1);
            validDirections.push(index + this.boardSideLength);
            validDirections.push(index - this.boardSideLength);
        }
        else {
            validDirections.push(index + 1);
            validDirections.push(index - 1);
            validDirections.push(index + this.boardSideLength);
            validDirections.push(index - this.boardSideLength);
        }
        ;
        return validDirections;
    };
    ;
    Shape.prototype.findNeighbors = function () {
        //reset neighbors to zero
        var startingBoard = Array.apply(null, new Array(this.boardsize)).map(function () { return 0; });
        this.neighbors = startingBoard;
        for (var _i = 0, _a = this.allStoneIndices; _i < _a.length; _i++) {
            var i = _a[_i];
            //interate through all stones in shape
            var directionIndices = this.findValidDirections(i);
            for (var _b = 0, directionIndices_1 = directionIndices; _b < directionIndices_1.length; _b++) {
                var direction = directionIndices_1[_b];
                if (this.shape[direction] == 0) {
                    //add direction to neighbor if it is not in shape already
                    this.neighbors[direction] = this.shape[i];
                    (this.allNeighborIndices).push(direction);
                }
                ;
            }
            ;
        }
        ;
        return;
    };
    ;
    Shape.prototype.calculateLiberties = function () {
        var numberOfLiberties = 0;
        for (var _i = 0, _a = this.allNeighborIndices; _i < _a.length; _i++) {
            var i = _a[_i];
            if (gameBoard.binaryBoard[i] == 0) {
                numberOfLiberties = numberOfLiberties + 1;
            }
            ;
        }
        ;
        this.numberOfLiberties = numberOfLiberties;
        return numberOfLiberties;
    };
    ;
    Shape.prototype.calculateStones = function () {
        this.numberOfStones = (this.allStoneIndices).length;
        return this.numberOfStones;
    };
    ;
    Shape.prototype.firstStone = function (stoneIndex, color) {
        (this.allStoneIndices).push(stoneIndex);
        this.shape.splice(stoneIndex, 1, color);
        this.findNeighbors();
        this.calculateStones();
        this.calculateLiberties();
        allShapes.push(this);
    };
    ;
    Shape.prototype.lifeOrDeath = function () {
        this.calculateLiberties();
        if (this.numberOfLiberties == 0) {
            return 0;
        }
        else {
            return life;
        }
        ;
    };
    ;
    Shape.prototype.toMatrix = function (array) {
        var matrix = [];
        for (var i = 0; i < this.boardSideLength; i++) {
            var row = [];
            for (var j = 0; j < this.boardSideLength; j++) {
                var index = i * this.boardSideLength + j;
                row.push(array[index]);
            }
            matrix.push(row);
        }
        return matrix;
    };
    ;
    return Shape;
}());
;
//Game rules and actions
var findShapeWithIndex = function (index) {
    var thisIsTheShape = 0;
    for (var shape in allShapes) {
        for (var stoneIndex in shape.allStoneIndices) {
            if (stoneIndex == index) {
                thisIsTheShape = 1;
            }
            ;
            if (thisIsTheShape == 1) {
                return shape;
            }
            ;
        }
        ;
    }
    ;
};
var shape = findShapeWithIndex(3);
// Initialize Data
var score = new Score(6.5);
var gameBoard = new BitBoard(5);
// Testing
gameBoard.placeStone(2, 3, 1);
gameBoard.placeStone(2, 4, -1);
gameBoard.placeStone(4, 5, -1);
console.log(allShapes);
