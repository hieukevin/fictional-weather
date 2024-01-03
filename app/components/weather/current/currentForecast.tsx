import React from "react";

type Props = {
  temp: number;
  chanceOfRain: number;
  todayHigh: number;
  todayLow: number;
};

const CurrentForecast = ({
  temp,
  chanceOfRain,
  todayLow,
  todayHigh,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center md:p-2">
      <p className="font-bold text-2xl md:text-4xl">{temp}&deg;</p>
      <p className="font-thin">Chance of Rain: {chanceOfRain} %</p>
      <div className="flex  flex-row">
        <p className="m-1 md:m-2 md:text-xl">High: {todayHigh}</p>
        <p className="m-1 md:m-2 md:text-xl">Low: {todayLow}</p>
      </div>
    </div>
  );
};

export default CurrentForecast;
