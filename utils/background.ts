import { StaticImageData } from "next/image";
import { HourlyData, PartOfDay, WeatherItem } from "../app/Type";

const convert12hTo24h = (time12h: string): string => {
  const [time, period] = time12h.split(" ");
  const [hours, minutes] = time.split(":");

  let hours24 = parseInt(hours, 10);
  if (period === "PM" && hours24 !== 12) {
    hours24 += 12;
  } else if (period === "AM" && hours24 === 12) {
    hours24 = 0;
  }

  return `${hours24.toString().padStart(2, "0")}:${minutes}`;
};

const checkPartofDay = (data: WeatherItem): PartOfDay => {
  const currentHour = new Date().getHours();
  const sunriseHour = Number(convert12hTo24h(data.astro.sunrise).split(":")[0]);
  const sunsetHour = Number(convert12hTo24h(data.astro.sunset).split(":")[0]);

  if (currentHour > sunriseHour && currentHour < sunsetHour) {
    return PartOfDay.DAY;
  } else if (currentHour == sunriseHour - 1 || currentHour == sunsetHour) {
    return PartOfDay.SUNRISE;
  } else if (currentHour == sunriseHour || currentHour == sunsetHour + 1) {
    return PartOfDay.SUNSET;
  } else {
    return PartOfDay.NIGHT;
  }
};
// TODO: thunder img (1087, 1276 , 1279 , 1282)
export const changeImageURL = async (
  data: WeatherItem[],
  currentHourData: HourlyData,
  setImageURL: React.Dispatch<React.SetStateAction<StaticImageData>>,
  sunny: StaticImageData,
  night: StaticImageData,
  sunrise: StaticImageData,
  sunset: StaticImageData,
{ cloudy, rain, snow }: { cloudy?: StaticImageData, rain?: StaticImageData, snow?: StaticImageData }
) => {
  const currentPartOfDay = checkPartofDay(data[0]);

  switch (currentPartOfDay) {
    case PartOfDay.NIGHT:
      setImageURL(night);
      break;
    case PartOfDay.SUNRISE:
      setImageURL(sunrise);
      break;
    case PartOfDay.SUNSET:
      setImageURL(sunset);
      break;
    case PartOfDay.DAY:
      switch (currentHourData.condition.code) {
        case 1003 || 1006 || 1009 || 1030 || 1135 || 1147:
          setImageURL(cloudy || sunny);
          break;

        case 1063 ||
          1087 ||
          1150 ||
          1153 ||
          1180 ||
          1183 ||
          1186 ||
          1189 ||
          1192 ||
          1195 ||
          1198 ||
          1201 ||
          1240 ||
          1243 ||
          1246 ||
          1249 ||
          1273 ||
          1276 ||
          1279 ||
          1282:
          setImageURL(rain || sunny);
          break;
        case 1066 ||
          1069 ||
          1072 ||
          1114 ||
          1117 ||
          1168 ||
          1171 ||
          1204 ||
          1207 ||
          1210 ||
          1213 ||
          1216 ||
          1219 ||
          1222 ||
          1225 ||
          1237 ||
          1249 ||
          1252 ||
          1255 ||
          1258 ||
          1261 ||
          1264:
          setImageURL(snow || sunny);
          break;
        default:
          setImageURL(sunny);
          break;
      }

      break;
    default:
      setImageURL(sunny);
      break;
  }
};
