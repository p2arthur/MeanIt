import { useWallet } from "@txnlab/use-wallet";
import { FormEvent, useState } from "react";
import ConnectButton from "./ConnectButton";

const TextBox = () => {
  const [postText, setPostText] = useState("");
  const { providers, activeAccount } = useWallet();

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
    console.log("postText:", postText);
  };

  return (
    <div className="bg-gray-950 border-b-1 lg:border-l-1 lg:border-b-0 lg:rounded-b-none border-cyan-400 rounded-b lg:rounded-br p-5 h-40">
      <form
        className="h-24 w-full flex flex-col items-end"
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
          className=" w-full bg-transparent border-t p-2 hover:shadow-inner border-gray-900 text-gray-400 active:ring-0 transition-transform focus:outline-none resize-none hover:scale-101 placeholder:text-gray-600"
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
