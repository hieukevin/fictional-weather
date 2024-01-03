import Image from "next/image";
import React from "react";
import Background from "@/app/components/background";
import { motion } from "framer-motion";
import CurrentForecast from "@/app/components/weather/current/currentForecast";
import { data } from "@/app/weather_data/weatherData";
import TodayForecast from "@/app/components/weather/today/todayForecast";
import ConditionsForecast from "@/app/components/weather/conditions/conditionsForecast";
import WeekForecast from "@/app/components/weather/week/weekForecast";
import Sidebar from "@/app/components/sidebar/sidebar";

export default function Home() {
  return (
    <main className="min-h-screen min-w-full grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-10 z-10 p-5">
      <div className={`box md:col-start-3 md:col-end-9 row-start-1`}>
        <p className="font-extrabold text-2xl lg:text-4xl md:text-3xl text-center md:p-4">
          Hogwart's School
        </p>
        <div className="md:col-start-6 md:col-end-9 md:row-start-1">
          <CurrentForecast
            temp={data.current.temp_c}
            chanceOfRain={data.forecast.forecastday[0].day.daily_chance_of_rain}
            todayHigh={data.forecast.forecastday[0].day.maxtemp_c}
            todayLow={data.forecast.forecastday[0].day.mintemp_c}
          />
        </div>
      </div>
      <div
        className={`md:col-start-1 md:row-start-1 md:col-span-2 md:row-span-4 hidden md:block`}
      >
        <Sidebar />
      </div>

      <div className="md:col-start-3 md:col-end-9 md:row-start-2 md:row-span-1">
        <TodayForecast />
      </div>
      <div className="md:col-start-3 md:col-end-9  md:row-start-3 md:row-span-2  ">
        <ConditionsForecast />
      </div>

      <div className="md:col-start-9 md:col-span-full md:row-start-1 md:row-end-5">
        <WeekForecast />
      </div>
    </main>
  );
}
