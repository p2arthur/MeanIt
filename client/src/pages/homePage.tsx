import FeedList from "../components/FeedList";
import TextBox from "../components/TextBox";

const HomePage = ({ addPost }) => {
  return (
    <div className="h-screen bg-gray-200 dark:bg-gray-900 px-3 flex flex-col gap-3 mt-16">
      <TextBox addPost={addPost} />
      <FeedList />
    </div>
  );
};

export default HomePage;
