const formatWalletAddress = (walletAddress: string): string => {
  const firstPart = walletAddress.substring(0, 4);
  const lastPart = walletAddress.substring(walletAddress.length - 4);

  return `${firstPart}...${lastPart}`;
};

export default formatWalletAddress;
