import { hobbitonWeather } from "@/public/weatherData/hobbitonWeather";
import PageLayout from "../../components/weatherLayout";

const Page = async () => {

  return (
    <PageLayout place="Hobbiton" world="The Shire" weatherReport={hobbitonWeather} />
  );
};

export default Page;
