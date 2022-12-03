import "./app.css";
import Layout from "./components/Layout/Layout";
import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import { useEffect } from "react";

const PK = "a683cd0c3c2f6daf3736555470427cd8508ec69e96faef304bf7f4d0f4e44ff0"; // channel private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);
console.log({signer})

function App() {
  // const sendNotification = async () => {
  //   try {
  //     const apiResponse = await PushAPI.payloads.sendNotification({
  //       signer,
  //       type: 3, // target
  //       identityType: 2, // direct payload
  //       notification: {
  //         title: `NFT Title`,
  //         body: `Nft body`,
  //       },
  //       payload: {
  //         title: `[sdk-test] payload title`,
  //         body: `sample msg body`,
  //         cta: "",
  //         img: "",
  //       },
  //       recipients: "eip155:5:0xb01634f89eAB6fAf416652890FAB04d2419F8688", // recipient address
  //       channel: "eip155:5:0xAe893678B04Ba40c0E3BaFef3E27f19F4D2d2745", // your channel address
  //       env: "staging",
  //     });

  //     // apiResponse?.status === 204, if sent successfully!
  //     console.log("API repsonse: ", apiResponse);
  //   } catch (err) {
  //     console.error("Error: ", err);
  //   }
  // };

  // useEffect(() => {
  //   sendNotification();
  // });

//   const optinChannel = async()=>{
//     try{
//         await PushAPI.channels.subscribe({
//             signer:signer,
//             channelAddress:`eip155:5:0xAe893678B04Ba40c0E3BaFef3E27f19F4D2d2745`,
//             userAddress:`eip155:5:0x4c1bD62eca692beD1B3b1F0aC5d3b042E01aFc5C`,
//             onSuccess:()=>{
//               console.log('opt in errr')
//                 return ('opt in success')
//             },
//             onError:(err)=>{
//               console.log(err)
//                 console.log("opt in err")

//             },
//             env:'staging'
//         })

//     }
//     catch(err){
//         console.log(err)

//     }
// }
// useEffect(()=>{
//   optinChannel();
// })
  return <Layout />;
}

export default App;
