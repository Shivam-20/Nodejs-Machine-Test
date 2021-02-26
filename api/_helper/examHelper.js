const async = require("async");
exports.getHighestScore = async (scoreData) => {
  let tempScore = 0;
  let tempObject = {};
  let result = scoreData.map((score) => {
    let sumOfScore = score.first_round + score.second_round + score.third_round;
    tempScore = tempScore > sumOfScore ? tempScore : sumOfScore;
    tempObject = score;
    return;
  });
  return tempObject;
};

exports.averageScore = async (scoreDetails) => {
  let first_round_total = 0;
  let second_round_total = 0;
  let third_round_total = 0;
  let total_conditions = scoreDetails.length;
  let result = scoreDetails.map(async (data) => {
    first_round_total = first_round_total + data.first_round;
    second_round_total = second_round_total + data.second_round;
    third_round_total = third_round_total + data.third_round;
    return;
  });
  let first_round_average = (first_round_total / total_conditions).toFixed(2);
  let second_round_average = (second_round_total / total_conditions).toFixed(2);
  let third_round_average = (third_round_total / total_conditions).toFixed(2);
  return { first_round_average, second_round_average, third_round_average };
};
