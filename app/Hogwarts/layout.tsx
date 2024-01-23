import React from "react";
import Background from "@/app/components/background";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Background imageURL="video/hogwarts_sunny.mp4" />
      {children}
    </div>
  );
};

export default Layout;
