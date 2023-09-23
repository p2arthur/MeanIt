import { ReactNode } from "react";
import ConnectButton from "./ConnectButton";
import { useWallet } from "@txnlab/use-wallet";
interface OptionsInterface {
  type: string;
  data: { title: string; subtitle: string; option: string };
}

const OptionsSection = ({ options }: { options: OptionsInterface[] }) => {
  const { activeAccount } = useWallet();

  const optionRenderer = () => {
    return options.map((option, index) => {
      switch (option.type) {
        case "connect":
          return <ConnectButton />;
        case "news":
          return (
            <div
              key={index}
              className="bg-gray-950 rounded text-white p-3 hover:scale-101 transition-all cursor-pointer"
            >
              <h4 className="text-sm">{option.data.title}</h4>
              <p className="text-xs">{option.data.subtitle}</p>
            </div>
          );
      }
    });
  };

  return (
    <div className="w-full">
      <div className="h-screen flex flex-col justify-between w-full p-3 relative">
        {!activeAccount ? (
          <div className="w-full h-screen bg-gray-800 absolute top-0 left-0 opacity-80" />
        ) : null}
        {optionRenderer()}
      </div>
    </div>
  );
};

export default OptionsSection;
