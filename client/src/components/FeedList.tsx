import PostCard from "./PostCard";
import { ReactNode, useEffect, useState } from "react";

import Modal from "./Modal";
import { useOutletContext } from "react-router-dom";
import { postInterface } from "../interfaces/post-interface";
import { accountServices } from "../services/accountServices";

const FeedList = (): JSX.Element => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { postsList } = useOutletContext<{ postsList: postInterface[] }>();

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  let renderedPosts: ReactNode;

  if (postsList.length > 0) {
    renderedPosts = postsList.map((post, index) => {
      return (
        <PostCard
          text_content={post.text_content}
          key={index}
          post_id={post.post_id}
          creation_date={post.creation_date}
          creator_id={post.creator_id}
          creator_address={post.creator_address}
          //   interactions={{
          //     likes: post.interactions.likes,
          //     comments: post.interactions.comments,
          //     donations: post.interactions.donations,
          //   }}
        />
      );
    });
  } else {
    renderedPosts = <p className="text-gray-100">No posts to display</p>;
  }

  return (
    <div className="flex gap-2 flex-col overflow-x-hidden pb-10">
      <Modal modalIsOpen={modalIsOpen} cancelFn={handleCloseModal} />
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 ml-5">
        Your feed
      </h2>
      {renderedPosts}
    </div>
  );
};

export default FeedList;
