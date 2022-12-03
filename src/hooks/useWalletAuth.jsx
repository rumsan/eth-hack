import {
    useCallback,
    createContext,
    useContext,
    useEffect,
    useRef,
  } from "react";
  import { useWeb3React } from "@web3-react/core";
  
  import { injected } from "./connectors";
  import Swal from "sweetalert2";
  
  export const AuthContext = createContext({});
  export const useAuthMethod = () => useContext(AuthContext);
  
  export const useAuth = () => {
    const { activate, deactivate, account, chainId, connector } = useWeb3React();
    const mounted = useRef(false);
  
    useEffect(() => {
      if (!mounted.current) mounted.current = true;
      if (!account) localStorage.removeItem("wallet-auth");
      if (
        connector &&
        Boolean(connector.supportedChainIds) &&
        !connector.supportedChainIds.includes(chainId)
      ) {
        console.log(
          "Selected blockchain not supported, Please select different network!"
        );
      }

    }, [account, chainId, connector]);
  
    const connectMetaMask = useCallback(async () => {
      try {
        if (typeof window.ethereum === "undefined") {
          Swal.fire({
            title: "Metamask Not Found",
            html: '<a href="https://metamask.io/download/" target="_blank">Click here to Download</a>',
          });
          return false;
        }
        const selectedAddress = window.ethereum.selectedAddress || '';
  
        await activate(injected);
        localStorage.setItem("wallet-auth", "MetaMask");
        return true;
      } catch (e) {
        localStorage.removeItem("wallet-auth");
      }
    }, [activate]);
  
    const disconnect = useCallback(() => {
      try {
        deactivate();
        localStorage.removeItem("wallet-auth");
        localStorage.removeItem("walletconnect");
      } catch (err) {
        console.log("ERR==>", err);
      }
    }, [deactivate]);
  
    // Set wallet context on page refresh
    useEffect(() => {
      (async () => {
        if (localStorage.getItem("wallet-auth") === "MetaMask") {
          await connectMetaMask();
        }
      })();
    }, [connectMetaMask]);
  
    return {
      connectMetaMask,
      disconnect,
    };
  };
  