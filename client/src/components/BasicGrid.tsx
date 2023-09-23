import { ReactNode } from "react";
import { contentSectionInterface } from "../interfaces/content-section-interface";
import Sidebar from "./Sidebar";
import DynamicSection from "./DynamicSection";

const BasicGrid = ({ type }: contentSectionInterface): ReactNode => {
  return (
    <div className="grid grid-cols-6 col-span-6 md:col-span-5 h-screen mt-10">
      <div className="col-span-6 md:col-span-5">
        <DynamicSection type="feed" />
      </div>
      <div className="">
        <DynamicSection type="config" />
      </div>
    </div>
  );
};

export default BasicGrid;
