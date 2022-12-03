import API from "../../constants/api";
import axios from "axios";

axios.defaults.key = "";

export function fetchNftTokenIds(params) {
  const { chainId, contract } = params;
  return new Promise((resolve, reject) => {
    axios
      .get(`${API.COVALENT}/${chainId}/tokens/${contract}/nft_token_ids`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err?.data);
      });
  });
}

export function fetchNftMetadata(params) {
  const { chainId, contract, tokenId } = params;
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${API.COVALENT}/${chainId}/tokens/${contract}/nft_metadata/${tokenId}`
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err?.data);
      });
  });
}

export function fetchNFTsFromWalletAddress(params) {
  const { chainId, contract, tokenId, wallet } = params;
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${API.COVALENT}/${chainId}/address/${wallet}/balances_v2/${tokenId}?nft=true`
      )
      .then((res) => {
        const { items } = res.data;
        const filtered = items?.filter((d) => d.contract_address === contract);
        resolve(filtered);
      })
      .catch((err) => {
        reject(err?.data);
      });
  });
}
