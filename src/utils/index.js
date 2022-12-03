import { COVALENT_KEY } from "../constants";
import { SUPPORTED_CHAINS } from "../constants";

export function appendQueryParam(url) {
  const appendedUrl = url + `/?key=${COVALENT_KEY}`;
  return appendedUrl;
}

export const getNetworkConnectParams = (chainId) => SUPPORTED_CHAINS[chainId];
