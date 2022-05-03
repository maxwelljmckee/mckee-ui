import { Box } from "@material-ui/core";
import "./App.css";
import { QuickStoreDemo } from "./demos/QuickStoreDemo";
import { nodux } from "@no-dux/core";
import { createDemoActions } from "./demos/demoActions";
import { ErrorDemo } from "./demos/ErrorDemo";

const encryptionKey = process.env["REACT_APP_NODUX_KEY"];
createDemoActions();
nodux.createStore({
  root: "demo",
  config: {
    enableLogs: false,
    encryptionKey,
  },
});

function App() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#ddd" }}
    >
      <QuickStoreDemo />
      {/* <ErrorDemo /> */}
    </Box>
  );
}

export default App;
