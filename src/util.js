module.exports = {
  /* To return the proper index within a table, an index
  *  map is required to map from a roll to the proper index
  *  within the list of rows. This is to account for tables
  *  with multiple rolls leading to the same result.
  * 
  *  TODO: Add error handling and some type checking. 
  */
  makeIndexMap (table) {
    const rows = table.rows;
    var indexMap = [];

    for (var i = 0; i < rows.length; i++) {
      const weight = rows[i].weight;

      for (var j = 0; j < weight; j++) {
        indexMap.push(i);
      }
    }

    return indexMap;
    
  },

  getSubRollContent (subRoll) {
    const subRollRegex = /.\{([A-Za-z0-9-_+]*)\}/i;
    var matches = subRoll.match(subRollRegex);

    return matches[1];
  },


  /* When a table row's content is grabbed, it then needs to be searched for
  *  items that use the roll syntax, either getting numbers, dice, or another
  *  table. This function returns an object containing all matches, separated
  *  by type. 
  * 
  *  TODO: Add some error handling and type checking.
  */
  getSubRolls (content) {
    const numRegex = /#\{ ?([0-9]+-[0-9]+) ?\}/g;
    const dieRegex = /d\{ ?([0-9]+d[0-9]+(?:[+-][0-9]+)?) ?\}/gi;
    const tableRegex = /t\{ ?([A-Za-z0-9_]+) ?\}/gi;

    var numMatches = content.match(numRegex) || [];
    var dieMatches = content.match(dieRegex) || [];
    var tableMatches = content.match(tableRegex) || [];

    return {
      numbers: numMatches,
      dice: dieMatches,
      tables: tableMatches,
    };
  }
};