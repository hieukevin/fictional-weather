'use client'
import React, {useState} from "react";
import Background from "@/app/components/background";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [imageURL, setImageURL] = useState("video/hobbiton_sunny.mp4");

  const changeImageURL = (newURL: string) => {
    setImageURL(newURL);
  };
  
  return (
    <div>
      <Background imageURL="video/hobbiton_sunny.mp4" />
      {/* {children}
       */}
       {React.Children.map(children, child =>
        React.cloneElement(child as React.ReactElement, { changeImageURL })
      )}
    </div>
  );
};

export default Layout;
