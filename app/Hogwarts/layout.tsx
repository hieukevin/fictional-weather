'use client'
import React, {useEffect, useState} from "react";
import sunny from "@/public/backgrounds/hogwarts/sunny.png";
import night from "@/public/backgrounds/hogwarts/night.jpeg";
import sunset from "@/public/backgrounds/hogwarts/sunset.png";
import rain from "@/public/backgrounds/hogwarts/rain.png";
import snow from "@/public/backgrounds/hogwarts/snow.png";
import cloudy from "@/public/backgrounds/hogwarts/cloudy.png";
import { hogwartsWeather } from "@/public/weatherData/hogwartsWeather";
import { filterNextSevenDaysAndCurrentHour } from "../forecast";
import { changeImageURL } from "../background";
import Background from "@/components/background";


const Layout = ({ children }: { children: React.ReactNode }) => {

  const {currentHourData} = filterNextSevenDaysAndCurrentHour(hogwartsWeather);
  
  const [imageURL, setImageURL] = useState(sunny);
  useEffect(() => {
    changeImageURL(hogwartsWeather, currentHourData, setImageURL, sunny, night, sunny, sunset, {rain, snow, cloudy});

  },[currentHourData])
  return (
    
    <div>
      <Background imageURL={imageURL}  alt="Hogwarts School"/>
      {children} 
    </div>
  );
};

export default Layout;
