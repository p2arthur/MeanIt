import HomePage from "./pages/homePage";
import {
  WalletProvider,
  useInitializeProviders,
  PROVIDER_ID,
  useWallet,
} from "@txnlab/use-wallet";
import { Provider } from "react-redux";
import NavBar from "./components/NavBar";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  getDynamicPeraWalletConnect,
  getDynamicDeflyWalletConnect,
} from "./utils/getDynamicWalletProviders";
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

const App = () => {
  const { activeAccount, providers } = useWallet();
  const [postsList, setPostsList] = useState<postInterface[]>([]);
  const [userData, setUserData] = useState<UserInterface[]>();
  const walletProviders = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
      { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
    ],
  });

  const account = new accountServices();

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(`${config.url}/posts`);
      console.log("postsListData", data);
      setPostsList(data);
    } catch (error) {
      console.log("Error fetching posts");
    }
  };

  const fetchUserData = async () => {
    if (activeAccount) {
      const data = await account.getAccount(activeAccount.address);
      console.log(data);
      setUserData(data);
    }
  };

  useEffect(() => {
    console.log(config);
    fetchPosts();
  }, []);

  useEffect(() => {
    if (activeAccount) {
      fetchUserData();
    }
  }, [activeAccount]);

  const router = createBrowserRouter([
    {
      element: (
        <>
          <NavBar />
          <Outlet context={{ postsList, userData }} />
        </>
      ),

      children: [
        { path: "/", element: <div>Home</div> },
        { path: "/profile", element: <ProfilePage /> },
        {
          path: "/something/2",
          element: <div className="mt-16 text-white">Something</div>,
        },
        { path: "/posts/:postId", element: <PostDetail /> },
      ],
    },
  ]);

  return (
    <div className="bg-gray-300 dark:bg-gray-900 overflow-hidden">
      <WalletProvider value={walletProviders}>
        <RouterProvider router={router} />
      </WalletProvider>
    </div>
  );
};

export default App;
