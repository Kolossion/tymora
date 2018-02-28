const test = require("ava");
const R = require("ramda");
const Table = require("../src/table.js");
const Util = require("../src/util.js");
const TEST_SEED = "testSeed";

const testTableContext1 = {
  key: "arcticEncounters",
  name: "Arctic Encounters (lvl 1-4)",
  rows: [
    { content: "1 giant owl"
    }, 
    { weight: 4,
      content: "#{4-9} kobolds"
    }, 
    { weight: 3,
      content: "#{4-7} trappers (commoners)"
    }, 
    "A partridge in a pear tree"
  ]
};

test("processRows(rows) - Basic functionality", t => {

  const newTable = new Table(testTableContext1.key, testTableContext1.name, testTableContext1.rows);
  const expectedRows = [
    { weight: 1,
      content: "1 giant owl"
    }, 
    { weight: 4,
      content: "#{4-9} kobolds"
    }, 
    { weight: 3,
      content: "#{4-7} trappers (commoners)"
    }, 
    { weight: 1,
      content: "A partridge in a pear tree"
    }
  ];

  t.deepEqual(
    expectedRows,
    newTable.rows
  );

});