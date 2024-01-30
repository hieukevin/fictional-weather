import React from "react";
import Image, { StaticImageData } from "next/image";

type Props = {
  imageURL: StaticImageData;
  alt: string;
};

const Background = ({ imageURL,alt }: Props) => {
  return (
    <Image 
      src={imageURL}
      fill
      alt={alt}
      placeholder='blur'
      blurDataURL={imageURL.blurDataURL}
      sizes="100vw"
      className="backgroundImg" />
        
    
  );
};

export default Background;
