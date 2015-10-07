class Frame {
    constructor(firstBall = 0, secondBall = 0, thirdBall = 0, isLastFrame = false) {
        this.isLastFrame = isLastFrame;
        this.firstBall = firstBall;
        this.secondBall = secondBall;
        this.thirdBall = thirdBall;
    }

    set firstBall(n) {
        if (n < 0 || n > 10 || (!this.isLastFrame && n + this.second > 10)) {
            throw 'invalid frame input on first ball: ' + n;
        }

        this.first = n;

        if (n === 10) {
            this.second = 0;
        }
    }

    get firstBall() {
        return this.first;
    }

    set secondBall(n) {
        if (n < 0 || n > 10 || (!this.isLastFrame && n + this.first > 10)) {
            throw 'invalid frame input on second ball: ' + n;
        }

        this.second = n;
    }

    get secondBall() {
        return this.second;
    }

    set thirdBall(n) {
        if (n < 0 || n > 10) {
            throw 'invalid frame input on third ball: ' + n;
        }

        this.third = n;
    }

    get thirdBall() {
        return this.third;
    }

    isStrike() {
        return this.first === 10;
    }

    isSpare() {
        return this.first !== 10 && this.score === 10;
    }

    get score() {
        return this.first + this.second;
    }
}

let game = [[10, 0], [6, 4], [10, 0], [10, 0], [10, 0],
    [10, 0], [10, 0], [10, 0], [10, 0], [10, 10, 10]].map(function(frame, i) {
        if (i === 9) {
            return new Frame(frame[0], frame[1], frame[2], true);
        }

        return new Frame(frame[0], frame[1]);
});
let reverseGame = game.slice().reverse();
let score = 0;
let currentFrame = 0;

if (reverseGame.length === 10) {
    let lastFrame = reverseGame[currentFrame];
    score += lastFrame.score;

    if (lastFrame.isStrike() || lastFrame.isSpare()) {
         score += lastFrame.thirdBall;
    }

    let ninthFrame = reverseGame[currentFrame + 1];
    score += ninthFrame.score;

    if (ninthFrame.isStrike()) {
        score += lastFrame.score;
    } else if (ninthFrame.isSpare()) {
        score += lastFrame.firstBall;
    }

    currentFrame += 2;
} else {
    // Go to next frame while we are on a string of strikes
    while (currentFrame < game.length && reverseGame[currentFrame].isStrike()) currentFrame++;
    // Go to next frame if on the first frame and it's a spare
    if (currentFrame === 0 && reverseGame[currentFrame].isSpare()) currentFrame++;
}

for (; currentFrame < reverseGame.length; currentFrame++) {
    let frame = reverseGame[currentFrame];
    let oneBackFrame = reverseGame[currentFrame - 1];
    if (frame.isStrike()) {
        score += 10;

        if (oneBackFrame.isStrike()) {
            score += 10;

            let twoBackFrame = reverseGame[currentFrame - 2];
            if (twoBackFrame.isStrike()) {
                score += 10;
            } else {
                score += twoBackFrame.secondBall;
            }
        } else {
            score += oneBackFrame.score;
        }
    } else if (frame.isSpare()) {
        score += 10 + oneBackFrame.firstBall;
    } else {
        score += frame.score;
    }
}

console.log(score);