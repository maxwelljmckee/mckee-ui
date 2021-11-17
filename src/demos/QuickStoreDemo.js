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
  const { actions } = nodux;
  const handleSetData = () => {
    // nodux.setItem(["nested1"], item);
    actions.setPathArray();
  };

  const handleRemoveData = () => {
    // nodux.removeItem(["payload"]);
    actions.removeFromPayload();
  };

  return (
    <Box display="flex" flexDirection="column">
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
