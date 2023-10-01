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
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PostDetail from "./pages/postDetail";

const App = () => {
  const { activeAccount, providers } = useWallet();

  const walletProviders = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.PERA, getDynamicClient: getDynamicPeraWalletConnect },
      { id: PROVIDER_ID.DEFLY, getDynamicClient: getDynamicDeflyWalletConnect },
    ],
  });

  const router = createBrowserRouter([
    {
      element: (
        <>
          <NavBar />
          <Outlet />
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
