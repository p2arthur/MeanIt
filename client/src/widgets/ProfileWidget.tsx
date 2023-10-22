import React from "react";
import formatWalletAddress from "../utils/formatWalletAddress";
import { UserInterface } from "../interfaces/user-interface";
import { BiUserVoice, BiWrench } from "react-icons/bi";
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
    <div className="rounded-xl  border-none shadow mt-6 bg-gray-100 dark:bg-gray-950 flex justify-end">
      <div className="flex gap-6 items-center px-10 py-6 justify-start w-5/6 ">
        <div className="stat-figure text-secondary ">
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
      </div>
      <div className="w-1/6 flex justify-end py-5 px-12">
        <div className="flex gap-5 h-12 justify-end w-16">
          <div
            className="tooltip w-5 h-5 tooltip-bottom"
            data-tip="update account"
          >
            <button>
              <BiWrench className="w-5 h-5" />
            </button>
          </div>
          <div
            className="tooltip w-5 h-5 tooltip-bottom"
            data-tip="create community"
          >
            <button onClick={handleCreateCommunity}>
              <BiUserVoice className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWidget;
