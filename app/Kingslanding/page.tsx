import React from 'react'
import { kingslandingWeather } from '@/public/weatherData/kingslandingWeather'
import PageLayout from '@/components/weatherLayout'

function Page() {
  return (
    <div>
        <PageLayout place="King's Landing" world="Westeros" weatherReport={kingslandingWeather} />
    </div>
  )
}

export default Page