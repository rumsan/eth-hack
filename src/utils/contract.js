export const makeContract = (library, abi, address) => {
  return new library.eth.Contract(abi, address);
};
