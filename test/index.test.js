const test = require("ava");
const R = require("ramda");
const TableSet = require("../index");

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

  const newTable = new TableSet(testTableContext1);

  t.deepEqual(
    testTableContext1,
    newTable.tableContext
  );
  t.is(
    null,
    newTable.defaultTable
  );

});

test("addTable() - Basic functionality", t => {

  const roller = new TableSet(testTableContext1); 
  roller.addTable(testTableContext2);

  t.deepEqual(
    R.merge(testTableContext1, testTableContext2),
    roller.tableContext
  );

});

test("getTableSize(tableName) - Basic Functionality", t => {

  const roller = new TableSet(testTableContext1);
  const tableSize = roller.getTableSize("arcticEncounters");

  t.is(
    8,
    tableSize
  );

});

test("getTableSize(tableName) - Error handling, arguments", t => {

  const roller = new TableSet(testTableContext1);

  t.throws(() => { roller.getTableSize(""); }, TypeError);
  t.throws(() => { roller.getTableSize(null); }, TypeError);
  t.throws(() => { roller.getTableSize(1); }, TypeError);
  t.throws(() => { roller.getTableSize([]); }, TypeError);
  t.throws(() => { roller.getTableSize({}); }, TypeError);

});

test("getTableList() - Basic Functionality", t => {

  const tableNames = ["arcticEncounters", "forestEncounters"];

  const roller = new TableSet(testTableContext1);
  roller.addTable(testTableContext2);

  t.deepEqual(
    tableNames,
    roller.getTableList()
  );

});


test("setDefaultTable(tableName) - Basic Functionality", t => {

  const roller = new TableSet(testTableContext1);

  t.is(
    null,
    roller.defaultTable
  );

  roller.setDefaultTable("arcticEncounters");

  t.is(
    "arcticEncounters",
    roller.defaultTable
  );

});

test("setDefaultTable(tableName) - Error handling, arguments", t => {

  const roller = new TableSet(testTableContext1);

  t.throws(() => { roller.setDefaultTable(""); }, TypeError);
  t.throws(() => { roller.setDefaultTable(null); }, TypeError);
  t.throws(() => { roller.setDefaultTable(1); }, TypeError);
  t.throws(() => { roller.setDefaultTable([]); }, TypeError);
  t.throws(() => { roller.setDefaultTable({}); }, TypeError);
  t.throws(() => { roller.setDefaultTable("notATable"); }, ReferenceError);

});