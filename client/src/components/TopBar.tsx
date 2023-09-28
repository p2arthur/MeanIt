import ConnectButton from "./ConnectButton";
import { useWallet } from "@txnlab/use-wallet";
import WalletWidget from "../widgets/WalletWidget";
import { useEffect, useState } from "react";
import createAccount from "../services/createAccount";
import ThemeSwitcher from "./ThemeSwitcher";

const TopBar = () => {
  const { activeAccount, providers } = useWallet();

  useEffect(() => {
    if (activeAccount) {
      createAccount(activeAccount);
    }
  }, [activeAccount]);

  return (
    <div className="navbar bg-base-100 fixed">
      <div className="flex-1">
        <img
          src="https://d1dh0spncfsutm.cloudfront.net/meanit-logo.png"
          alt=""
          className="w-10"
        />
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <WalletWidget />
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default TopBar;
