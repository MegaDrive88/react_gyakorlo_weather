import { useEffect, useState } from 'react'
import DataService from '../../data.service'
import type CurrentWeather from '../../interfaces/current.weather.interface'
import './CurrentWeatherComponent.css'

export default function CurrentWeatherComponent(props: {currentWeather: CurrentWeather|undefined}){
    const currentWeather = props.currentWeather
    const dataService = new DataService()
    const [iconData, setIconData] = useState<{image:string}>()
    useEffect(()=>{
        if(currentWeather)
        dataService.getWeatherIconSource(currentWeather.current.weather_code, currentWeather.current.is_day).then(
            res => setIconData(res)
        )
    }, [currentWeather])
    return (
        <>
            <div className="col-md-5 g-0 tileDiv">
                <h5>Jelenlegi időjárás</h5>
                <div className={`weatherBox currentWeatherBox ${currentWeather?.current.is_day == 1 ? "lightBG" : "darkBG"}`}>
                    <h5>{currentWeather?.current.time.replaceAll('-', '.').replaceAll('T', " ")} {currentWeather?.timezone_abbreviation}</h5>
                    <img src={iconData?.image} />
                    <h4>Jelenlegi hőmérséklet: {currentWeather?.current.temperature_2m} {currentWeather?.current_units.temperature_2m}</h4>
                    <h5>Páratartalom: {currentWeather?.current.relative_humidity_2m}%</h5>
                    <h5>Szél: <img className='inlineImage' style={{rotate: `${currentWeather?.current.wind_direction_10m! + 180}deg`}} src={currentWeather?.current.is_day ? "wind_arrow.png" : "wind_arrow_night.png"} alt="" /> {currentWeather?.current.wind_speed_10m} km/h</h5>
                </div>
            </div>
        </>
    )
}