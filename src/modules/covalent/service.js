import API from "../../constants/api";
import axios from "axios";
import { appendQueryParam } from "../../utils";
import { fetchTokenUri } from "../ipfs/service";
import { CONTRACT_ADDRESS } from "../../contract/contractAddress";
import marketPlaceAbi from "../../contract/abi/MarketPlace.json";
import { getContract } from "../../utils/web3";
import Web3 from "web3";

export async function fetchNftTokenIds(params) {
  const { chainId, contract } = params;
  const marketPlace = getContract(
    marketPlaceAbi.abi,
    CONTRACT_ADDRESS.marketPlace[chainId],
    chainId
  );

  const url = `${API.COVALENT}/${chainId}/tokens/${contract}/nft_token_ids`;
  const appendedUrl = appendQueryParam(url);
  return new Promise((resolve, reject) => {
    axios
      .get(appendedUrl)
      .then(async (res) => {
        const { data } = res.data;
        if (!data?.items?.length) {
          resolve([]);
          return;
        }
        const metaDataResponse = await Promise.all(
          data.items?.map(async (d) => {
            const metadataInfo = await fetchNftMetadata({
              chainId,
              contract,
              tokenId: d.token_id,
            });
            const data = await marketPlace.methods
              .tokenDetails(d.token_id)
              .call();
            const price = Web3.utils.fromWei(data.minPrice);
            const previousOwner = data.nftOwner;
            const metadata = metadataInfo.data.items[0].nft_data[0];
            return { ...d, ...metadata, price, previousOwner };
          })
        );
        const ipfsResponse = await Promise.all(
          metaDataResponse?.map(async (d) => {
            const ipfsInfo = await fetchTokenUri(d.external_data.external_url);
            return { ...d, tokenData: ipfsInfo };
          })
        );
        resolve(ipfsResponse);
      })
      .catch((err) => {
        reject(err?.data);
      });
  });
}

export function fetchNftMetadata(params) {
  const { chainId, contract, tokenId } = params;
  const url = `${API.COVALENT}/${chainId}/tokens/${contract}/nft_metadata/${tokenId}`;
  const appendedUrl = appendQueryParam(url);
  return new Promise((resolve, reject) => {
    axios
      .get(appendedUrl)
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

export function fetchMyNFTsCollection(params) {
  const { chainId, contract, wallet } = params;
  const url = `${API.COVALENT}/${chainId}/address/${wallet}/balances_v2`;
  const appendedUrl = appendQueryParam(url).concat("&nft=true");
  return new Promise((resolve, reject) => {
    axios
      .get(appendedUrl)
      .then((res) => {
        const { items } = res.data.data;
        resolve(items);
      })
      .catch((err) => {
        reject(err?.data);
      });
  });
}
