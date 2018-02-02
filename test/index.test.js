const test = require("ava");
const tymora = require("../src/index");

const testTable = {
  name: "Arctic Encounters (lvl 1-4)",
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
};

test("table size works", t => {
  t.is(8, tymora.getTableSize(testTable));
});

test("building index map", t => {
  t.deepEqual(
    [0,1,1,1,1,2,2,2],
    tymora.makeIndexMap(testTable)
  );
});

test("getSubRolls properly grabs valid roll syntax.", t => {
  const testContent = "#{4-9} kobolds and d{1d4-3} t{table}.";
  const expectedSubRolls = {
    numbers: ["#{4-9}"],
    dice: ["d{1d4-3}"],
    tables: ["t{table}"],
  };

  t.deepEqual(
    expectedSubRolls,
    tymora.getSubRolls(testContent)
  );

});

test("getSubRolls properly grabs valid roll syntax with spaces.", t => {
  const testContent = "#{ 4-9 } kobolds and d{ 1d4-3 } t{ table }.";
  const expectedSubRolls = {
    numbers: ["#{ 4-9 }"],
    dice: ["d{ 1d4-3 }"],
    tables: ["t{ table }"],
  };

  t.deepEqual(
    expectedSubRolls,
    tymora.getSubRolls(testContent)
  );

});