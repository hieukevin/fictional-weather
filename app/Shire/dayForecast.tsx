import React from "react";

export const DayForecast = ({
  date,
  temp,
  condition,
}: {
  date: string;
  temp: number;
  condition: string;
}) => {
  const d = new Date(date);
  const dayName = d.toString().split(" ")[0];

  return (
    <div className="hover:bg-white/10">
      <div className="text-2xl">{dayName}</div>
      <div className="text-5xl">{temp}°C</div>
    </div>
  );
};
