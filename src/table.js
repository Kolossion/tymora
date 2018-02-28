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
    this.rows = rows;
    // TODO: ProcessRows function to check weights.
    // this.rows = this.processRows(rows);
    // TODO: After above, calcTableSize function.
    // this.size = this.calcTableSize(rows);
    this.rng = new Chance();
    this.dice = Dice(this.rng);
  }

  /* Set Chance.js seed
   */
  setSeed (seed) {
    this.rng = new Chance(seed);
    this.dice = Dice(this.rng);
  }

};