import React from "react";
import { contentSectionInterface } from "../interfaces/content-section-interface";
import Sidebar from "./Sidebar";
import FeedList from "./FeedList";
import { postInterface } from "../interfaces/post-interface";
import OptionsSection from "./OptionsSection";

const DynamicSection = ({ type }: contentSectionInterface) => {
  const posts = [];

  const optionsList = [];

  const contentRenderer = () => {
    switch (type) {
      case "feed":
        return <FeedList postList={posts} />;
      case "config":
        return <OptionsSection options={optionsList} />;
    }
  };

  return (
    <div className="flex flex-col justify-between">{contentRenderer()}</div>
  );
};

export default DynamicSection;
