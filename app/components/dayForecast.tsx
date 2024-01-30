"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Condition } from "../Type";

export const DayForecast = ({
  date,
  temp,
  condition,
  maxTemp,
  minTemp,
}: {
  date: string;
  temp: number;
  condition: Condition;
  maxTemp: number;
  minTemp: number;
}) => {
  const d = new Date(date);
  const dayName = d.toDateString() === new Date().toDateString() ? "Today" : d.toLocaleDateString("en-US", { weekday: "long" });
  const [conditions, setConditions] = useState(false);

  return (
    <div
      className="hover:bg-black/10 flex md:flex-col flex-row md:justify-normal justify-between select-none"
      onClick={() => setConditions(!conditions)}
    >
      <div className="md:text-2xl text-lg md:pt-8 pt-4 pl-2">{dayName}</div>
      {conditions && (
        <div>{date}</div>
      )}
      <div className="md:text-5xl text-xl self-center pt-4">{temp}°C</div>
      {conditions && (
        <div className="flex flex-col justify-center">
          <div className="md:text-2xl text-lg self-center pt-4">
            {condition.text}
          </div>
          <div className="md:text-2xl text-lg self-center pt-4">
            <Image
              src={`https:${condition.icon}`}
              alt="Weather Image"
              width={64}
              height={64}
            />
          </div>
          <div>
            <div className="md:text-2xl text-lg text-center pt-4">
              {minTemp}° / {maxTemp}°
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
