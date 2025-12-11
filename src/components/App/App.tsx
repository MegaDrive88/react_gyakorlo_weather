import './App.css'
import { useState, useEffect } from 'react'
import axios from "axios";
import type Location from '../../interfaces/location.interface';
import DataService from '../../data.service';
import type HourlyWeather from '../../interfaces/hourly.weather.interface';
import type CurrentWeather from '../../interfaces/current.weather.interface';
import CurrentWeatherComponent from '../CurrentWeather/CurrentWeatherComponent';
import HourlyWeatherComponent from '../HourlyWeather/HourlyWeatherComponent';

function App() {
  const [typedLocation, setTypedLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location>();
  const [matchingLocations, setMatchingLocations] = useState<React.JSX.Element[]>([]);
  const dataService = new DataService()
  const [currentWeatherData, setCurrentWeatherData] = useState<CurrentWeather>()
  const [hourlyWeatherData, setHourlyWeatherData] = useState<HourlyWeather>()
  useEffect(() => {
    const timeout = setTimeout(() => {
      axios.get<any>(`https://geocoding-api.open-meteo.com/v1/search?name=${typedLocation}&count=12&language=hu&format=json`).then(
        res=>{
          if(res.data.results){
            setMatchingLocations(res.data.results.map((x: Location)=>
              <div key={x.id} className="resultDiv" onClick={async ()=>{
                  setSelectedLocation(x)  
                  let tempCurrentData = JSON.parse(await dataService.getCurrentWeatherByLocation(x.latitude, x.longitude)) as CurrentWeather                
                  let tempHourlyData = JSON.parse(await dataService.getHourlyForecastByLocation(x.latitude, x.longitude)) as HourlyWeather
                  let original_length = tempHourlyData.hourly.time.length ?? 0                  
                  tempHourlyData.hourly.time = tempHourlyData.hourly.time.filter(x=> 
                    new Date(`${x}:00`) >= new Date(`${tempCurrentData.current.time}:00`)
                  )
                  for(let s of ["temperature_2m", "is_day", "weather_code"]){
                    (tempHourlyData.hourly as any)[s] = (tempHourlyData.hourly as any)[s].slice(original_length - tempHourlyData.hourly.time.length)
                  }
                  setCurrentWeatherData(tempCurrentData)
                  setHourlyWeatherData(tempHourlyData)
                }}>
                <h6>{x.name}</h6>
                {x.admin1}, {x.country}
              </div>
            ))
          }
        }
      )
    }, 300);
    return () => clearTimeout(timeout); 
  }, [typedLocation]);

  return (
    <>
      <input name='location' type="text" placeholder='Település neve' className="form-control" value={typedLocation} onChange={(e)=>setTypedLocation(e.target.value)} />
      <div className="row">
        <div id='results' className='col-3'>Keresési találatok:{matchingLocations}</div>
        <div className="col-9">
          <h2>{selectedLocation?.name}</h2>
          {selectedLocation?.name &&
           <div>
            <h4>{selectedLocation?.admin1}, {selectedLocation?.country}</h4>
            <div className="row mx-0">
              <CurrentWeatherComponent currentWeather={currentWeatherData}/>
              <HourlyWeatherComponent hourlyWeather={hourlyWeatherData}/>
            </div>
           </div>
          }
        </div>
      </div>
    </>
  )
}

export default App
