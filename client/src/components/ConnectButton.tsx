import { useState } from "react";
import { useWallet } from "@txnlab/use-wallet";

const ConnectButton = () => {
  const { providers, activeAccount } = useWallet();
  const [isConnected, setIsConnected] = useState(false);

  const handleLogIn = async () => {
    if (providers) {
      try {
        await providers[0].connect();
      } catch (error) {
        console.error("Error connecting with wallet");
      }
    }
  };

  return (
    <div className="w-32">
      <button
        className={`rounded flex bg-gray-900 text-gray-200 border-2 py-1 px-1 hover:bg-cyan-500 border-gray-900 transition-all duration-75 ${
          isConnected ? "bg-green-500" : ""
        }`}
        onClick={handleLogIn}
      >
        {isConnected ? "Connected" : "Connect Wallet"}
      </button>
    </div>
  );
};

export default ConnectButton;
