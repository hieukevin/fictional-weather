import React, { use, useEffect, useState } from "react";
import {DayForecast} from "@/app/components/dayForecast";
import { hobbitonWeather } from "@/public/weatherData/hobbitonWeather";
import PageLayout from "../components/weatherLazout";

const Page = async () => {

  return (
    <PageLayout place="Hobbiton" world="The Shire" weatherReport={hobbitonWeather} />
  );
};

export default Page;
