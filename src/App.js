import { Box } from "@material-ui/core";
import "./App.css";
import { QuickStoreDemo } from "./demos/QuickStoreDemo";
import nodux from "@no-dux/core";
import { createDemoActions } from "./demos/demoActions";

createDemoActions();
nodux.createStore({ root: "demo" });

function App() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ width: "100vw", height: "100vh", backgroundColor: "#333" }}
    >
      <QuickStoreDemo />
    </Box>
  );
}

export default App;
