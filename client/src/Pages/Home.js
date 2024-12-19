import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import Charts from "../components/Charts";

function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6 bg-gray-100 flex flex-col gap-6">
          <Widgets />
          <Charts />
        </div>
      </div>
    </div>
  );
}

export default Home;
