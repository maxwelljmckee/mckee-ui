import React from "react";
import { Box, Button, TextField } from "@material-ui/core";
import { nodux } from "@no-dux/core";
// import { nodux } from "@no-dux/core";

import { useStore, useAutosave } from "./useStore";

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
  const [path, setPath] = React.useState("");
  const [input, setInput] = React.useState("");

  const [force, setForce] = React.useState(false);
  const renderCounter = React.useRef({ count: 0 });
  renderCounter.current.count += 1;
  // const [localState, setLocalState] = React.useState(0);
  // const [bananas, setBananas] = React.useState(0);
  // const [bool, setBool] = React.useState(true);
  // console.log("version test", React === ReactFromModule);
  // console.log("module version", ReactFromModule);

  const watch = useStore();
  const { demoActions } = nodux.actions;
  const handleSetData = () => {
    if (!path) return;
    let value = input;
    if (input.startsWith("{")) value = mapStringToObject(input);
    if (input.startsWith("[")) value = mapStringToArray(input);
    nodux.setItem(path, value);
  };

  // useAutosave("count.stuff.things", {
  //   localState,
  //   bananas: `how many bananas? ${bananas}`,
  //   bool,
  // });

  const handleRemoveData = () => {
    if (!path) return;
    let value = input;
    if (input.startsWith("[")) value = mapStringToArray(input);
    value ? nodux.removeItem(path, value) : nodux.removeItem(path);
  };

  const store = nodux.getStore();
  const getItem = () => {
    const item = nodux.getItem(path);
    alert(JSON.stringify(item, null, "\t"));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" id="demo">
      <h1>Page Rerendered {renderCounter.current.count} times</h1>
      <div style={{ lineHeight: 2 }}>
        <pre>
          {nodux.root}: {JSON.stringify(watch?.demo, null, "\t")}
        </pre>
      </div>
      <Box display="flex" flexDirection="column" width={300}>
        <TextField
          name="path"
          label="Path"
          variant="outlined"
          margin="dense"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
        <TextField
          name="input"
          label="Input"
          variant="outlined"
          margin="dense"
          value={input}
          multiline
          rows={5}
          onChange={(e) => setInput(e.target.value)}
        />
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
        {/* <Button
          variant="contained"
          color="primary"
          style={{ margin: "0.5rem" }}
          onClick={() => setLocalState((prev) => prev + 1)}
        >
          Set Local State
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "0.5rem" }}
          onClick={() => setBananas((prev) => prev + 1)}
        >
          Set Bananas
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "0.5rem" }}
          onClick={() => setBool((prev) => !prev)}
        >
          Set Bool
        </Button> */}
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "0.5rem" }}
          onClick={() => setForce((prev) => !prev)}
        >
          Force Rerender
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
    </Box>
  );
};

const mapStringToObject = (string) => {
  const trimmed = trim(string);
  return trimmed.split(",").reduce((acc, pair) => {
    const [key, value] = pair.split(":");
    return { ...acc, [key.trim()]: value.trim() };
  }, {});
};

const mapStringToArray = (string) => {
  const trimmed = trim(string);
  return trimmed.split(",").map((el) => el.trim());
};

const trim = (string) => {
  let target = string;
  if (string.startsWith("{") || string.startsWith("[")) {
    target = target.slice(1);
  }
  if (string.endsWith("}") || string.endsWith("]")) {
    target = target.slice(0, target.length - 1);
  }
  return target.trim();
};
