const R = require("ramda");

/* Returns the total possible row results in table. This is
 * to account for tables with same results for different die rolls. 
 */
const getTableSize = (table) => {
  return R.compose(
    R.sum,
    R.map((elem) => { return elem.range; })
  )(table.rows);
};

/* To return the proper index within a table, an index
 * map is required to map from a roll to the proper index
 * within the list of rows. This is to account for tables
 * with multiple rolls leading to the same result.
 */
const makeIndexMap = (table) => {
  const rows = table.rows;
  var indexMap = [];

  for (var i = 0; i < rows.length; i++) {
    const range = rows[i].range;

    for (var j = 0; j < range; j++) {
      indexMap.push(i);
    }
  }

  return indexMap;
};

const subRoll = (content) => {
  const numRegex = /\#\{([0-9]+\-[0-9]+)\}/g;
  const dieRegex = /d\{([0-9]+d[0-9]+(?:[+-][0-9]+)?)\}/gi;

  var matches = content.match(numRegex);

  console.log(matches);
};


subRoll("#{4-9} kobolds and #{3-6} butts");

module.exports = {
  getTableSize: getTableSize,
  makeIndexMap: makeIndexMap,
  subRoll: subRoll
};