import { useWallet } from "@txnlab/use-wallet";
import formatWalletAddress from "../utils/formatWalletAddress";
import { BiLogOut, BiUser } from "react-icons/bi";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import { UserInterface } from "../interfaces/user-interface";
import { UserPropsInterface } from "../interfaces/user-props-interface";

const WalletWidget = ({ userData }: UserPropsInterface) => {
  const { activeAccount, providers } = useWallet();

  const navigate = useNavigate();

  const provider = providers?.filter(
    (provider) => provider.metadata.id === activeAccount?.providerId
  );

  if (!userData) {
    return <div>Connect</div>;
  }

  return (
    <div className="dropdown dropdown-end">
      <div className="flex bg-gray-950 items-center rounded-full px-2 ">
        <label
          tabIndex={0}
          className="flex items-center py-1 gap-1 cursor-pointer"
        >
          <div className="rounded-full border-2 border-cyan-300 w-8 h-8 flex items-center overflow-hidden">
            <img
              className="h-full w-full"
              src="https://i.insider.com/61cc84b94710b10019c77960?width=500&format=jpeg&auto=webp"
              alt="account-avatar"
            />
          </div>
          <p>{userData ? userData.meanit_username : null}</p>
        </label>
      </div>
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-32"
      >
        <li>
          <a onClick={() => navigate("/profile")} className="justify-between">
            Profile
            <BiUser />
          </a>
        </li>
        <li>
          <a
            onClick={() =>
              provider ? provider[0].disconnect() : console.log("No provider")
            }
            className="justify-between"
          >
            Logout
            <BiLogOut />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default WalletWidget;
