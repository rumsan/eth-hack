import React, { createContext, useReducer } from "react";
import reducer from "./reducer";
import * as Service from "./service";

const initialState = {};

export const CovalentContext = createContext(initialState);
export const CovalentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function fetchNftTokenIds(params) {
    return Service.fetchNftTokenIds(params);
  }

  function fetchNftMetadata(params) {
    return Service.fetchNftMetadata(params);
  }

  function fetchNFTsFromWalletAddress(params) {
    return Service.fetchNFTsFromWalletAddress(params);
  }

  return (
    <CovalentContext.Provider
      value={{
        initialState: initialState,
        fetchNftTokenIds,
        fetchNftMetadata,
        fetchNFTsFromWalletAddress,
      }}
    >
      {children}
    </CovalentContext.Provider>
  );
};
