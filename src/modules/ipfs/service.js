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
