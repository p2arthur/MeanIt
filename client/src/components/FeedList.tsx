import { postInterface } from "../interfaces/post-interface";
import TextBox from "./TextBox";
import PostCard from "./PostCard";
import { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";

const FeedList = (): ReactNode => {
  let postList: postInterface[] = [];

  const [postsList, setPostsList] = useState<postInterface[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/posts");
      console.log("postsListData", data);
      setPostsList(data);
    } catch (error) {
      console.log("Error fetching posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  let renderedPosts: ReactNode;

  if (postsList) {
    renderedPosts = postsList.map((post) => {
      return (
        <PostCard
          postId={post.postId}
          creator={post.creator}
          content={post.content}
          interactions={{
            likes: post.interactions.likes,
            comments: post.interactions.comments,
            donations: post.interactions.donations,
          }}
        />
      );
    });
  } else {
    renderedPosts = <p className="text-gray-100">No posts to display</p>;
  }

  return (
    <div className="flex gap-5 flex-col h-screen overflow-y-auto scroll px-2 bg-gray-200 dark:bg-gray-950 pb-20">
      <Modal modalIsOpen={modalIsOpen} cancelFn={handleCloseModal} />

      <TextBox />
      <h2 className="text-xl font-semibold text-gray-100 ml-5">Your feed</h2>
      {renderedPosts}
      <button className="btn btn-primary" onClick={handleOpenModal}>
        Open modal
      </button>
    </div>
  );
};

export default FeedList;
