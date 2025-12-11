import '../../HourlyWeather/HourlyWeatherComponent.css'
import type WeatherCardData from '../../../interfaces/weather.card.data.interface'
import { useEffect, useState } from 'react'
import DataService from '../../../data.service'

export default function HourlyWeatherCard(props: WeatherCardData){
    const [iconData, setIconData] = useState<{image:string}>()
    const dataService = new DataService()
    useEffect(()=>{
        dataService.getWeatherIconSource(props.weather_code, props.is_day).then(
            res => setIconData(res)
        )
    }, [])
    return (
        <>
        <div className={`weatherBox weatherCard ${props.is_day == 1 ? "lightBG" : "darkBG"}`}>
            <img className='smallIcon' src={iconData?.image} alt="" />
            <h6>{props.time.split("T")[1]}</h6>
            <h6 className='alignRight'>{props.temperature_2m}</h6>
        </div>
        </>
    )
}