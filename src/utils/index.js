import { COVALENT_KEY } from "../constants";

export function appendQueryParam(url) {
  const appendedUrl = url + `/?key=${COVALENT_KEY}`;
  return appendedUrl;
}
