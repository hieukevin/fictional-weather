import React from "react";
import { data } from "@/app/weather_data/weatherData";
import HourForecast from "@/app/components/weather/today/hourForecast";

const TodayForecast = () => {
  const todaysForecast = data.forecast.forecastday[0].hour;

  return (
    <div className={`box h-full`}>
      <p className=" font-thin pl-4 md:pl-6 pt-2 md:pt-4">Today's forecast</p>
      <div className="overflow-x-auto  p-2 md:p-6">
        <div className="flex flex-row">
          {todaysForecast.map((item, index) => (
            <HourForecast
              key={item.time}
              time={item.time}
              temperature={item.temp_c}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodayForecast;
