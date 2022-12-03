import React, {
    createContext,
  } from "react";

  import { useAuth } from "../../hooks/useWalletAuth";
  import { useWeb3React } from "@web3-react/core";

  export const AppContext = createContext();
  
  export const AppContextProvider = ({ children }) => {
    const { account } = useWeb3React();

    const {
      connectMetaMask,
      disconnect
    } = useAuth();

    return (
      <AppContext.Provider
        value={{
          connectMetaMask,
          disconnect,
          account
        }}
      >
        {children}
      </AppContext.Provider>
    );
  };
  