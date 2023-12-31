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
import { communityServices } from "./services/communityServices";
import { CommunityInterface } from "./interfaces/community-interface";

//--------------------------------------------------------------------------

const App = () => {
  //--------------------------------------------------------------------------
  const { activeAccount } = useWallet();
  const [postsList, setPostsList] = useState<postInterface[]>([]);
  const [communitiesList, setCommunitiesList] = useState<CommunityInterface[]>(
    []
  );

  const [userData, setUserData] = useState<UserInterface>();
  const walletProviders = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
      { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
    ],
  });

  const accountService = new accountServices();
  const postsService = new postServices();
  const communityService = new communityServices();
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(`${config.url}/posts/all`);
      console.log("posts list:", data);

      setPostsList(data);
    } catch (error) {}
  };
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  const fetchUser = async (address: string) => {
    if (activeAccount) {
      const data = await accountService.getAccount(address);
      setUserData(data);
    }
  };
  //--------------------------------------------------------------------------

  const updateUser = async (attributes: Partial<UserInterface>) => {
    if (!activeAccount) {
      return;
    }
    const userData = await accountService.updateAccount(
      activeAccount?.address,
      attributes
    );
    setUserData(userData);
  };

  const signinUser = async () => {
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
      fetchUser(activeAccount.address);
    }
    setUserData(undefined);
  }, [activeAccount]);
  //--------------------------------------------------------------------------

  const addPost = async (newPost: postInterface) => {
    Object.assign(newPost, {
      creator_id: userData?.id,
      user: { meanit_username: userData?.meanit_username },
      creator_address: userData?.wallet_address,
      post_id: postsList.length + 1,
    });
    const newPostsList = [...postsList, newPost];
    postsService.createPost(newPost.text_content, userData as UserInterface);
    setPostsList(
      newPostsList.sort((post1, post2) => post2.post_id - post1.post_id)
    );
  };

  const createCommunity = async (newCommunity: CommunityInterface) => {
    console.log("app new comment", newCommunity);
    Object.assign(newCommunity, { creator_id: userData?.id });
    const newCommunitiesList = [...communitiesList, newCommunity];
    if (!userData) {
      return;
    }
    communityService.createCommunity(userData.wallet_address);
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
        {
          path: "/profile",
          element: (
            <ProfilePage
              updateUser={updateUser}
              createCommunity={createCommunity}
            />
          ),
        },
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
