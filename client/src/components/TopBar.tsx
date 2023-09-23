import ConnectButton from "./ConnectButton";
import { useWallet } from "@txnlab/use-wallet";
import WalletWidget from "../widgets/WalletWidget";
import { useEffect } from "react";
import CreateAccount from "../services/CreateAccount";

const TopBar = () => {
  const { activeAccount, providers } = useWallet();

  useEffect(() => {
    if (activeAccount) {
      CreateAccount(activeAccount);
    }
  }, [activeAccount]);

  return (
    <div className="bg-gray-950 w-screen text-white p-2 pl-10 fixed z-10 flex justify-between items-center">
      <div className="flex items-end">
        <img
          src="https://meanit-bucket.s3.sa-east-1.amazonaws.com/MeanIt-Logo1+(1).png"
          alt=""
          className="w-10"
        />
        <p className="text-2xl">ean It</p>
      </div>
      {!activeAccount ? (
        <ConnectButton />
      ) : (
        <WalletWidget activeAccount={activeAccount} providers={providers} />
      )}
    </div>
  );
};

export default TopBar;
