declare const getDynamicPeraWalletConnect: () => Promise<typeof import("@perawallet/connect/dist/PeraWalletConnect").default>;
declare const getDynamicDeflyWalletConnect: () => Promise<typeof import("@blockshake/defly-connect/dist/DeflyWalletConnect").default>;
export { getDynamicPeraWalletConnect, getDynamicDeflyWalletConnect };
