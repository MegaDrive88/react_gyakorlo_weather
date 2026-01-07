export default interface DailyWeahterCardData{
    time: string;
    weather_code: number;
    temperature_2m_max: number;
    temperature_2m_min: number;
    wind_direction_10m_dominant: number;
    sunrise: string;
    sunset: string;
    wind_speed_10m_mean: number;
    relative_humidity_2m_mean: number
}