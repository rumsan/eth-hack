import "./app.css";
import Layout from "./components/Layout/Layout";
import { AppContextProvider } from "../src/modules/app/context";
import { CovalentContextProvider } from "./modules/covalent/context";

function App() {
  return (
    <AppContextProvider>
      <CovalentContextProvider>
        <Layout />
      </CovalentContextProvider>
    </AppContextProvider>
  );
}
export default App;
