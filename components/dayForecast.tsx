"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Condition } from "../app/Type";

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
      <div>

        <div className="lg:text-2xl md:text-xl text-lg md:pt-8 pl-2 pt-4 overflow-hidden">{dayName}</div>
        {conditions && (
          <div className="text-slate-200 pl-2">{date}</div>
        )}
      </div>
      {conditions && (
        <div className="flex md:flex-col flex-row justify-center lg:text-2xl md:text-xl text-lg self-center pt-4 items-center">
            
            {/* <div className="hidden md:block">{condition.text}</div> */}
            <Image
              src={`https:${condition.icon}`}
              alt="Weather Image"
              width={64}
              height={64}
            />
          <div>
              <span className=" text-blue-400">{minTemp}°</span> / <span>{maxTemp}°</span>
          </div>
        </div>
      )}
    </div>
  );
};
