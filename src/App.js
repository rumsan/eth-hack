import "./app.css";
import Layout from "./components/Layout/Layout";
import { AppContextProvider } from "../src/modules/app/context";

function App() {
  return (
    <AppContextProvider>
      <Layout />
    </AppContextProvider>
  );
}

export default App;
