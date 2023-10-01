const getDynamicPeraWalletConnect = async () => {
  const PeraWalletConnect = (await import("@perawallet/connect"))
    .PeraWalletConnect;
  return PeraWalletConnect;
};

const getDynamicDeflyWalletConnect = async () => {
  const DeflyWalletConnect = (await import("@blockshake/defly-connect"))
    .DeflyWalletConnect;
  return DeflyWalletConnect;
};

export { getDynamicPeraWalletConnect, getDynamicDeflyWalletConnect };
