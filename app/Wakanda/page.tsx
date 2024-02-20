'use client'
import React, { useEffect, useState } from 'react'
import sunny from '../../public/backgrounds/wakanda/sunny.png'
import night from '../../public/backgrounds/wakanda/night.png'
import sunset from '../../public/backgrounds/wakanda/sunset.png'
import sunrise from '../../public/backgrounds/wakanda/sunrise.png'
import { wakandaWeather } from '@/public/weatherData/wakandaWeather';
import { filterNextSevenDaysAndCurrentHour } from '../forecast';
import { changeImageURL } from '../background';
import Background from '@/components/background'
import PageLayout from '@/components/weatherLayout'


function Page() {
  const {currentHourData} = filterNextSevenDaysAndCurrentHour(wakandaWeather);
  
  const [imageURL, setImageURL] = useState(sunny);
  useEffect(() => {
    changeImageURL(wakandaWeather, currentHourData, setImageURL, sunny, night, sunrise, sunset, {});

  },[currentHourData])
  return (
    <div>
        <Background imageURL={imageURL}  alt="Wakanda golden city"/>
        <PageLayout place="Wakanda" world="Marvel" weatherReport={wakandaWeather}/>
    </div>
  )
}

export default Page