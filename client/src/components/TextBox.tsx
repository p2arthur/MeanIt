import { useWallet } from "@txnlab/use-wallet";
import { FormEvent, useState } from "react";
import ConnectButton from "./ConnectButton";
import { postServices } from "../services/postServices";

const TextBox = () => {
  const [postText, setPostText] = useState("");
  const { providers, activeAccount } = useWallet();

  const postsServices = new postServices();

  const handleLogIn = async () => {
    if (providers) {
      try {
        providers[0].connect();
      } catch (error) {
        console.error("Error connecting with wallet");
      }
    }
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPostText(event.target.value);
  };

  const handleCreatePost = (event: FormEvent) => {
    event.preventDefault();
    if (activeAccount) {
      postsServices.createPost(activeAccount, postText);
    } else {
      console.log("Please connect a wallet to post");
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-950 border-b-1 lg:border-l-1 lg:border-b-0 lg:rounded-b-none border-cyan-400 rounded-b lg:rounded-br h-40 p-3 mt-5">
      <form
        className="h-full w-full flex flex-col items-end"
        onSubmit={handleCreatePost}
      >
        <textarea
          onChange={handleTextAreaChange}
          placeholder={
            activeAccount ? "Create post" : "Connect a wallet to create a post"
          }
          maxLength={280}
          spellCheck={false}
          disabled={!activeAccount}
          className="h-2/3 w-full text-gray-900 bg-transparent border-t p-2 dark:border-gray-900 border-gray-200 dark:text-gray-200 active:ring-0 transition-transform focus:outline-none resize-none hover:scale-101 placeholder:text-gray-600"
        />

        {!activeAccount ? (
          <ConnectButton />
        ) : (
          <button
            onClick={activeAccount ? handleCreatePost : handleLogIn}
            className="rounded bg-gray-900 text-gray-200 border-2 py-1 px-3 hover:bg-cyan-500 border-gray-900 transition-all duration-75"
          >
            Mean It
          </button>
        )}
      </form>
    </div>
  );
};

export default TextBox;
