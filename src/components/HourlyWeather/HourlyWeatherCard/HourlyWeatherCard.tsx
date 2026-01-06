import '../../HourlyWeather/HourlyWeatherComponent.css'
import type WeatherCardData from '../../../interfaces/weather.card.data.interface'
import { useEffect, useState } from 'react'
import DataService from '../../../data.service'

export default function HourlyWeatherCard(props: {data: WeatherCardData, unit:string|undefined}){
    const [iconData, setIconData] = useState<{image:string}>()
    const dataService = new DataService()
    useEffect(()=>{
        dataService.getWeatherIconSource(props.data.weather_code, props.data.is_day).then(
            res => setIconData(res)
        )
    }, [])
    return (
        <>
        <div className={`weatherBox weatherCard ${props.data.is_day == 1 ? "lightBG" : "darkBG"}`}>
            <img className='smallIcon' src={iconData?.image} alt="" />
            <h6>{props.data.time.replaceAll('-', '.').replace('T', ' ').split('.').splice(1).join('.')}</h6>
            <h6 className='alignRight'>{props.data.temperature_2m} {props.unit}</h6>
        </div>
        </>
    )
}