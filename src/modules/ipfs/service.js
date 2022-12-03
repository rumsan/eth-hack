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

export async function uploadImage(file) {
  let data = new FormData();
  data.append("file", file, { filepath: "ease-nft" });
  const IPFS_GATEWAY = `${API.IPFS_PINATA}`;
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
