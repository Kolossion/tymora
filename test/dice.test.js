const test = require("ava");
const Chance = require("chance");
const Dice = require("../src/dice.js");

const TEST_SEED = "testSeed";

test("getExpressionParts(statement) - Basic Functionality", t => {
  const die1 = "1d4+3";
  const die2 = "1d6-2";
  const dice = Dice(new Chance(TEST_SEED));
  const parts1 = dice.getExpressionParts(die1);
  const parts2 = dice.getExpressionParts(die2);

  t.deepEqual(
    { dice: "1d4",
      modifiers: "+3"
    },
    parts1
  );

  t.deepEqual(
    { dice: "1d6",
      modifiers: "-2"
    },
    parts2
  );

});

test("rollSum(statement) - Basic Functionality", t => {
  const die1 = "1d4+3";
  const die2 = "4d6-2";
  const dice = Dice(new Chance(TEST_SEED));
  const sum1 = dice.rollSum(die1);
  const sum2 = dice.rollSum(die2);

  t.is(
    7,
    sum1
  );

  t.is(
    12,
    sum2
  );

});

test("roll(statement) - Basic Functionality", t => {
  const die1 = "1d4+3";
  const die2 = "4d6-2";
  const dice = Dice(new Chance(TEST_SEED));
  const rolls1 = dice.roll(die1);
  const rolls2 = dice.roll(die2);

  t.deepEqual(
    [4, 3],
    rolls1
  );

  t.deepEqual(
    [3, 3, 2, 6, -2],
    rolls2
  );

});