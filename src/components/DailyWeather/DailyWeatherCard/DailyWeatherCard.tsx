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
            <table style={{textAlign:"right", borderCollapse: "separate", borderSpacing: "0 5px"}}>
                <tbody>
                    <tr>
                        <td>
                            <img className="inlineImage" src="sunrise.png" alt="" />
                        </td>
                        <td>{props.data.sunrise.split('T')[1]}</td>
                    </tr>
                    <tr>
                        <td>
                            <img className="inlineImage" src="sunset.png" alt="" />
                        </td>
                        <td>{props.data.sunset.split('T')[1]}</td>
                    </tr>
                    <tr>
                        <td>
                            <img className="inlineImage" src="wind_arrow.png" style={{rotate: `${props.data.wind_direction_10m_dominant + 180}deg`}} alt="" />
                        </td>
                        <td><p style={{width: "70px", margin:0}}>{props.data.wind_speed_10m_mean} km/h</p></td>
                    </tr>
                    <tr>
                        <td>
                            <img className="inlineImage" src="humidity.png" alt="" />
                        </td>
                        <td>{props.data.relative_humidity_2m_mean}%</td>
                    </tr>
                    <tr>
                        <td>
                            <img className="rainimg" src={props.data.snowfall_sum != 0 ? "snow.png" : "rain.png"} alt="" />
                        </td>
                        <td>{props.data.snowfall_sum != 0 ? props.data.snowfall_sum : props.data.rain_sum} {props.data.snowfall_sum != 0 ? "cm" : "mm"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}