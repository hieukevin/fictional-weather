import React from "react";
import { data } from "../weather_data/weatherData";
import { DayForecast } from "./dayForecast";

const Page = () => {
  const weekForecast = data.forecast.forecastday;

  const d = new Date();

  return (
    <div className={`min-h-screen min-w-full flex flex-col`}>
      <div className="grid grid-cols-7 overflow-y-auto flex-grow">
        {weekForecast.map((item) => (
          <DayForecast
            key={item.date}
            date={item.date}
            temp={item.day.maxtemp_c}
            condition={item.day.condition.text}
          />
        ))}
      </div>

      <footer className="bg-black bg-opacity-50 p-6">
        <div className="flex justify-between items-center text-white">
          <div>
            <h2 className="text-6xl font-bold">Hobbiton</h2>
            <p className="text-2xl">The Shire</p>
          </div>
          <div className="text-right">
            <p className="text-6xl font-bold">30°C</p>
            <p className="text-xl">REAL FEEL</p>
            <p className="text-6xl font-bold">33%</p>
            <p className="text-xl">HUMIDITY</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="text-white text-xl">TIME</p>
            <p className="text-white text-xl">MARCH 17 2018</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
