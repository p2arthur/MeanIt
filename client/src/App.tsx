import Home from "./pages/home";
import {
  WalletProvider,
  useInitializeProviders,
  PROVIDER_ID,
} from "@txnlab/use-wallet";
import { Provider } from "react-redux";
import store from "./store/store";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
import { PeraWalletConnect } from "@perawallet/connect";
import { DaffiWalletConnect } from "@daffiwallet/connect";
import TopBar from "./components/TopBar";

const getDynamicPeraWalletConnect = async () => {
  const PeraWalletConnect = (await import("@perawallet/connect"))
    .PeraWalletConnect;
  return PeraWalletConnect;
};

const App = () => {
  const providers = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.PERA, getDynamicClient: getDynamicPeraWalletConnect },
    ],
  });

  return (
    <div className="bg-gray-300 dark:bg-gray-900 overflow-hidden">
      <Provider store={store}>
        <WalletProvider value={providers}>
          <TopBar />
          <Home />
        </WalletProvider>
      </Provider>
    </div>
  );
};

export default App;
