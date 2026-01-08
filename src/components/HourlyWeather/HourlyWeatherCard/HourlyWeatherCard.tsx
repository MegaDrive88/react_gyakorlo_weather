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
    }, [props.data])
    return (
        <>
        <tr className={`weatherBox ${props.data.is_day == 1 ? "lightBG" : "darkBG"}`}>
            <td><img className='smallIcon' src={iconData?.image} alt="" /></td>
            <td><h6>{props.data.time.replaceAll('-', '.').replace('T', ' ').split('.').splice(1).join('.')}</h6></td>
            <td><h6>
                <img className='inlineImage' src={props.data.is_day ? "wind_arrow.png" : "wind_arrow_night.png"} alt="" style={{rotate: `${props.data.wind_direction_10m! + 180}deg`}} /> {props.data.wind_speed_10m} km/h
            </h6></td>
            <td><h6>
                <img className='inlineImage' src={props.data.is_day ? "humidity.png" : "humidity_night.png"} alt="" /> {props.data.relative_humidity_2m}%
            </h6></td>
            <td><h6 style={{textAlign: "center"}}>
                <img className='inlineImage' src={props.data.snowfall != 0 ? 
                    (props.data.is_day != 0 ? "snow.png" : "snow_night.png") : 
                    (props.data.is_day != 0 ? "rain.png" : "rain_night.png")
                } alt="" /> {props.data.snowfall != 0 ? props.data.snowfall : props.data.rain} {props.data.snowfall != 0 ? "cm" : "mm"}
            </h6></td>
            <td><h6 className='alignRight'>{props.data.temperature_2m} {props.unit}</h6></td>
        </tr>
        </>
    )
}