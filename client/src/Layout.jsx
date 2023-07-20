import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="px-8 py-4 flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
