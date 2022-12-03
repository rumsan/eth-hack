import React, { createContext, useReducer } from "react";
import { useWeb3React } from "@web3-react/core";
import { makeContract } from "../../utils/contract";
import marketPlaceAbi from "../../contract/abi/MarketPlace.json"
import nftAbi from "../../contract/abi/NFT.json";
import { CONTRACT_ADDRESS } from "../../contract/contractAddress";




// import reducer from "./reducer";
// import * as Service from "./service";

const initialState = {};

export const NftContext = createContext(null);
export const NftContextProvider = ({ children }) => {
    const{account,library,chainId} = useWeb3React();


    const mintAndSellNft = async(payload)=>{
        const {price,tokenUri} = payload
        const marketPlace = makeContract(library,marketPlaceAbi,CONTRACT_ADDRESS.marketPlace[chainId]);
        let tx = await marketPlace.methods.mintAndSell(price,tokenUri).send({from:account});
        if(tx){

        }


    }

    const buyNft = async(payload)=>{
      const {tokenId,price} = payload

      const marketPlace = makeContract(library,marketPlaceAbi,CONTRACT_ADDRESS.marketPlace[chainId]);
      let tx= await marketPlace.methods.buy(tokenId).send({value:price});


  }

  const sellNft = async(payload)=>{
    const {price,tokenId} = payload

    const marketPlace = makeContract(library,marketPlaceAbi,CONTRACT_ADDRESS.marketPlace[chainId]);
    let tx = await marketPlace.methods.secondarySell(tokenId,price);


}
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
        sellNft
        // fetchNftTokenIds,
        // fetchNftMetadata,
        // fetchNFTsFromWalletAddress,
      }}
    >
      {children}
    </NftContext.Provider>
  );
};
