import React from "react";
import formatWalletAddress from "../utils/formatWalletAddress";
import { UserInterface } from "../interfaces/user-interface";
import { BiBadgeCheck } from "react-icons/bi";

interface ProfileWidgetPropsInterface {
  user: UserInterface;
}

const ProfileWidget = ({ user }: ProfileWidgetPropsInterface) => {
  console.log("profileWidgetuser", user);

  return (
    <div className="stats shadow mt-6 bg-gray-100 dark:bg-gray-950">
      <div className="flex items-center px-10 gap-3">
        <div className="stat-figure text-secondary">
          <div className="avatar">
            <div className="w-16 rounded-full border-2 border-cyan-300">
              <img src="https://i.insider.com/61cc84b94710b10019c77960?width=500&format=jpeg&auto=webp" />
            </div>
          </div>
        </div>
        <div className="stat-value text-gray-900 dark:text-gray-100 flex items-center gap-3">
          {formatWalletAddress(user.userWalletAddress)}
          {user.isPremium ? (
            <span className="text-gray-100 bg-cyan-300 rounded-full w-6 h-6 -right-1">
              <BiBadgeCheck className="w-6 h-6" />
            </span>
          ) : null}
        </div>
      </div>
      <div className="stat">
        <div className="stat-figure text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Total Likes</div>
        <div className="stat-value text-primary">25.6K</div>
        <div className="stat-desc">21% more than last month</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Page Views</div>
        <div className="stat-value text-secondary">2.6M</div>
        <div className="stat-desc">21% more than last month</div>
      </div>
    </div>
  );
};

export default ProfileWidget;
