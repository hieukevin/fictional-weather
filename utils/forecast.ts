import { HourlyData, WeatherItem } from "../app/Type";

const today = new Date();

export const formattedTodayDate = today
  .toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
  .replace(/,/g, "");


  export  const filterNextSevenDaysAndCurrentHour =  (data: WeatherItem[]): {
    nextSevenDays: WeatherItem[];
    currentHourData: HourlyData ; 
  } => {
    const nextSevenDays = data.filter((item) => {
      const itemDate = new Date(item.date);
      const todayWithoutYear = new Date(today).setFullYear(itemDate.getFullYear());
  
      return (
        new Date(new Date(todayWithoutYear).setHours(0, 0, 0, 0)) <= itemDate &&
        itemDate <= new Date(todayWithoutYear + 6 * 24 * 60 * 60 * 1000)
      );
    });
  
    const currentHour = today.getHours();
    const currentHourData = nextSevenDays[0].hour.filter((item) => new Date(item.time).getHours() === currentHour)[0]
  
    return {
      nextSevenDays,
      currentHourData,
    };
  };
  
  