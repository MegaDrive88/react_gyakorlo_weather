import type WeatherCardData from "./weather.card.data.interface";

export default interface CurrentWeather {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    temperature_2m: string;
    weather_code: string;
    is_day: string;
  };
  current: WeatherCardData;
}