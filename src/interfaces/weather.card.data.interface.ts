export default interface WeatherCardData{
    time: string;
    temperature_2m: number;
    weather_code: number
    is_day: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    rain: number;
    snowfall: number;
}