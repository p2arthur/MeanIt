import React from "react";
import formatWalletAddress from "../utils/formatWalletAddress";
import { UserInterface } from "../interfaces/user-interface";
import { BiBadgeCheck } from "react-icons/bi";
import { UserPropsInterface } from "../interfaces/user-props-interface";
import { CommunityInterface } from "../interfaces/community-interface";

interface ProfileWidgetPropsInterface {
  userData: UserInterface;
  createCommunity: any;
}

const ProfileWidget = ({
  userData,
  createCommunity,
}: ProfileWidgetPropsInterface) => {
  const updateUser = () => {};

  const handleCreateCommunity = async () => {
    console.log("creating community");
    const testCommunity: CommunityInterface = {
      creator_address: "aaaaaaaa",
      community_handle: "@testfromui",
      text_content: "teststet",
      creation_date: new Date(),
    };

    console.log("test community:", testCommunity);

    const response = await createCommunity(testCommunity);

    console.log("create community response", response);
  };

  return (
    <div className="stats shadow mt-6 bg-gray-100 dark:bg-gray-950">
      <div className="flex items-center px-10 py-6 gap-3">
        <div className="stat-figure text-secondary">
          <div className="avatar">
            <div className="w-16 rounded-full border-2 border-cyan-300">
              <img
                src={
                  userData
                    ? userData.profile_picture
                    : "https://d1dh0spncfsutm.cloudfront.net/meanit-logo.png"
                }
              />
            </div>
          </div>
        </div>
        <div className="stat-value text-gray-900 dark:text-gray-100 flex items-center gap-3">
          {userData ? userData.meanit_username : null}
        </div>
        <button
          onClick={() => updateUser()}
          className="rounded bg-gray-900 text-gray-200 border-2 py-1 px-3 hover:bg-cyan-500 border-gray-900 transition-all duration-75"
        >
          Update user
        </button>
        <button
          onClick={handleCreateCommunity}
          className="rounded bg-gray-900 text-gray-200 border-2 py-1 px-3 hover:bg-cyan-500 border-gray-900 transition-all duration-75"
        >
          Create community
        </button>
      </div>
    </div>
  );
};

export default ProfileWidget;
