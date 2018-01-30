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

test("1 equals 1", t => {
  t.is(1, 1);
});

test("table size works", t => {
  t.is(8, tymora.getTableSize(testTable));
});

test("building index map", t => {
  t.deepEqual(
    [0,1,1,1,1,2,2,2],
    tymora.makeIndexMap(testTable)
  );
});