const _omit = require("lodash/omit");

const store = {
  a: "a",
  b: "b",
  c: "c",
  nested1: {
    d: "d",
    e: "e",
    f: "f",
    nested2: {
      g: "g",
      h: "h",
      i: "i",
      nested3: {
        j: "j",
        k: "k",
        l: "l",
        nested4: {
          m: "m",
          n: "n",
          o: "o",
        },
      },
    },
  },
};

const _accumulator = (parent, path, item) => {
  const key = path[0];
  if (path.length === 1) {
    if (typeof item === "object")
      return { ...parent, [key]: { ...parent[key], ...item } };
    return { ...parent, [key]: item };
  }
  const child = _accumulator(parent[key], path.slice(1), item);
  return { ...parent, [key]: { ...child } };
};

console.log(_omit(store, ["a"]));
