export default function BowlingGame() {
  const NUMBER_OF_PINS = 10;
  const NUMBER_OF_FRAMES = 10;
  const gameRolls = [];

  const isStrike = (value) => {
    return value === NUMBER_OF_PINS;
  };

  const isSpare = (roll1, roll2) => {
    return roll1 + roll2 === NUMBER_OF_PINS;
  };

  const roll = (value) => {
    gameRolls.push(value);
  };

  const score = () => {
    let runningScore = 0;
    let rollIndex = 0;

    for (let i = 1; i <= NUMBER_OF_FRAMES; i++) {
      const currentRoll = gameRolls[rollIndex];

      if (isStrike(currentRoll)) {
        const firstNext = gameRolls[rollIndex + 1];
        const secondNext = gameRolls[rollIndex + 2];

        runningScore += NUMBER_OF_PINS + firstNext + secondNext;
        rollIndex++;
      } else if (isSpare(currentRoll, gameRolls[rollIndex + 1])) {
        const next = gameRolls[rollIndex + 2];

        runningScore += NUMBER_OF_PINS + next;
        rollIndex += 2;
      } else {
        const next = gameRolls[rollIndex + 1];

        runningScore += currentRoll + next;
        rollIndex += 2;
      }
    }

    return runningScore;
  };

  const recap = () => {
    let runningRecap = [];
    let rollIndex = 0;

    for (let i = 1; i <= NUMBER_OF_FRAMES; i++) {
      const currentRoll = gameRolls[rollIndex];

      if (isStrike(currentRoll)) {
        const frame = ["X"];

        if (i === NUMBER_OF_FRAMES) {

        }

        runningRecap.push(frame);
        rollIndex++;
      } else if (isSpare(currentRoll, gameRolls[rollIndex + 1])) {
        const frame = [currentRoll, "/"];

        if (i === NUMBER_OF_FRAMES) {
          frame.push(gameRolls[rollIndex + 2]);
        }

        runningRecap.push(frame);
        rollIndex += 2;
      } else {
        const next = gameRolls[rollIndex + 1];

        runningRecap.push([currentRoll, next]);
        rollIndex += 2;
      }
    }

    return runningRecap;
  };

  return {
    isStrike,
    isSpare,
    roll,
    score,
    recap
  };
};
