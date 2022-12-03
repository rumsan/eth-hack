import React, { createContext } from "react";
import { useWeb3React } from "@web3-react/core";
import { makeContract } from "../../utils/contract";
import marketPlaceAbi from "../../contract/abi/MarketPlace.json";
import { CONTRACT_ADDRESS } from "../../contract/contractAddress";
import { useNotificationContext } from "../Notification/context";
import Web3 from "web3";

// import reducer from "./reducer";
// import * as Service from "./service";

const initialState = {};

export const NftContext = createContext(null);
export const NftContextProvider = ({ children }) => {
  const { account, library, chainId } = useWeb3React();
  const { sendNotification } = useNotificationContext();

  const mintAndSellNft = async (payload) => {
    const { price, tokenUri } = payload;
    const marketPlace = makeContract(
      library,
      marketPlaceAbi.abi,
      CONTRACT_ADDRESS.marketPlace[chainId]
    );
    console.log(marketPlace);
    const Price = Web3.utils.toWei(price);
    let tx = await marketPlace.methods
      .mintAndSell(Price, tokenUri)
      .send({ from: account });
    if (tx) {
      const title = "Nft listed ";
      const body = `Your nft is listed for sale.`;
      sendNotification({ title, body, receiver: account });
    }
  };

  const buyNft = async (payload) => {
    const { tokenId, price, previousOwner } = payload;

    const marketPlace = makeContract(
      library,
      marketPlaceAbi,
      CONTRACT_ADDRESS.marketPlace[chainId]
    );
    const Price = Web3.utils.toWei(price);
    let tx = await marketPlace.methods.buy(tokenId).send({ value: Price });
    if (tx) {
      let title = "Nft Bought ";
      let body = `You have successfully bought the nft.`;
      sendNotification(title, body, account);

      title = "Nft Sold ";
      body = `Your nft  have been  successfully sold.`;
      sendNotification(title, body, previousOwner);
    }
  };

  const sellNft = async (payload) => {
    const { price, tokenId } = payload;

    const marketPlace = makeContract(
      library,
      marketPlaceAbi,
      CONTRACT_ADDRESS.marketPlace[chainId]
    );
    let tx = await marketPlace.methods.secondarySell(tokenId, price);
    if (tx) {
      const title = "Nft listed ";
      const body = `Your nft is listed for sale.`;
      sendNotification(title, body, account);
    }
  };
  //   const [state, dispatch] = useReducer(reducer, initialState);

  //   function fetchNftTokenIds(params) {
  //     return Service.fetchNftTokenIds(params);
  //   }

  //   function fetchNftMetadata(params) {
  //     return Service.fetchNftMetadata(params);
  //   }

  //   function fetchNFTsFromWalletAddress(params) {
  //     return Service.fetchNFTsFromWalletAddress(params);
  //   }

  return (
    <NftContext.Provider
      value={{
        initialState: initialState,
        mintAndSellNft,
        buyNft,
        sellNft,
        // fetchNftTokenIds,
        // fetchNftMetadata,
        // fetchNFTsFromWalletAddress,
      }}
    >
      {children}
    </NftContext.Provider>
  );
};
