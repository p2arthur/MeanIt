import { useOutletContext } from "react-router-dom";
import { UserInterface } from "../interfaces/user-interface";
import ProfileWidget from "../widgets/ProfileWidget";

const ProfilePage = ({ updateUser }) => {
  const { userData } = useOutletContext<{ userData: UserInterface }>();

  const handleUpdateUser = () => {
    updateUser({ username: "p2arthur" });
  };

  return (
    <div className="h-screen bg-gray-200 dark:bg-gray-900 px-3 flex flex-col gap-3 mt-16">
      <ProfileWidget userData={userData} />
      <button onClick={handleUpdateUser}>Update</button>
    </div>
  );
};

export default ProfilePage;
