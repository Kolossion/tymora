const R = require("ramda");
const Chance = require("chance");
const Util = require("./util.js");

module.exports = class TableSet {

  /* Constructs a TableSet object given an initial tableContext. Allows empty initial context.
  *  
  *  
  */
  constructor(tableContext = {}) {
    this.tableContext = tableContext;
    this.defaultTable = null;
    this.rng = new Chance();
  }

  /* Set Chance.js seed
  */
  setSeed (seed) {
    this.rng = new Chance(seed);
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
  * 
  * TODO: Add check for missing tableName.
  */
  getTableSize (tableName) {
    if (tableName === "" || typeof tableName != "string" || tableName == null) {
      throw new TypeError("getTableSize requires a non-empty string.");
    }

    return R.compose(
      R.sum,
      R.map((elem) => { return elem.range; })
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


  /* Main roll function! Rolls on either the default table or a table name
  * passed in
  *
  */
  roll (tableName = this.defaultTable) {
    const tableList = this.getTableList();

    if (tableName === "" || typeof tableName != "string" || tableName == null) {
      throw new TypeError("Table name must be a string.");
    }
    if (!R.contains(tableName, tableList)) {
      throw new ReferenceError("Table with name " + tableName + " doesn't exist in this TableSet.");
    }

    const table = this.tableContext[tableName];

    const rolledRow = this.rng.integer({min: 1, max: this.getTableSize(tableName)});
    const indexMap = Util.makeIndexMap(table);
    const rolledIndex = indexMap[rolledRow-1];
    return table.rows[rolledIndex].content;
  
  }

};