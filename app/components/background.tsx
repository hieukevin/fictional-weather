import React from "react";

type Props = {
  imageURL: string;
  mobileImageURL: string;
  children?: React.ReactNode;
};

const Background = ({ imageURL, mobileImageURL, children }: Props) => {
  return (
    <video
      autoPlay
      muted
      loop
      src={imageURL}
      className="fixed min-w-full min-h-full object-cover -z-10"
    >
      {children}
    </video>
  );
};

export default Background;
