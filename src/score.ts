
const score = [0,0];

const initializeScore = (komi:number) => {
  score[1] = komi;
}

const addScore = (points:number, color:number) => {
  if (color == 1) {
    score[0] += points;
  } else {
    score[1] += points;
  }
}

const winByCalculator = () => {
  var winByPoints:number;
  var color:number;

  if (score[0]>score[1]) {
    winByPoints = score[0] - score[1];
    color = 1;
  } else {
    winByPoints = score[1] - score[0];
    color = -1;
  }

  return [color, winByPoints];
}

export {score, initializeScore, addScore, winByCalculator};
