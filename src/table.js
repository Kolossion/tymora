const Chance = require("chance");
const Dice = require("./dice.js");
const Util = require("./util.js");

module.exports = class Table {
  
  /* The table class handles individual tables. This is to avoid having the
   * user dealing with data structure formatting and such.
   * 
   * TODO: Get a bunch of stuff done:
   *       1) Rolling
   *       2) Subrolling for dice and numbers
   *       3) Getters and setters
   *       4) Type checking
   */
  constructor(key, name, rows) {
    this.name = name;
    this.key = key;
    this.rows = this.processRows(rows);
    this.indexMap = Util.makeIndexMap({rows: this.rows});
    this.size = this.indexMap.length;
    this.rng = new Chance();
    this.dice = Dice(this.rng);
  }

  /* Processes rows, adding weight values if they're missing. 
   *  
   * TODO: Clean up this code.
   * TODO: Type checking.
   */
  processRows(rows) {
    let processed = [];
    for (let row of rows) {
      if (typeof(row) == "object") {
        if (row.weight == null) {
          row.weight = 1;
        }
      } else if (typeof(row) == "string") {
        row = {
          weight: 1,
          content: row
        };
      }

      processed.push(row);
    }
    return processed;
  }

  /* Calculates the size of the table as a whole. This assumes rows
   * have already been processed to include their weight for ease of logic.
   *
   * TODO: Type checking.
   */
  calcTableSize(rows) {
    return rows.reduce((acc, row) => acc + row.weight, 0);
  }

  /* Set Chance.js seed
   */
  setSeed (seed) {
    this.rng = new Chance(seed);
    this.dice = Dice(this.rng);
  }

  /* Rolls on the table. Only returns content string.
  *
  */
  roll () {
    const rollIndex = this.rng.integer( { min: 0 , max: this.size - 1 } );
    const rowIndex = this.indexMap[rollIndex];
    const row = this.rows[rowIndex];

    return row.content;
  }

};