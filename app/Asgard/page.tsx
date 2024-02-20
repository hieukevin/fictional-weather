'use client'
import Background from '@/components/background'
import PageLayout from '@/components/weatherLayout'
import { asgardWeather } from '@/public/weatherData/asgardWeather'
import { useEffect, useState } from 'react'
import night from '../../public/backgrounds/asgard/night.png'
import rain from '../../public/backgrounds/asgard/rain.png'
import snow from '../../public/backgrounds/asgard/snow.png'
import sunny from '../../public/backgrounds/asgard/sunny.png'
import { changeImageURL } from '../../utils/background'
import { filterNextSevenDaysAndCurrentHour } from '../../utils/forecast'

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