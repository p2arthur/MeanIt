import { useOutletContext } from "react-router-dom";
import { UserInterface } from "../interfaces/user-interface";
import ProfileWidget from "../widgets/ProfileWidget";

const ProfilePage = () => {
  const { userData } = useOutletContext<{ userData: UserInterface }>();

  return (
    <div className="h-screen bg-gray-200 dark:bg-gray-900 px-3 flex flex-col gap-3 mt-16">
      <ProfileWidget userData={userData} />
    </div>
  );
};

export default ProfilePage;
