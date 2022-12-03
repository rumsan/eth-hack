import Web3 from "web3";

import { CHAIN_RPC_URLS } from "../constants/blockchainConstants";

export const getWeb3=(chainId)=>{
    let rpcUrl = CHAIN_RPC_URLS[chainId]
    let httpProvider = new Web3.providers.HttpProvider(rpcUrl);
    const web3 = new Web3(httpProvider);
    return web3;
}

export const getContract =(abi,address,networkId)=>{
    const web3 = getWeb3(networkId);
    return new web3.eth.Contract(abi,address);
}