'use client'
import React, { useEffect, useState } from 'react'
import Background from '../components/background';
import PageLayout from '../components/weatherLazout';
import sunny from '../../public/backgrounds/asgard/sunny.webp'
import night from '../../public/backgrounds/asgard/night.png'
import rain from '../../public/backgrounds/asgard/rain.png'
import snow from '../../public/backgrounds/asgard/snowing.png'
import { asgardWeather } from '@/public/weatherData/asgardWeather';
import { filterNextSevenDaysAndCurrentHour } from '../forecast';
import { changeImageURL } from '../background';

function Page() {
  const {currentHourData} = filterNextSevenDaysAndCurrentHour(asgardWeather);
  
  const [imageURL, setImageURL] = useState(sunny);
  useEffect(() => {
    changeImageURL(asgardWeather, currentHourData, setImageURL, sunny, night, sunny, night, {rain, snow});

  },[currentHourData])
  return (
    <div>
        <Background imageURL={imageURL} alt="Asgard"/>
        <PageLayout place="Asgard" world="Marvel" weatherReport={asgardWeather}/>
    </div>
  )
}

export default Page