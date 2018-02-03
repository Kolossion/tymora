const R = require("ramda");

module.exports = {
  /* To return the proper index within a table, an index
  * map is required to map from a roll to the proper index
  * within the list of rows. This is to account for tables
  * with multiple rolls leading to the same result.
  */
  makeIndexMap (table) {
    const rows = table.rows;
    var indexMap = [];

    for (var i = 0; i < rows.length; i++) {
      const range = rows[i].range;

      for (var j = 0; j < range; j++) {
        indexMap.push(i);
      }
    }

    return indexMap;
    
  }
};