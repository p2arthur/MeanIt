import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import PostCard from "../components/PostCard";
import { postInterface } from "../interfaces/post-interface";

interface postsListInterface {
  postList: postInterface[];
}

const PostDetail = () => {
  const { postsList } = useOutletContext<{ postsList: postInterface[] }>();

  const { postId } = useParams();
  const post: postInterface = postsList.filter(
    (post: postInterface) => post.postId === postId
  )[0];

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="h-screen bg-gray-200 dark:bg-gray-900 px-3 flex flex-col gap-3 mt-20">
      <PostCard
        creationDate={post.creationDate}
        postId={post.postId}
        creator={post.creator}
        content={post.content}
        interactions={{
          likes: post.interactions.likes,
          comments: post.interactions.comments,
          donations: post.interactions.donations,
        }}
      />
    </div>
  );
};

export default PostDetail;
