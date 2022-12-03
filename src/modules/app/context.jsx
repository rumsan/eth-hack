import React, {
    createContext,
  } from "react";

  import { useAuth } from "../../hooks/useWalletAuth";

  const initialState = {
  };
  
  export const AppContext = createContext(initialState);
  export const AppContextProvider = ({ children }) => {
    const {
      connectMetaMask,
      disconnect,
    } = useAuth();

    return (
      <AppContext.Provider
        value={{
          initialState: initialState,
          connectMetaMask,
          disconnect
        }}
      >
        {children}
      </AppContext.Provider>
    );
  };
  