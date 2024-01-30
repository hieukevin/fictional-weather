'use client'
import React, { useEffect, useState } from 'react'
import Background from '../components/background'
import sunny from '../../public/backgrounds/got/sunny.png'
import night from '../../public/backgrounds/got/night.png'
import sunset from '../../public/backgrounds/got/sunset.png'
import rain from '../../public/backgrounds/got/rain.png'
import cloudy from '../../public/backgrounds/got/cloudy.png'
import { filterNextSevenDaysAndCurrentHour } from '../forecast';
import { kingslandingWeather } from '@/public/weatherData/kingslandingWeather';
import { changeImageURL } from '../background';

function Layout({children}: {children: React.ReactNode}) {
  const {currentHourData} = filterNextSevenDaysAndCurrentHour(kingslandingWeather);
  
  const [imageURL, setImageURL] = useState(sunny);
  useEffect(() => {
    changeImageURL(kingslandingWeather, currentHourData, setImageURL, sunny, night, sunny, sunset, {rain, cloudy});

  },[currentHourData])
  return (
    <div>
        <Background imageURL={imageURL}  alt="Hogwarts School"/>
      {children} 
    </div>
  )
}

export default Layout