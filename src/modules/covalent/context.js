import React, { createContext } from "react";
// import reducer from "./reducer";
import * as Service from "./service";

const initialState = {};

export const CovalentContext = createContext(initialState);
export const CovalentContextProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(reducer, initialState);

  function fetchNftTokenIds(params) {
    return Service.fetchNftTokenIds(params);
  }

  function fetchNftMetadata(params) {
    return Service.fetchNftMetadata(params);
  }

  function fetchNFTsFromWalletAddress(params) {
    return Service.fetchNFTsFromWalletAddress(params);
  }

  function fetchMyNFTsCollection(params) {
    return Service.fetchMyNFTsCollection(params);
  }

  return (
    <CovalentContext.Provider
      value={{
        initialState: initialState,
        fetchNftTokenIds,
        fetchNftMetadata,
        fetchNFTsFromWalletAddress,
        fetchMyNFTsCollection,
      }}
    >
      {children}
    </CovalentContext.Provider>
  );
};
