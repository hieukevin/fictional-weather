import React from "react";
import { data } from "@/app/weather_data/weatherData";
import ItemCondition from "@/app/components/weather/conditions/itemCondition";
const ConditionsForecast = () => {
  return (
    <div className="box h-full ">
      <p className="font-thin text-center">Conditions Forecast</p>
      <div className={`h-full grid grid-cols-3`}>
        <ItemCondition title="uv" data={data.current.uv.toString()} />
        <ItemCondition
          title={`wind`}
          data={data.current.wind_kph.toString() + data.current.wind_dir}
        />

        <ItemCondition
          title={`Feels like`}
          data={data.current.feelslike_c.toString()}
        />
        <ItemCondition
          title={`Visibility`}
          data={data.current.vis_km.toString()}
        />
        <ItemCondition
          title={`Sunrise`}
          data={data.forecast.forecastday[0].astro.sunrise}
        />
        <ItemCondition
          title={`Sunset`}
          data={data.forecast.forecastday[0].astro.sunset}
        />
      </div>
    </div>
  );
};

export default ConditionsForecast;
