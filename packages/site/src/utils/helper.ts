export const shortAddress = (address: string) => {
  return address ? `${address.substring(0, 5)}...${address.substring(address.length - 5)}` : '';
};
