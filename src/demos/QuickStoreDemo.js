import React from "react";
import { Box, Button } from "@material-ui/core";
import { nodux } from "@no-dux/core";
import { useStore, ReactFromModule } from "@no-dux/react";
// import { useStore } from "./useStore";

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
  const [force, setForce] = React.useState(false);
  const renderCounter = React.useRef({ count: 0 });
  renderCounter.current.count += 1;
  console.log("equality test:", React === ReactFromModule);

  // const watch = useStore("nested1.nested2.nested3.nested4");
  const { actions } = nodux;
  const handleSetData = () => {
    nodux.setItem("nested1", { monkey: "monkey" });
    // actions.setBananas();
    // localStorage.setItem("monkey", "banana");
  };
  // console.log("watchlist", watch);

  const handleRemoveData = () => {
    nodux.removeItem("nested1", "monkey");
    // actions.removeBananas();
    // actions.removeFromPayload();
  };

  const getItem = () => {
    const item = nodux.getStore();
    alert(JSON.stringify(item, null, "\t"));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" id="demo">
      <h1 style={{ color: "#eee" }}>
        Page Rerendered {renderCounter.current.count} times
      </h1>
      <div>{/* <pre>{JSON.stringify(watch, null, "\t")}</pre> */}</div>
      <Box display="flex" flexDirection="column" width={300}>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "0.5rem" }}
          onClick={getItem}
        >
          Get Item
        </Button>
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
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "0.5rem" }}
          onClick={() => setForce((prev) => !prev)}
        >
          Force Rerender
        </Button>
      </Box>
    </Box>
  );
};
