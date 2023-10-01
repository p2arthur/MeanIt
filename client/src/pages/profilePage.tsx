import { useOutletContext } from "react-router-dom";

const ProfilePage = () => {
  const { userData } = useOutletContext();

  return (
    <div className="h-screen bg-gray-200 dark:bg-gray-900 px-3 flex flex-col gap-3 mt-16">
      {userData.userWalletAddress}
      <p>{userData.isPremium ? "isPremium" : "notPremium"}</p>
    </div>
  );
};

export default ProfilePage;
