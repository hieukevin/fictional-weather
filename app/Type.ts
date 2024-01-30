export type Condition = {
    text: string;
    icon: string;
    code: number;
  };
  
  export type Day = {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    avgvis_km: number;
    avgvis_miles: number;
    daily_chance_of_rain: number;
    condition: Condition;
  };
  
  export type Astro = {
    sunrise: string;
    sunset: string;
  };
  
  export type HourlyData = {
    time: string;
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      code: number;
    }; 
  };
  
  export type WeatherItem = {
    date: string;
    day: Day;
    astro: Astro;
    hour: HourlyData[];
  };

  export enum PartOfDay {
    SUNRISE,
    DAY,
    SUNSET,
    NIGHT,
  }
  