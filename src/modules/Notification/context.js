import React, { createContext, useContext } from "react";

import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import { useWeb3React } from "@web3-react/core";

const NotificationContext = createContext(null);

export const NotificationContextProvider = ({ children }) => {
  const { account, library, chainId } = useWeb3React();

  const PK = "e86220869dca89d0330d0596751d3390dc589b57e22a95ac23510b8570bc8785";
  const Pkey = `0x${PK}`;
  const signer = new ethers.Wallet(Pkey);

  const sendNotification = async ({ title, body, receiver }) => {
    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3, //targeted
        identityType: 2,
        notification: {
          title: `${title}`,
          body: `${body}`,
        },

        payload: {
          title: `${title}`,
          body: `${body}`,
          cta: "",
          img: "",
        },
        recipients: `eip155:5:${receiver}`, // recipient address
        channel: "eip155:5:0xAe893678B04Ba40c0E3BaFef3E27f19F4D2d2745", // your channel address
        env: "staging",
      });
      return apiResponse;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const optinChannel = async () => {
    try {
      const subscribeSigner = library?.getSigner(account);

      await PushAPI.channels.subscribe({
        signer: subscribeSigner,
        channelAddress: `eip155:5:${signer}`,
        userAddress: `eip155:5:${account}`,
        onSuccess: () => {
          return "opt in success";
        },
        onError: () => {
          console.log("opt in err");
        },
        env: "staging",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getNotifications = async () => {
    try {
      const notifications = await PushAPI.user.getFeeds({
        user: "eip155:5:0x3e63Fc89c0DE2Fc4ae6a6cD3ea2634947204919D", // user address in CAIP
        spam: true,
        env: "staging",
      });
      console.log({ notifications });
      return notifications;
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <NotificationContext.Provider
      value={{
        sendNotification,
        optinChannel,
        getNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
