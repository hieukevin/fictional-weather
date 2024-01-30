'use client'
import React, { useEffect, useState } from 'react'
import Background from '../components/background';
import PageLayout from '../components/weatherLazout';
import sunny from '../../public/backgrounds/frozen/sunny.png'
import night from '../../public/backgrounds/frozen/night.png'
import sunset from '../../public/backgrounds/frozen/sunset.png'
import { frozenWeather } from '@/public/weatherData/frozenWeather';
import { filterNextSevenDaysAndCurrentHour } from '../forecast';
import { changeImageURL } from '../background';

function Page() {
  const {currentHourData} = filterNextSevenDaysAndCurrentHour(frozenWeather);
  
  const [imageURL, setImageURL] = useState(sunny);
  useEffect(() => {
    changeImageURL(frozenWeather, currentHourData, setImageURL, sunny, night, sunny, sunset, {});

  },[currentHourData])
  return (
    <div>
        <Background imageURL={imageURL} alt="Arendelle"/>
        <PageLayout place="Arendelle" world="Frozen" weatherReport={frozenWeather}/>
    </div>
  )
}

export default Page