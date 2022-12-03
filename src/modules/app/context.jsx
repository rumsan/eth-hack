import React, {
    createContext,
    useReducer
  } from "react";

  import { useAuth } from "../../hooks/useWalletAuth";
  import appReduce from "./reducer";


  const initialState={}

  export const AppContext = createContext();
  
  export const AppContextProvider = ({ children }) => {
    const {
      connectMetaMask,
      disconnect,
    } = useAuth();

    const [state] = useReducer(appReduce, initialState);

    return (
      <AppContext.Provider
        value={{
          connectMetaMask,
          disconnect,
          ...state
        }}
      >
        {children}
      </AppContext.Provider>
    );
  };
  