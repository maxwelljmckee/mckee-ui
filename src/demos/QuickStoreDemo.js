import React from "react";
import { Box, Button } from "@material-ui/core";
import { useStore } from "../components/modules/QuickStore";

const item = {
  abc: "abc",
  def: "def",
  hij: "hij",
  klm: "klm",
  nestedThing3: {},
};

export const QuickStoreDemo = () => {
  const [state, setState] = React.useState(false);
  const { setStoreItem, removeStoreItem } = useStore();

  const handleSetData = () => {
    setStoreItem("nestedThing2", item);
  };

  const handleRemoveData = () => {
    removeStoreItem();
  };

  const handleRerender = () => setState((prev) => !prev);

  console.log("demo rendered");

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
        onClick={handleRerender}
      >
        Re-Render
      </Button>
    </>
  );
};
