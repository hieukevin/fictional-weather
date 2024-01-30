"use client";
import React, { useEffect, useState } from "react";
import sunny from "@/public/backgrounds/hobbiton/sunny.png";
import night from "@/public/backgrounds/hobbiton/night.png";
import sunset from "@/public/backgrounds/hobbiton/sunset.png";
import rain from "@/public/backgrounds/hobbiton/rain.png";
import cloudy from "@/public/backgrounds/hobbiton/cloudy.png";
import Background from "../components/background";
import { hobbitonWeather } from "@/public/weatherData/hobbitonWeather";
import { filterNextSevenDaysAndCurrentHour } from "../forecast";
import { changeImageURL } from "../background";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const {currentHourData} = filterNextSevenDaysAndCurrentHour(hobbitonWeather);
  
  const [imageURL, setImageURL] = useState(sunny);
  useEffect(() => {
    changeImageURL(hobbitonWeather, currentHourData, setImageURL, sunny, night, sunny, sunset, {rain, cloudy});

  },[currentHourData])

  return (
    <div>
      <Background imageURL={imageURL} alt="Hobbiton"/>

      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement, { changeImageURL })
      )}
    </div>
  );
};

export default Layout;
