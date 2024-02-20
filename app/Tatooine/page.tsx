'use client'
import React, { useEffect, useState } from 'react'
import sunny from '../../public/backgrounds/tatooine/sunny.png'
import night from '../../public/backgrounds/tatooine/night.png'
import sunset from '../../public/backgrounds/tatooine/sunset.png'
import sunrise from '../../public/backgrounds/tatooine/sunrise.png'
import { tatooineWeather } from '@/public/weatherData/tatooineWeather';
import { filterNextSevenDaysAndCurrentHour } from '../../utils/forecast';
import { changeImageURL } from '../../utils/background';
import Background from '@/components/background'
import PageLayout from '@/components/weatherLayout'

function Page() {
  const {currentHourData} = filterNextSevenDaysAndCurrentHour(tatooineWeather);
  
  const [imageURL, setImageURL] = useState(sunny);
  useEffect(() => {
    changeImageURL(tatooineWeather, currentHourData, setImageURL, sunny, night, sunrise, sunset, {});

  },[currentHourData])
  return (
    <div>
        <Background imageURL={imageURL} alt="Tatooine"/>
        <PageLayout place="Tatooine" world="Star Wars" weatherReport={tatooineWeather}/>
    </div>
  )
}

export default Page