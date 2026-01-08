export default interface DailyWeather {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: {
    time: string;
    weather_code: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    wind_direction_10m_dominant: string;
    sunrise: string;
    sunset: string;
    wind_speed_10m_mean: string;
    relative_humidity_2m_mean: string;
    rain_sum: string;
    snowfall_sum: string;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    wind_direction_10m_dominant: number[];
    sunrise: string[];
    sunset: string[];
    wind_speed_10m_mean: number[];
    relative_humidity_2m_mean: number[];
    rain_sum: number[];
    snowfall_sum: number[];
  };
}