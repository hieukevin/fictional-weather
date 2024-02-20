'use client'
import React, { useEffect, useState } from 'react'

import { gothamWeather } from '@/public/weatherData/gothamWeather';
import sunny from '../../public/backgrounds/gotham/sunny.png'
import night from '../../public/backgrounds/gotham/night.png'
import sunset from '../../public/backgrounds/gotham/sunset.png'
import rain from '../../public/backgrounds/gotham/rain.png'
import sunrise from '../../public/backgrounds/gotham/sunrise.png'
import { filterNextSevenDaysAndCurrentHour } from '../forecast';
import { changeImageURL } from '../background';
import Background from '@/components/background';
import PageLayout from '@/components/weatherLayout';

function Page() {
  const {currentHourData} = filterNextSevenDaysAndCurrentHour(gothamWeather);
  
  const [imageURL, setImageURL] = useState(sunny);
  useEffect(() => {
    changeImageURL(gothamWeather, currentHourData, setImageURL, sunny, night, sunrise, sunset, {rain});

  },[currentHourData])
  return (
    <div>
        <Background imageURL={imageURL} alt="Hogwarts School"/>
        <PageLayout place="Gotham City" world="DC world" weatherReport={gothamWeather}/>
    </div>
  )
}

export default Page