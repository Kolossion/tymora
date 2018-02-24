const R = require("ramda");
const Chance = require("chance");
const Util = require("./util.js");
const Dice = require("./dice.js");

module.exports = class TableSet {

  /* Constructs a TableSet object given an initial tableContext. Allows empty initial context.
  */
  constructor(tableContext = {}) {
    this.tableContext = tableContext;
    this.defaultTable = null;
    this.rng = new Chance();
    this.dice = Dice(this.rng);
  }

  /* Set Chance.js seed
  */
  setSeed (seed) {
    this.rng = new Chance(seed);
    this.dice = Dice(this.rng);
  }

  /* Adds a table to the context.
  * 
  *  TODO: Add checks for name collisions and type checking.
  */
  addTable (newTable) {
    this.tableContext = R.merge(this.tableContext, newTable);
  }

  /* Returns the total possible row results in table. This is
  * to account for tables with same results for different die rolls.
  */
  getTableSize (tableName) {
    if (tableName === "" || typeof tableName != "string" || tableName == null) {
      throw new TypeError("getTableSize requires a non-empty string.");
    }

    const tableList = this.getTableList();
    if (!R.contains(tableName, tableList)) {
      throw new ReferenceError("Table with name " + tableName + " doesn't exist in this TableSet.");
    }

    return R.compose(
      R.sum,
      R.map((elem) => { return elem.weight; })
    )(this.tableContext[tableName].rows);
  }

  /* Returns a list of all tables' names in the object.
  */
  getTableList () {
    return R.keys(this.tableContext);
  }

  /* Sets the default table to roll on. Modifies a bunch of different functions.
  *  
  *  TODO: Implement default table stuff in future functions when written.
  */
  setDefaultTable (tableName) {

    if (tableName === "" || typeof tableName != "string" || tableName == null) {
      throw new TypeError("Default table name must be a string.");
    }

    const tableList = this.getTableList();
    if (!R.contains(tableName, tableList)) {
      throw new ReferenceError("Table with name " + tableName + " doesn't exist in this TableSet.");
    } else {
      this.defaultTable = tableName;
    }

  }

  /* Takes the subroll object and resolves each of those subrolls. This uses
  *  a recursive method for table subrolls (since those are the only ones currently
  *  that allow subrolls)
  * 
  */
  buildSubrollList (subRolls) {
    const subrollList = R.unnest([
      R.map(this.processDiceRoll.bind(this), subRolls.dice),
      R.map(this.processTableRoll.bind(this), subRolls.tables),
      R.map(this.processNumberRoll.bind(this), subRolls.numbers)
    ]);
    return subrollList;
  }

  /* Processes a number roll statement. Since dice don't have subrolls, won't have to worry.
  * 
  *  TODO: Add rolls for other types of subroll statements.
  */
  processNumberRoll (input) {
    const self = this;
    if (input === "#{}" || typeof input != "string" || input == null) {
      throw new TypeError("number roll statement must be a string.");
    }

    const numberRegex = /#\{([0-9]+)-([0-9]+)\}/i;
    const numMatches = input.match(numberRegex);
    const result = self.rng.natural({min: +numMatches[1], max: +numMatches[2]}); 

    return {
      type: "number",
      input: input,
      rawResult: result,
      subrolls: []
    };

  }

  /* Processes a dice roll statement. Since dice don't have subrolls, won't have to worry.
  * 
  *  TODO: Add rolls for other types of subroll statements.
  */
  processDiceRoll (input) {
    if (input === "d{}" || typeof input != "string" || input == null) {
      throw new TypeError("Die roll statement must be a string.");
    }

    const diceStatement = Util.getSubRollContent(input);
    const diceSum = this.dice.rollSum(diceStatement);

    return {
      type: "dice",
      input: input,
      rawResult: diceSum,
      subrolls: []
    };

  }

  /* Processes a table roll statement. Does a lot of the heavy lifting of rolling.
  * 
  *  TODO: Add rolls for other types of subroll statements.
  */
  processTableRoll (input) {
    if (input === "t{}" || typeof input != "string" || input == null) {
      throw new TypeError("Table name must be a string.");
    }

    const tableList = this.getTableList();
    const tableName = Util.getSubRollContent(input);

    if (!R.contains(tableName, tableList)) {
      throw new ReferenceError("Table with name " + tableName + " doesn't exist in this TableSet.");
    }

    const table = this.tableContext[tableName];

    const rolledRow = this.rng.integer({min: 1, max: this.getTableSize(tableName)});
    const indexMap = Util.makeIndexMap(table);
    const rolledIndex = indexMap[rolledRow-1];
    const result = table.rows[rolledIndex].content;
    const subRolls = Util.getSubRolls(result);

    return {
      type: "table",
      input: input,
      rawResult: result,
      subrolls: this.buildSubrollList(subRolls)
    };
  }


  /* Main roll function! Rolls on either the default table or a table name
  * passed in
  */
  roll (tableName = this.defaultTable) {
    if (tableName === "" || typeof tableName != "string" || tableName == null) {
      throw new TypeError("Table name must be a string.");
    }

    return this.processTableRoll("t{" + tableName + "}");
  }

};