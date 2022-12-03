import API from "../../constants/api";
import axios from "axios";

export function fetchTokenUri(hash) {
  const url = `${API.IPFS}/${hash}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err?.data);
      });
  });
}

export async function uploadImage(metaData) {
  let data = new FormData();
  data.append("file", metaData, { filepath: "anyname" });
  const IPFS_GATEWAY = `${API.IPFS_PINATA}/pinFileToIPFS`;
  let hash;
  await axios
    .post(IPFS_GATEWAY, data, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data;boundary =${data._boundary}`,
        pinata_api_key: process.env.REACT_APP_PINATA_KEY,
        pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET,
      },
    })
    .then(function (response) {
      hash = response.data.IpfsHash;
    })
    .catch(function (err) {
      console.log(err);
    });
  return hash;
}

export async function uploadToIPFS(data) {
  const IPFS_GATEWAY = `${API.IPFS_PINATA}/pinJSONToIPFS`;
  let hash;
  await axios
    .post(IPFS_GATEWAY, data, {
      headers: {
        "Content-Type": `application/json`,
        pinata_api_key: process.env.REACT_APP_PINATA_KEY,
        pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET,
      },
    })
    .then(function (response) {
      hash = response.data.IpfsHash;
    })
    .catch(function (err) {
      console.log(err);
    });
  return hash;
}
