const test = require("ava");
const Table = require("../src/table.js");

const testTable1 = {
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

const processedRows = [
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

test("processRows(rows) - Basic functionality", t => {

  const newTable = new Table(testTable1.key, testTable1.name, testTable1.rows);

  t.deepEqual(
    newTable.rows,
    processedRows
  );

});

test("calcTableSize(rows) - Basic functionality", t => {

  const newTable = new Table(testTable1.key, testTable1.name, testTable1.rows);
  const expectedSize = 9;

  t.deepEqual(
    expectedSize,
    newTable.size
  );

});

test("roll() - Basic functionality", t => {

  const newTable = new Table(testTable1.key, testTable1.name, testTable1.rows);
  newTable.setSeed("TEST_SEED");
  const result = newTable.roll();
  const expected = "#{4-7} trappers (commoners)";

  t.is(
    result,
    expected
  );

});