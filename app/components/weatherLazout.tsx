import React from 'react'
import { DayForecast } from './dayForecast'
import { filterNextSevenDaysAndCurrentHour, formattedTodayDate } from '../forecast';
import { WeatherItem } from '../Type';

function PageLayout({place, world, weatherReport} : {place: string, world: string, weatherReport: WeatherItem[]}) {

    const {nextSevenDays, currentHourData} = filterNextSevenDaysAndCurrentHour(weatherReport);
  
  return (
    <div className={`min-h-screen flex flex-col`}>
    <div className="grid md:grid-cols-7 md:grid-rows-1 flex-grow grid-rows-7">
      {nextSevenDays.map((item) => (
        <DayForecast
          key={item.date}
          date={item.date}
          temp={item.day.avgtemp_c}
          condition={item.day.condition}
          maxTemp={item.day.maxtemp_c}
          minTemp={item.day.mintemp_c}
        />
      ))}
    </div>
    <footer className="bg-black bg-opacity-50 p-6">
      <div className="flex justify-between items-center text-white">
        <div>
          <h2 className="md:text-6xl text-3xl font-bold">{place}</h2>
          <p className="md:text-2xl text-lg pt-4">{world}</p>
        </div>
        <div className="text-right">
          <p className="md:text-6xl text-3xl font-bold">
            {currentHourData.temp_c}°C
          </p>
          <p className="md:text-xl text-md">TEMPERATURE</p>
          <p className="md:text-6xl text-3xl font-bold mt-4">
            {nextSevenDays[0].day.daily_chance_of_rain}%
          </p>
          <p className="md:text-xl text-md">CHANCE OF RAIN</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-6">
        <div>
          <p className="text-white text-xl">{formattedTodayDate}</p>
        </div>
      </div>
    </footer>
  </div>
  )
}

export default PageLayout