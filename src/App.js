import "./app.css";
import Layout from "./components/Layout/Layout";
import { AppContextProvider } from "../src/modules/app/context";
import { CovalentContextProvider } from "./modules/covalent/context";
import { NftContextProvider } from "./modules/nft/context";
import { NotificationContextProvider } from "./modules/Notification/context";

function App() {
  return (
    <AppContextProvider>
      <NotificationContextProvider>
        <NftContextProvider>
          <CovalentContextProvider>
            <Layout />
          </CovalentContextProvider>
        </NftContextProvider>
      </NotificationContextProvider>
    </AppContextProvider>
  );
}
export default App;
