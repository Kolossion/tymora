const test = require("ava");
const Util = require("../src/util.js");

const testTableContext1 = {
  arcticEncounters: {
    title: "Arctic Encounters (lvl 1-4)",
    rows: [
      { weight: 1,
        content: "1 giant owl"
      }, 
      { weight: 4,
        content: "#{4-9} kobolds"
      }, 
      { weight: 3,
        content: "#{4-7} trappers (commoners)"
      }, 
    ]
  }
};

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