import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { postId } = useParams();
  console.log(postId);

  return (
    <div className="h-screen bg-gray-200 dark:bg-gray-900 px-3 flex flex-col gap-3 mt-16">
      {postId}aaaaa
    </div>
  );
};

export default PostDetail;
