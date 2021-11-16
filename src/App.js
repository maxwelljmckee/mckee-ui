import { Box } from "@material-ui/core";
import "./App.css";
import { QuickStoreDemo } from "./demos/QuickStoreDemo";
import qs from "./components/modules/quick-store/quick-store.js";

qs.createStore({ root: "demo" });

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
