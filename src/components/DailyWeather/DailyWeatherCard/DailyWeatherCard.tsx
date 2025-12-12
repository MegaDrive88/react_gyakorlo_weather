import { useState, useEffect } from 'react'
import DataService from '../../../data.service'
import '../../DailyWeather/DailyWeatherComponent.css'
import type DailyWeahterCardData from '../../../interfaces/daily.weather.card.interface'


export default function DailyWeatherCard(props: {data: DailyWeahterCardData, unit:string|undefined}){
    const [iconData, setIconData] = useState<{image:string}>()
    const [dayName, setDayName] = useState<string>()
    const dataService = new DataService()
    useEffect(()=>{
        dataService.getWeatherIconSource(props.data.weather_code, 1).then(
            res => setIconData(res)
        )
        setDayName(new Date(props.data?.time).toLocaleDateString("hu-HU", {weekday:"long"})[0].toUpperCase() + 
                   new Date(props.data?.time).toLocaleDateString("hu-HU", {weekday:"long"}).slice(1))
    }, [props.data])
    return (
        <>
        <div className='dailyCard weatherBox lightBG'>
            {dayName} <br />
            ({props.data?.time.replaceAll('-', '.')})
            <img src={iconData?.image} alt="" />
            <div className="row g-0">
                <div className="col-lg-6" style={{color: 'blue', fontSize: "smaller"}}>
                    {props.data.temperature_2m_min} {props.unit}
                </div>
                <div className="col-lg-6" style={{color: 'red', fontSize: "smaller"}}>
                    {props.data.temperature_2m_max} {props.unit}
                </div>
            </div>
        </div>
        </>
    )
}