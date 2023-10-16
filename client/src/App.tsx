//--------------------------------------------------------------------------
import HomePage from "./pages/homePage";
import {
  WalletProvider,
  useInitializeProviders,
  PROVIDER_ID,
  useWallet,
} from "@txnlab/use-wallet";
import NavBar from "./components/NavBar";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import ProfilePage from "./pages/profilePage";
import { useEffect, useState } from "react";
import PostDetail from "./pages/postDetail";
import { postInterface } from "./interfaces/post-interface";
import axios from "axios";
import { accountServices } from "./services/accountServices";
import { UserInterface } from "./interfaces/user-interface";
import { config } from "./config";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
import { PeraWalletConnect } from "@perawallet/connect";
import { postServices } from "./services/postServices";

//--------------------------------------------------------------------------

const App = () => {
  //--------------------------------------------------------------------------
  const { activeAccount } = useWallet();
  const [postsList, setPostsList] = useState<postInterface[]>([]);
  const [userData, setUserData] = useState<UserInterface>();
  const walletProviders = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
      { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
    ],
  });

  const accountService = new accountServices();
  const postsService = new postServices();
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(`${config.url}/posts/all`);
      console.log("postsListData", data);
      setPostsList(data);
    } catch (error) {
      console.log("Error fetching posts");
    }
  };
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  const fetchUser = async () => {
    if (activeAccount) {
      console.log(activeAccount.address);
      console.log("Serching account");
      const data = await accountService.getAccount(activeAccount.address);
      console.log("data:", data);
      setUserData(data);
    }
  };
  //--------------------------------------------------------------------------

  const updateUser = async (attributes: Partial<UserInterface>) => {
    console.log("Updating user");
    if (!activeAccount) {
      return;
    }
    console.log("updating user");
    const userData = await accountService.updateAccount(
      activeAccount?.address,
      attributes
    );
    setUserData(userData);
  };

  const signinUser = async () => {
    console.log("signin in a user");

    const walletAddress = activeAccount?.address;

    if (!walletAddress) {
      return;
    }
    const user = await accountService.signinUser(walletAddress);
    return user;
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  //--------------------------------------------------------------------------
  useEffect(() => {
    if (activeAccount) {
      signinUser();
      fetchUser();
    }
    setUserData(undefined);
  }, [activeAccount]);
  //--------------------------------------------------------------------------

  const addPost = async (newPost: postInterface) => {
    console.log("Adding post");
    Object.assign(newPost, { userId: 1 });
    console.log("newPost", newPost);
    const newPostsList = [...postsList, newPost];
    console.log("newPostList", newPostsList);
    postsService.createPost(
      {
        id: 1,
        nfd: "string",
        meanit_username: "string",
        walletAddress: "string",
        profile_picture: "string",
      },
      "asdasdasdasdasd"
    );
    setPostsList(newPostsList);
    console.log("PostList2:", postsList);
  };

  //--------------------------------------------------------------------------
  const router = createBrowserRouter([
    {
      element: (
        <>
          <NavBar userData={userData} />
          <Outlet context={{ postsList, userData }} />
        </>
      ),

      children: [
        { path: "/", element: <HomePage addPost={addPost} /> },
        { path: "/profile", element: <ProfilePage updateUser={updateUser} /> },
        { path: "/posts/:postId", element: <PostDetail /> },
      ],
    },
  ]);
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  return (
    <div className="bg-gray-300 dark:bg-gray-900 overflow-hidden">
      <WalletProvider value={walletProviders}>
        <RouterProvider router={router} />
      </WalletProvider>
    </div>
  );
};
//--------------------------------------------------------------------------
export default App;
//--------------------------------------------------------------------------
