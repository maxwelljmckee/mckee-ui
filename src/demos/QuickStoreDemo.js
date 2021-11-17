import React from "react";
import { Box, Button } from "@material-ui/core";
import qs from "../components/modules/quick-store/quick-store";

const item = {
  a: "a",
  b: "a",
  c: "c",
  d: "d",
};

export const QuickStoreDemo = () => {
  const handleSetData = () => {
    qs.setItem("nested1.nested2", item);
  };

  const handleRemoveData = () => {
    qs.removeItem("nested1.nested2", ["d"]);
  };

  const checkSize = () => {
    const store = qs.getStore();
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
    alert(`
      Approx. space used:
      ${
        data
          ? ((data.length * 16) / (8 * 1024)).toFixed(2) + " KB"
          : "Empty (0 KB)"
      }
      \n
      Approx. space remaining:
      ${
        data
          ? 5120 - ((data.length * 16) / (8 * 1024)).toFixed(2) + " KB"
          : "5 MB"
      }
    `);
  };

  return (
    <Box display="flex" flexDirection="column">
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
        onClick={qs.clear}
      >
        Clear Store
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "0.5rem" }}
        onClick={checkSize}
      >
        Calculate Storage
      </Button>
    </Box>
  );
};
