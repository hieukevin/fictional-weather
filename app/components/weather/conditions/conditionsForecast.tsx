import React from "react";
import { data } from "@/app/weather_data/weatherData";
const ConditionsForecast = () => {
  return (
    <div className="box h-full">
      <p className="font-thin">Conditions Forecast</p>

      <p>uv: {data.current.uv}</p>
      <p>
        wind: {data.current.wind_kph} {data.current.wind_dir}
      </p>
      <p>humidity: {data.current.humidity}</p>
      <p>feels like: {data.current.feelslike_c}</p>
      <p>visibility: {data.current.vis_km}</p>
      <p>sunrise: {data.forecast.forecastday[0].astro.sunrise}</p>
      <p>sunset: {data.forecast.forecastday[0].astro.sunset}</p>
    </div>
  );
};

export default ConditionsForecast;
