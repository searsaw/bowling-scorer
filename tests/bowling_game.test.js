import test from 'tape';
import BowlingGame from '../src/bowling_game';


test('BowlingGame can validate a strike', t => {
  const game = BowlingGame();

  t.true(game.isStrike(10));
  t.false(game.isStrike(7));
  t.false(game.isStrike(7, 3));
  t.end();
});

test('BowlingGame can validate a spare', t => {
  const game = BowlingGame();

  t.true(game.isSpare(3, 7));
  t.true(game.isSpare(0, 10));
  t.false(game.isSpare(10));
  t.false(game.isSpare(3, 3));
  t.false(game.isSpare(7, 0));
  t.false(game.isSpare(4, 12));
  t.false(game.isSpare(undefined, undefined));
  t.end();
});

test('BowlingGame can roll balls', t => {
  const game = BowlingGame();

  t.doesNotThrow(() => {
    game.roll(10);
    t.end();
  });
});

test('BowlingGame can score a perfect game', t => {
  const game = BowlingGame();

  for (let i = 0; i < 12; i++) {
    game.roll(10);
  }

  t.equals(300, game.score());
  t.end();
});

test('BowlingGame can score a Dutch 200', t => {
  const game = BowlingGame();

  for (let i = 0; i < 11; i++) {
    if (i % 2 === 0) {
      game.roll(10);
    } else {
      game.roll(7);
      game.roll(3);
    }
  }

  t.equals(200, game.score());
  t.end();
});

test('BowlingGame can score a random game score', t => {
  const game = BowlingGame();
  const rolls = [6, 4, 7, 1, 10, 10, 10, 9, 1, 5, 0, 7, 2, 10, 8, 2, 7]

  rolls.forEach(roll => {
    game.roll(roll);
  });

  t.equals(170, game.score());
  t.end();
});

test('BowlingGame can give graphical array of game', t => {
  const game = BowlingGame();
  const rolls = [6, 4, 7, 1, 10, 10, 10, 9, 1, 5, 0, 7, 2, 10, 8, 2, 7]

  rolls.forEach(roll => {
    game.roll(roll);
  });

  const expected = [[6, "/"], [7, 1], ["X"], ["X"], ["X"], [9, "/"], [5, 0], [7, 2], ["X"], [8, "/", 7]];

  t.deepEqual(expected, game.recap());
  t.end();
});

