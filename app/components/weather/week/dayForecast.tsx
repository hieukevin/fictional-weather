import React from "react";
import { WiDaySunny } from "react-icons/wi";

type Props = {
  date: string;
  condition: string;
  max_temperature: number;
  min_temperature: number;
};

const isToday = new Date();

const DayForecast = ({
  date,
  condition,
  max_temperature,
  min_temperature,
}: Props) => {
  const d = new Date(date);
  const dayName = d.toString().split(" ")[0];

  return (
    <div className="flex flex-row items-center justify-between text-center gap-3">
      <p className={`flex-1`}>{dayName}</p>
      <div className="flex-shrink">
        <WiDaySunny className="hidden md:block" size={42} />
        <WiDaySunny className="md:hidden" size={24} />
      </div>
      <p className="flex-[2] font-thin flex justify-start">{condition}</p>
      <div className="flex-1 flex flex-row justify-evenly">
        <p>{Math.round(max_temperature)} </p>
        <p>/</p>
        <p className={`font-thin`}>{Math.round(min_temperature)}</p>
      </div>
    </div>
  );
};

export default DayForecast;
