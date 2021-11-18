import React from "react";
import { Box, Button } from "@material-ui/core";
import nodux from "@no-dux/core";

const item = {
  a: "a",
  b: "a",
  c: "c",
  d: "d",
};

const payload = {
  this: "this",
  is: "is",
  a: "s",
  payload: "payload",
};

export const QuickStoreDemo = () => {
  const monkey = nodux.watch();
  // console.log("monkey:", monkey);
  const { actions } = nodux;
  console.log("actions", actions);
  const handleSetData = () => {
    nodux.setItem("nested1.nested2", item);
    // localStorage.setItem("monkey", "banana");
  };

  const handleRemoveData = () => {
    nodux.removeItem(["nested1", "nested2"], ["b", "c"]);

    // actions.removeFromPayload();
  };

  return (
    <Box display="flex" flexDirection="column">
      <h1>{nodux.getItem("nested1.nested2.d")}</h1>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "0.5rem" }}
        onClick={handleSetData}
      >
        Set Item
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "0.5rem" }}
        onClick={handleRemoveData}
      >
        Remove Item
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "0.5rem" }}
        onClick={nodux.clear}
      >
        Clear Store
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "0.5rem" }}
        onClick={nodux.getSize}
      >
        Calculate Storage
      </Button>
    </Box>
  );
};
