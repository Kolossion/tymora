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
      console.log(statement);

    },

    roll (statement) {
      const rollParts = this.getExpressionParts(statement);

      const rolls = rng.rpg(rollParts.dice);
      console.log(rolls);


    }
  };
};