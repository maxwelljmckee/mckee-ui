import React from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";

export const QueryProviderDemo = () => {
  const count = React.useRef({ renderCount: 0 });
  const [state, setState] = React.useState(false);
  count.current.renderCount += 1;

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItem="center"
        width="100%"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItem="center"
          width="800px"
          style={{
            height: 800,
            border: "1px solid blue",
            position: "relative",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            width={580}
            style={{ position: "absolute", bottom: 5, left: 15 }}
          >
            <Typography>
              Rerendered {count.current.renderCount} times
            </Typography>
          </Box>
          <Child />
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box display="flex">
          <Button
            variant="outlined"
            color="primary"
            style={{ width: 150, margin: 30 }}
            onClick={() => setState((prev) => !prev)}
          >
            Rerender
          </Button>
        </Box>
      </Box>
    </>
  );
};

const Child = React.memo(() => {
  const count = React.useRef({ renderCount: 0 });
  count.current.renderCount += 1;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItem="center"
      width="600px"
      style={{ height: 600, position: "relative", border: "1px solid green" }}
    >
      <Box
        display="flex"
        flexDirection="column"
        width={580}
        style={{ position: "absolute", bottom: 5, left: 15 }}
      >
        <Typography>Rerendered {count.current.renderCount} times</Typography>
      </Box>
      <GrandChild />
    </Box>
  );
});

const GrandChild = React.memo(() => {
  const count = React.useRef({ renderCount: 0 });

  count.current.renderCount += 1;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItem="center"
      width="400px"
      style={{ position: "relative", height: 400, border: "1px solid red" }}
    >
      <Box
        display="flex"
        flexDirection="column"
        width={380}
        style={{ position: "absolute", bottom: 5, left: 10 }}
      >
        <Typography>Rerendered {count.current.renderCount} times</Typography>
      </Box>
    </Box>
  );
});
