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

//--------------------------------------------------------------------------

const App = () => {
  //--------------------------------------------------------------------------
  const { activeAccount, providers } = useWallet();
  const [postsList, setPostsList] = useState<postInterface[]>([]);
  const [userData, setUserData] = useState<UserInterface>();
  const walletProviders = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
      { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
    ],
  });

  const accountService = new accountServices();
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

  useEffect(() => {
    fetchPosts();
  }, []);

  //--------------------------------------------------------------------------
  useEffect(() => {
    if (activeAccount) {
      fetchUser();
    }
    setUserData(undefined);
  }, [activeAccount]);
  //--------------------------------------------------------------------------

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
        { path: "/", element: <HomePage /> },
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
