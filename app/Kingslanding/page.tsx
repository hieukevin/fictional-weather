import React from 'react'
import PageLayout from '../components/weatherLazout'
import { kingslandingWeather } from '@/public/weatherData/kingslandingWeather'

function Page() {
  return (
    <div>
        <PageLayout place="King's Landing" world="Westeros" weatherReport={kingslandingWeather} />
    </div>
  )
}

export default Page