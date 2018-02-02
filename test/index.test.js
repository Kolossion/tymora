const test = require("ava");
const R = require("ramda");
const RollTable = require("../index");

const testTableContext1 = {
  arcticEncounters: {
    title: "Arctic Encounters (lvl 1-4)",
    rows: [
      { range: 1,
        content: "1 giant owl"
      }, 
      { range: 4,
        content: "#{4-9} kobolds"
      }, 
      { range: 3,
        content: "#{4-7} trappers (commoners)"
      }, 
    ]
  }
};

const testTableContext2 = {
  forestEncounters: {
    title: "Forest Encounters (lvl 1-4)",
    rows: [
      { range: 1,
        content: "1 giant tree"
      }, 
      { range: 4,
        content: "#{4-9} rocks"
      }, 
      { range: 3,
        content: "#{4-7} druids (druids)"
      }, 
    ]
  }
};

test("constructor() - Basic functionality", t => {

  const newTable = new RollTable(testTableContext1);

  t.deepEqual(
    testTableContext1,
    newTable.tableContext
  );

});

test("addTable() - Basic functionality", t => {

  const roller = new RollTable(testTableContext1); 
  roller.addTable(testTableContext2);

  t.deepEqual(
    R.merge(testTableContext1, testTableContext2),
    roller.tableContext
  );

});

test("getTableSize(tableName) - Basic Functionality", t => {

  const roller = new RollTable(testTableContext1);
  const tableSize = roller.getTableSize("arcticEncounters");

  t.is(
    8,
    tableSize
  );

});

test("getTableSize(tableName) - Error handling, arguments", t => {

  const roller = new RollTable(testTableContext1);

  t.throws(() => { roller.getTableSize(""); }, TypeError);
  t.throws(() => { roller.getTableSize(1); }, TypeError);
  t.throws(() => { roller.getTableSize([]); }, TypeError);
  t.throws(() => { roller.getTableSize({}); }, TypeError);

});