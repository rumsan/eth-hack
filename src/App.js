import "./app.css";
import Layout from "./components/Layout/Layout";
import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import { useEffect } from "react";

const PK = "e86220869dca89d0330d0596751d3390dc589b57e22a95ac23510b8570bc8785"; // channel private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

function App() {
  const sendNotification = async () => {
    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3, // target
        identityType: 2, // direct payload
        notification: {
          title: `[SDK-TEST] notification TITLE:`,
          body: `[sdk-test] notification BODY`,
        },
        payload: {
          title: `[sdk-test] payload title`,
          body: `sample msg body`,
          cta: "",
          img: "",
        },
        recipients: "eip155:5:0xb01634f89eAB6fAf416652890FAB04d2419F8688", // recipient address
        channel: "eip155:5:0xAe893678B04Ba40c0E3BaFef3E27f19F4D2d2745", // your channel address
        env: "staging",
      });

      // apiResponse?.status === 204, if sent successfully!
      console.log("API repsonse: ", apiResponse);
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  useEffect(() => {
    sendNotification();
  });
  return <Layout />;
}

export default App;
