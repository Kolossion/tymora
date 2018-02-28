const R = require("ramda");
const Chance = require("chance");
const Dice = require("./dice.js");

module.exports = class Table {
  
  /* The table class handles individual tables. This is to avoid having the
   * user dealing with data structure formatting and such.
   * 
   * TODO: Get a bunch of stuff done:
   *       1) Rolling
   *       2) Subrolling for dice and numbers
   *       3) Getters and setters
   */
  constructor(key, name, rows) {
    this.name = name;
    this.key = key;
    this.rows = this.processRows(rows);
    // TODO: After above, calcTableSize function.
    // this.size = this.calcTableSize(rows);
    this.rng = new Chance();
    this.dice = Dice(this.rng);
  }

  /* Processes rows, adding weight values if they're missing. 
   *  
   * TODO: Clean up this code.
   */
  processRows(rows) {
    let processed = [];
    for (let row of rows) {
      if (typeof(row) == "object") {
        if (row.weight == null) {
          row.weight = 1;
          processed.push(row);
        } else {
          processed.push(row);
        }
      } else if (typeof(row) == "string") {
        processed.push(
          { weight: 1,
            content: row
          }
        );
      } else {
        processed.push(row);
      }
    }
    return processed;
  }

  /* Set Chance.js seed
   */
  setSeed (seed) {
    this.rng = new Chance(seed);
    this.dice = Dice(this.rng);
  }

};