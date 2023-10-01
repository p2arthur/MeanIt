import HomePage from "./pages/homePage";
import {
  WalletProvider,
  useInitializeProviders,
  PROVIDER_ID,
  useWallet,
} from "@txnlab/use-wallet";
import { Provider } from "react-redux";
import store from "./store/store";
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

const App = () => {
  const { activeAccount, providers } = useWallet();
  const [postsList, setPostsList] = useState<postInterface[]>([]);
  const walletProviders = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.PERA, getDynamicClient: getDynamicPeraWalletConnect },
      { id: PROVIDER_ID.DEFLY, getDynamicClient: getDynamicDeflyWalletConnect },
    ],
  });

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

  const router = createBrowserRouter([
    {
      element: (
        <>
          <NavBar />
          <Outlet context={{ postsList }} />
        </>
      ),

      children: [
        { path: "/", element: <HomePage /> },
        { path: "/profile", element: <ProfilePage /> },
        { path: "/posts/:postId", element: <PostDetail /> },
      ],
    },
  ]);

  return (
    <div className="bg-gray-300 dark:bg-gray-900 overflow-hidden">
      <Provider store={store}>
        <WalletProvider value={walletProviders}>
          <RouterProvider router={router} />
        </WalletProvider>
      </Provider>
    </div>
  );
};

export default App;
