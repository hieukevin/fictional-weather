import React from "react";
import { data } from "@/app/weather_data/weatherData";
import DayForecast from "@/app/components/weather/week/dayForecast";
//TODO: dynamic icon
const WeekForecast = () => {
  const weekForecast = data.forecast.forecastday;
  return (
    <div className={`box h-full`}>
      <p className="font-thin text-center py-2 md:py-5 lg:py-6">
        7-day forecast
      </p>
      <div className={`h-full flex flex-col justify-between`}>
        {weekForecast.map((item) => (
          <DayForecast
            key={item.date}
            date={item.date}
            condition={item.day.condition.text}
            max_temperature={item.day.maxtemp_c}
            min_temperature={item.day.mintemp_c}
          />
        ))}
      </div>
    </div>
  );
};

export default WeekForecast;
