import React, { Component, FC } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-screen dark:bg-[#222831] bg-[#EEEEEE] flex flex-col overflow-auto ">
      <Navbar />
      <div className="h-full w-full  overflow-auto">
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
