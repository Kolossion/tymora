const R = require("ramda");

module.exports = class TableSet {

  /* Constructs a TableSet object given an initial tableContext. Allows empty initial context.
  * 
  * 
  */
  constructor(tableContext = {}) {
    this.tableContext = tableContext;
    this.defaultTable = null;
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
  * TODO: Add check for missing tableName and type checking.
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

  /* Returns a list of all tables in the object.
  * 
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
  /* To return the proper index within a table, an index
  * map is required to map from a roll to the proper index
  * within the list of rows. This is to account for tables
  * with multiple rolls leading to the same result.
  */
  // makeIndexMap (table) {
  //   const rows = table.rows;
  //   var indexMap = [];

  //   for (var i = 0; i < rows.length; i++) {
  //     const range = rows[i].range;

  //     for (var j = 0; j < range; j++) {
  //       indexMap.push(i);
  //     }
  //   }

  //   return indexMap;
  // }

  /* When a table row's content is grabbed, it then needs to be searched for
  * items that use the roll syntax, either getting numbers, dice, or another
  * table. This function returns an object containing all matches, separated
  * by type. 
  */
  // getSubRolls (content) {
  //   const numRegex = /#\{ ?([0-9]+-[0-9]+) ?\}/g;
  //   const dieRegex = /d\{ ?([0-9]+d[0-9]+(?:[+-][0-9]+)?) ?\}/gi;
  //   const tableRegex = /t\{ ?([A-Za-z0-9_]+) ?\}/gi;

  //   var numMatches = content.match(numRegex);
  //   var dieMatches = content.match(dieRegex);
  //   var tableMatches = content.match(tableRegex);

  //   return {
  //     numbers: numMatches,
  //     dice: dieMatches,
  //     tables: tableMatches,
  //   };
  // }

};

/* Returns the total possible row results in table. This is
 * to account for tables with same results for different die rolls. 
 */
// const getTableSize = (table) => {
//   return R.compose(
//     R.sum,
//     R.map((elem) => { return elem.range; })
//   )(table.rows);
// };

/* To return the proper index within a table, an index
 * map is required to map from a roll to the proper index
 * within the list of rows. This is to account for tables
 * with multiple rolls leading to the same result.
 */
// const makeIndexMap = (table) => {
//   const rows = table.rows;
//   var indexMap = [];

//   for (var i = 0; i < rows.length; i++) {
//     const range = rows[i].range;

//     for (var j = 0; j < range; j++) {
//       indexMap.push(i);
//     }
//   }

//   return indexMap;
// };

/* When a table row's content is grabbed, it then needs to be searched for
 * items that use the roll syntax, either getting numbers, dice, or another
 * table. This function returns an object containing all matches, separated
 * by type. 
 */
// const getSubRolls = (content) => {
//   const numRegex = /#\{ ?([0-9]+-[0-9]+) ?\}/g;
//   const dieRegex = /d\{ ?([0-9]+d[0-9]+(?:[+-][0-9]+)?) ?\}/gi;
//   const tableRegex = /t\{ ?([A-Za-z0-9_]+) ?\}/gi;

//   var numMatches = content.match(numRegex);
//   var dieMatches = content.match(dieRegex);
//   var tableMatches = content.match(tableRegex);

//   return {
//     numbers: numMatches,
//     dice: dieMatches,
//     tables: tableMatches,
//   };
// };