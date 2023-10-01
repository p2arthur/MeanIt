import { useOutletContext } from "react-router-dom";
import { UserInterface } from "../interfaces/user-interface";

const ProfilePage = () => {
  const { userData } = useOutletContext<{ userData: UserInterface }>();

  return (
    <div className="h-screen bg-gray-200 dark:bg-gray-900 px-3 flex flex-col gap-3 mt-16">
      {userData.userWalletAddress}
      <p>{userData.isPremium ? "isPremium" : "notPremium"}</p>
    </div>
  );
};

export default ProfilePage;
