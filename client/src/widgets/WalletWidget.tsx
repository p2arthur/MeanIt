import { Provider } from "@txnlab/use-wallet";
import formatWalletAddress from "../utils/formatWalletAddress";
import { BiLogOut } from "react-icons/bi";

const WalletWidget = (activeAccount: any, providers: Provider[]) => {
  const handleLogOut = async () => {
    if (providers) {
      console.log("activeAccount:", activeAccount);
      console.log("Wallet widget providers", providers);
      await activeAccount.providers[0].disconnect();
    }
  };

  return (
    <div className="flex">
      <button className="w-4/5 rounded-bl rounded-tl px-1 bg-cyan-500 p-1 text-sm">
        {formatWalletAddress(activeAccount.activeAccount.address)}
      </button>
      <button
        className="p-1 rounded-tr rounded-br w-1/5 transition all hover:bg-red-700 bg-cyan-600 flex flex-col items-center justify-center"
        onClick={handleLogOut}
      >
        <BiLogOut className="" />
      </button>
    </div>
  );
};

export default WalletWidget;
