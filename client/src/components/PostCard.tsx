import { postInterface } from "../interfaces/post-interface";
import { BiLike, BiDonateHeart, BiComment } from "react-icons/bi";
import formatWalletAddress from "../utils/formatWalletAddress";
import { useNavigate } from "react-router-dom";
import formatDateFromTimestamp from "../utils/formatDateFromTimestamp";
import { accountServices } from "../services/accountServices";
import { useEffect, useState } from "react";
import { UserInterface } from "../interfaces/user-interface";

const PostCard = (post: postInterface) => {
  const [userData, setUserData] = useState<UserInterface>();

  useEffect(() => {
    const fetchUserData = async () => {
      const accountService = new accountServices();

      const userData = await accountService.getAccount(post.creator_address);

      console.log(userData);

      setUserData(userData);
    };

    fetchUserData();
  }, []);

  const navigate = useNavigate();

  const postTimeDisplay = formatDateFromTimestamp(post.creation_date);

  const handleLikeClick = (event) => {
    // Prevent the click event from propagating up to the parent div
    event.stopPropagation();
    // Add your like functionality here
    // ...
  };

  // const { time, measure } = formatDateFromTimestamp(post.creationDate);

  return (
    <div key={post.post_id}>
      <div className="bg-gray-100 dark:bg-gray-950 p-5 border border-transparent hover:border-gray-300 dark:hover:border-gray-900 hover:scale-101 transition-all cursor-pointer">
        <div
          onClick={() => navigate(`/posts/${post.post_id}`)}
          className="flex flex-col"
        >
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="flex gap-3 items-center">
                <div className="w-12 border-2 border-cyan-500 h-12 rounded-full bg-gray-300 dark:bg-gray-900 hover:scale-110 transition-all duration-75"></div>
                <h3 className="text-gray-950 dark:text-gray-200 text-xl font-semibold">
                  {userData?.meanit_username}
                </h3>
              </div>
              <span>
                {`${postTimeDisplay.time} ${postTimeDisplay.measure} ago`}
                {}
              </span>
            </div>
            <div className="w-full">
              <p
                className="text-gray-950 dark:text-gray-400 text-sm md:text-lg w-full"
                style={{ overflowWrap: "break-word" }}
              >
                {post.text_content}
              </p>
            </div>
            <ul className="flex gap-5">
              <li className="w-20 transition-all h-20 md:w-28 md:h-28 bg-gray-300 dark:bg-gray-900 rounded"></li>
              <li className="w-20 h-20 md:w-28 md:h-28 transition-all bg-gray-300 dark:bg-gray-900 rounded"></li>
              <li className="w-20 h-20 md:w-28 md:h-28 transition-all bg-gray-300 dark:bg-gray-900 rounded"></li>
            </ul>
          </div>

          <div className="w-full flex items-center text-gray-900 dark:text-gray-100 justify-between lg:justify-end gap-1 px-5">
            <div
              onClick={handleLikeClick}
              className=" flex flex-col items-center"
            >
              <div className="group transition-all rounded-full bg-transparent hover:bg-gray-900 dark:hover:bg-gray-100 p-1">
                <BiLike className="transition-all group-hover:text-gray-100 dark:group-hover:text-gray-950 text-xl" />
              </div>
              {/* <p>{post.interactions.likes}</p> */}
            </div>

            <div className="flex flex-col items-center">
              <div className="group transition-all rounded-full bg-transparent hover:bg-gray-900 dark:hover:bg-gray-100 p-1">
                <BiDonateHeart className="transition-all group-hover:text-gray-100 dark:group-hover:text-gray-950 text-xl" />
              </div>

              {/* <p>{post.interactions.donations}</p> */}
            </div>

            <div className="flex flex-col items-center">
              <div className="group transition-all rounded-full bg-transparent hover:bg-gray-900 dark:hover:bg-gray-100 p-1">
                <BiComment className="transition-all group-hover:text-gray-100 dark:group-hover:text-gray-950 text-xl" />
              </div>
              {/* <p>{post.interactions.comments.length}</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
