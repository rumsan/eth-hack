import "./app.css";
import Layout from "./components/Layout/Layout";
import { CovalentContextProvider } from "./modules/covalent/context";

function App() {
  return (
    <>
      <CovalentContextProvider>
        <Layout />;
      </CovalentContextProvider>
    </>
  );
}

export default App;
