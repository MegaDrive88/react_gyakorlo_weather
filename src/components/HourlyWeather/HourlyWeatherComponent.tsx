import { useEffect, useState } from 'react'
import type HourlyWeather from '../../interfaces/hourly.weather.interface'
import './HourlyWeatherComponent.css'
import HourlyWeatherCard from './HourlyWeatherCard/HourlyWeatherCard';

export default function HourlyWeatherComponent(props: {hourlyWeather: HourlyWeather|undefined}){
    const hourlyWeather = props.hourlyWeather
    const [hourlyCards, setHourlyCards] = useState<React.JSX.Element[]>([]);
    useEffect(()=>{
        let tempCards:React.JSX.Element[] = []
        if(hourlyWeather)
        for (let i = 0; i < hourlyWeather?.hourly.temperature_2m.length; i++) {
            tempCards.push(<HourlyWeatherCard time={hourlyWeather.hourly.time[i]}
                                              temperature_2m={hourlyWeather.hourly.temperature_2m[i]}
                                              weather_code={hourlyWeather.hourly.weather_code[i]}
                                              is_day={hourlyWeather.hourly.is_day[i]}/>)
        }
        setHourlyCards(tempCards)
        
    }, [hourlyWeather])
    return (
        <>
            <div className="col-md-6" id='hourlyScrollDiv'>
                {hourlyCards}
            </div>
        </>
    )
}