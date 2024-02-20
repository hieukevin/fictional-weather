import React from "react";
import { hogwartsWeather } from "@/public/weatherData/hogwartsWeather";
import PageLayout from "../../components/weatherLayout";

const Page = () => {

  return (
    <PageLayout place="Hogwarts" world="Harry Potter" weatherReport={hogwartsWeather} />
  );
};

export default Page;
