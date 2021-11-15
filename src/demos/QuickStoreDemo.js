import React from "react";
import { Button } from "@material-ui/core";
import { useStore } from "../components/modules/QuickStore";

const item = {
  a: "a",
  b: "a",
  c: "c",
  d: "d",
};

export const QuickStoreDemo = () => {
  const { getStore, setStoreItem, removeStoreItem } = useStore();

  const handleSetData = () => {
    setStoreItem("nested1.nested2", { a: "override", c: "override" });
  };

  const handleRemoveData = () => {
    removeStoreItem("thing1.thing2", ["abc", "def"]);
  };

  const checkSize = () => {
    const store = getStore();
    let data = "";
    const queue = [store];

    while (queue.length) {
      const current = queue.shift();
      for (let key in current) {
        if (typeof current[key] === "string") {
          data += current[key];
        } else {
          queue.push(current[key]);
        }
      }
    }
    console.log("Total characters: ", data.length);

    console.log(
      data
        ? "\n" +
            "Total space used: " +
            ((data.length * 16) / (8 * 1024)).toFixed(2) +
            " KB"
        : "Empty (0 KB)"
    );
    console.log(
      data
        ? "Approx. space remaining: " +
            (5120 - ((data.length * 16) / (8 * 1024)).toFixed(2)) +
            " KB"
        : "5 MB"
    );
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "0.5rem" }}
        onClick={handleSetData}
      >
        Set Nested Data
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "0.5rem" }}
        onClick={handleRemoveData}
      >
        Remove Nested Data
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "0.5rem" }}
        onClick={checkSize}
      >
        Calculate Storage
      </Button>
    </>
  );
};
