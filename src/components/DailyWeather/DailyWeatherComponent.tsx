
import { useEffect, useState } from 'react';
import type DailyWeather from '../../interfaces/daily.weather.interface'
import './DailyWeatherComponent.css'
import DailyWeatherCard from './DailyWeatherCard/DailyWeatherCard';

export default function DailyWeatherComponent(props: {dailyWeather: DailyWeather|undefined, unit:string|undefined}){
    const dailyWeather = props.dailyWeather
    const [dailyCards, setDailyCards] = useState<React.JSX.Element[]>([]);
    useEffect(()=>{
        let tempCards:React.JSX.Element[] = []
        if(dailyWeather)
        for (let i = 0; i < dailyWeather?.daily.temperature_2m_min.length; i++) {
            tempCards.push(<DailyWeatherCard data={{time: dailyWeather.daily.time[i],
                                                        temperature_2m_min: dailyWeather.daily.temperature_2m_min[i],
                                                        temperature_2m_max: dailyWeather.daily.temperature_2m_max[i],
                                                        weather_code: dailyWeather.daily.weather_code[i],
                                                        wind_direction_10m_dominant: dailyWeather.daily.wind_direction_10m_dominant[i],
                                                        sunrise: dailyWeather.daily.sunrise[i],
                                                        sunset: dailyWeather.daily.sunset[i],
                                                        wind_speed_10m_mean: dailyWeather.daily.wind_speed_10m_mean[i],
                                                        relative_humidity_2m_mean: dailyWeather.daily.relative_humidity_2m_mean[i],
                                                        rain_sum: dailyWeather.daily.rain_sum[i],
                                                        snowfall_sum: dailyWeather.daily.snowfall_sum[i],
                                                   }}
                                                unit={dailyWeather.daily_units.temperature_2m_min} key={i}/>)
        }
        setDailyCards(tempCards)
    }, [dailyWeather])
    return (
        <>
        {dailyCards}
        </>
    )
}