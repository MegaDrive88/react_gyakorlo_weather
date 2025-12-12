import { useState, useEffect } from 'react'
import DataService from '../../../data.service'
import '../../DailyWeather/DailyWeatherComponent.css'
import type DailyWeahterCardData from '../../../interfaces/daily.weather.card.interface'


export default function DailyWeatherCard(props: {data: DailyWeahterCardData, unit:string|undefined}){
    const [iconData, setIconData] = useState<{image:string}>()
    const dataService = new DataService()
    useEffect(()=>{
        dataService.getWeatherIconSource(props.data.weather_code, 1).then(
            res => setIconData(res)
        )
    }, [])
    return (
        <>
        <div className='dailyCard weatherBox lightBG'>
            {new Date(props.data?.time).toLocaleDateString("hu-HU", {weekday:"long"})}
            {/* egy nappal kesobbtol kene + kisebb font size szamokra*/}
            <img src={iconData?.image} alt="" />
            <div className="row g-0">
                <div className="col-6" style={{color: 'blue'}}>
                    {props.data.temperature_2m_min} {props.unit}
                </div>
                <div className="col-6" style={{color: 'red'}}>
                    {props.data.temperature_2m_max} {props.unit}
                </div>
            </div>
        </div>
        </>
    )
}