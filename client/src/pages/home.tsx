import React from "react";
import BasicGrid from "../components/BasicGrid";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
const Home = () => {
  return (
    <div className="grid grid-cols-6 h-screen">
      <TopBar />
      <Sidebar />
      <BasicGrid type="sidebar" />
    </div>
  );
};

export default Home;
