const test = require("ava");
const R = require("ramda");
const TableSet = require("../src/tableSet.js");
const Util = require("../src/util.js");
const TEST_SEED = "testSeed";

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

test("makeIndexMap(table) - Basic Functionality.", t => {

  const indexMap = Util.makeIndexMap(testTableContext1.arcticEncounters);
  const expectedMap = [0,1,1,1,1,2,2,2];

  t.deepEqual(
    expectedMap,
    indexMap
  );

});

test("getSubRolls(content) - Basic Functionality.", t => {
  const testContent = "#{4-9} kobolds and d{1d4-3} t{table}.";
  const expectedSubRolls = {
    numbers: ["#{4-9}"],
    dice: ["d{1d4-3}"],
    tables: ["t{table}"],
  };

  t.deepEqual(
    expectedSubRolls,
    Util.getSubRolls(testContent)
  );

});

test("getSubRolls(content) - Regex Test", t => {
  const testContent = "#{ 4-9 } kobolds and d{ 1d4-3 } t{ table }.";
  const expectedSubRolls = {
    numbers: ["#{ 4-9 }"],
    dice: ["d{ 1d4-3 }"],
    tables: ["t{ table }"],
  };

  t.deepEqual(
    expectedSubRolls,
    Util.getSubRolls(testContent)
  );

});

test("processTableRoll(input) - Basic Functionality", t => {

  const roller = new TableSet(testTableContext1);
  roller.setSeed(TEST_SEED);

  const exampleResult = "#{4-7} trappers (commoners)";
  const resultObj = roller.processTableRoll("t{arcticEncounters}");

  t.deepEqual(
    { input: "t{arcticEncounters}",
      rawResult: exampleResult
    },
    resultObj
  );

});

// using the test seed to get consistent results
test("roll(tableName) - Basic Functionality", t => {

  const roller = new TableSet(testTableContext1);
  roller.setSeed(TEST_SEED);

  const result = roller.roll("arcticEncounters");

  t.deepEqual(
    { input: "t{arcticEncounters}",
      rawResult: "#{4-7} trappers (commoners)"
    },
    result
  );

});

// using the test seed to get consistent results
test("roll(tableName) - Default Table Functionality", t => {

  const roller = new TableSet(testTableContext1);
  roller.setSeed(TEST_SEED);

  t.is(
    null,
    roller.defaultTable
  );

  roller.setDefaultTable("arcticEncounters");

  t.is(
    "arcticEncounters",
    roller.defaultTable
  );

  const result = roller.roll();

  t.deepEqual(
    { input: "t{arcticEncounters}",
      rawResult: "#{4-7} trappers (commoners)"
    },
    result
  );

});

// using the test seed to get consistent results
test("roll(tableName) - Error handling, arguments", t => {

  const roller = new TableSet(testTableContext1);

  t.throws(() => { roller.roll(""); }, TypeError);
  t.throws(() => { roller.roll(null); }, TypeError);
  t.throws(() => { roller.roll(1); }, TypeError);
  t.throws(() => { roller.roll([]); }, TypeError);
  t.throws(() => { roller.roll({}); }, TypeError);
  t.throws(() => { roller.roll("notATable"); }, ReferenceError);

});