const R = require("ramda");
const dicePartRegex = /([0-9]+d[0-9]+)((?:[+-][0-9]+)*)?/i;

module.exports = (rng) => {
  return {
    /* returns the parts of the dice expression. Will be expanded as the die regex
    *  and die processing gets more and more powerful.
    *
    *  TODO: Add error handling for improper dice statements.
    */
    getExpressionParts (statement) {
      const parts = statement.match(dicePartRegex);

      return {
        dice: parts[1],
        modifiers: parts[2]
      };
    },

    /* Rolls dice and adds all, returning a single number.
    *
    *  TODO: Add error handling for improper dice statements.
    */
    rollSum (statement) {
      const rolls = this.roll(statement);
      return R.sum(rolls);

    },

    /* Rolls dice and returns a list of all rolled results as well as the modifier
    *  at the end. This will most likely change its API as the dice handling
    *  gets more powerful.
    *
    *  TODO: Add error handling for improper dice statements.
    *  TODO: Better API for returning more interesting and better organized data.
    */
    roll (statement) {
      const rollParts = this.getExpressionParts(statement);

      const rolls = rng.rpg(rollParts.dice);
      const modifier = eval(rollParts.modifiers);

      return rolls.concat(modifier);
    }
  };
};