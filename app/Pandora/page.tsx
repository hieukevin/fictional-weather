'use client'
import React, { useEffect, useState } from 'react'
import Background from '../../components/background';
import PageLayout from '../../components/weatherLayout';
import sunny from '../../public/backgrounds/avatar/sunny.png'
import night from '../../public/backgrounds/avatar/night.png'
import { avatarWeather } from '@/public/weatherData/avatarWeather';
import { filterNextSevenDaysAndCurrentHour } from '../forecast';
import { changeImageURL } from '../background';

function Page() {
  const {currentHourData} = filterNextSevenDaysAndCurrentHour(avatarWeather);
  
  const [imageURL, setImageURL] = useState(sunny);
  useEffect(() => {
    changeImageURL(avatarWeather, currentHourData, setImageURL, sunny, night, sunny, night, {});

  },[currentHourData])
  return (
    <div>
        <Background imageURL={imageURL} alt="Pandora"/>
        <PageLayout place="Pandora" world="Avatar" weatherReport={avatarWeather}/>
    </div>
  )
}

export default Page