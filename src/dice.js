const R = require("ramda");
const dicePartRegex = /([0-9]+d[0-9]+)((?:[+-][0-9]+)*)?/i;

module.exports = (rng) => {
  return {
    getExpressionParts (statement) {
      const parts = statement.match(dicePartRegex);

      return {
        dice: parts[1],
        modifiers: parts[2]
      };
    },

    rollSum (statement) {
      const rolls = this.roll(statement);
      return R.sum(rolls);

    },

    // This'll have to be modified once other types of modifiers are allowed.
    roll (statement) {
      const rollParts = this.getExpressionParts(statement);

      const rolls = rng.rpg(rollParts.dice);
      const modifier = eval(rollParts.modifiers);

      return rolls.concat(modifier);
    }
  };
};