import { useState } from "react";
import { useWallet } from "@txnlab/use-wallet";
import { accountServices } from "../services/accountServices";

const ConnectButton = () => {
  const { providers, activeAccount } = useWallet();
  const [isConnected, setIsConnected] = useState(false);

  const handleLogIn = async (provider) => {
    if (providers) {
      try {
        await provider.connect();
      } catch (error) {
        console.error("Error connecting with wallet");
      }
    }
  };

  return (
    <details className="dropdown">
      <summary className="m-1 btn btn-sm text-sm bg-cyan-400 text-gray-900 hover:bg-cyan-500">
        Connect Wallet
      </summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-cyan-400 rounded-box w-40 text-gray-950">
        {providers?.map((provider) => (
          <li key={provider.metadata.name}>
            <a className="flex" onClick={() => handleLogIn(provider)}>
              <img
                className="h-5 w-5 rounded-full"
                src={provider.metadata.icon}
              />
              {provider.metadata.name}{" "}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
};

export default ConnectButton;
