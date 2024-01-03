import React from "react";
import { WiDaySunny } from "react-icons/wi";

type Props = {
  time: string;
  temperature: number;
};

const HourForecast = ({ time, temperature }: Props) => {
  const formatedtime = time.split(" ");
  const hour = formatedtime[1].split(":")[0];
  let currentHour = new Date().getHours().toString();
  if (currentHour.length === 1) {
    currentHour = "0" + currentHour; // Add leading zero for single-digit hours
  }

  // Handle 12 as a special case
  if (currentHour === "12" && hour !== "12") {
    currentHour = "00"; // Convert 12 to 00 in 24-hour format
  }

  // TODO: make icon dynamic
  return (
    <div className="flex flex-col items-center px-4 border-r-[1px] border-gray-500">
      <p className="md:text-xl">{currentHour == hour ? "now" : hour}</p>
      <WiDaySunny className="hidden md:flex" size={32} />

      <WiDaySunny className={`md:hidden`} size={24} />
      <p>{temperature}</p>
    </div>
  );
};

export default HourForecast;
