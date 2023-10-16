import ConnectButton from "./ConnectButton";
import { useWallet } from "@txnlab/use-wallet";
import WalletWidget from "../widgets/WalletWidget";
import { useEffect, useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import { UserPropsInterface } from "../interfaces/user-props-interface";

interface navLinksInterface {
  title: string;
  path: string;
}

const NavBar = ({ userData }: UserPropsInterface) => {
  const { activeAccount } = useWallet();
  const navigate = useNavigate();

  const navLinks: navLinksInterface[] = [
    // { title: "profile", path: "/profile" },
  ];

  useEffect(() => {
    navigate("/");
  }, [activeAccount]);

  useEffect(() => {}, [userData]);

  return (
    <div className="navbar bg-base-100 fixed z-30">
      <div className="flex-1">
        <NavLink to="/">
          <img
            src="https://d1dh0spncfsutm.cloudfront.net/meanit-logo.png"
            alt=""
            className="w-10"
          />
        </NavLink>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 flex items-center gap-3">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink to={link.path}>{link.title}</NavLink>
            </li>
          ))}
          <div className="flex gap-3 items-center">
            {!userData ? (
              <ConnectButton />
            ) : (
              <WalletWidget userData={userData} />
            )}
            <ThemeSwitcher />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
