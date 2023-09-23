import { ReactNode } from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { BiHomeAlt, BiNews, BiWorld, BiBox } from "react-icons/bi";

interface sidebarInterface {
  title: string;
  icon: ReactNode;
}

const Sidebar = () => {
  const sideBarItemsList: sidebarInterface[] = [
    { title: "Home", icon: <BiHomeAlt /> },
    { title: "Explore", icon: <BiWorld /> },
    { title: "News", icon: <BiNews /> },
    { title: "Vote", icon: <BiBox /> },
  ];

  const renderedSideBarItems: ReactNode[] = sideBarItemsList.map(
    (item, index) => (
      <li
        key={index}
        className="flex items-center py-2 text-gray-100 transition-all rounded-l hover:bg-gray-300 hover:bg-opacity-30 gap-3 hover:cursor-pointer px-3 hover:scale-101 duration-100 text-lg"
      >
        {item.icon}
        {item.title}
      </li>
    )
  );

  return (
    <div className="bg-gray-900 col-span-1 h-screen hidden md:flex flex-col items-end justify-end mt-14">
      <div className="flex justify-between items-start left-0 top-5 flex-col h-screen">
        <div className="flex justify-start flex-col">
          {renderedSideBarItems}
        </div>
      </div>
      <p className="text-gray-700 w-full p-2 text-xs">Project by @iam_p2</p>
    </div>
  );
};

export default Sidebar;
