import './App.css'
import { useState, useEffect } from 'react'
import axios from "axios";
import type Location from '../../interfaces/location.interface';
import DataService from '../../data.service';
import type HourlyWeather from '../../interfaces/hourly.weather.interface';
import type CurrentWeather from '../../interfaces/current.weather.interface';
import CurrentWeatherComponent from '../CurrentWeather/CurrentWeatherComponent';
import HourlyWeatherComponent from '../HourlyWeather/HourlyWeatherComponent';
import DailyWeatherComponent from '../DailyWeather/DailyWeatherComponent';
import type DailyWeather from '../../interfaces/daily.weather.interface';

function App() {
  const [typedLocation, setTypedLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location>();
  const [matchingLocations, setMatchingLocations] = useState<React.JSX.Element[]>([]);
  const dataService = new DataService()
  const [currentWeatherData, setCurrentWeatherData] = useState<CurrentWeather>()
  const [hourlyWeatherData, setHourlyWeatherData] = useState<HourlyWeather>()
  const [dailyWeatherData, setDailyWeatherData] = useState<DailyWeather>()
  const setWeatherDataOnClick = async (x:any) =>{
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
    let tempDailyData = JSON.parse(await dataService.getDailyForecastByLocation(x.latitude, x.longitude)) as DailyWeather
    setDailyWeatherData(tempDailyData) 
  }
  useEffect(() => {
    if (typedLocation == '') setMatchingLocations([])
    const timeout = setTimeout(() => {
      axios.get<any>(`https://geocoding-api.open-meteo.com/v1/search?name=${typedLocation}&count=12&language=hu&format=json`).then(
        res=>{
          if(res.data.results){
            setMatchingLocations(res.data.results.map((x: Location)=>
              <div key={x.id} className="resultDiv" onClick={async ()=>{
                  setSelectedLocation(x)  
                  setWeatherDataOnClick(x)
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
  
  const getCurrentLocation = () =>{
    dataService.getMyLocation().then(
      async (data:any)=>{
        //setSelectedLocation beallitani
        //https://nominatim.openstreetmap.org/reverse?lat=47.1625&lon=19.0690&format=json
        setWeatherDataOnClick({latitude: data[0], longitude: data[1]})
      }
    )
  }
  return (
    <>
      <div className="row">
        <div className="col-11">
          <input name='location' type="text" placeholder='Település neve' style={{marginBottom:"10px"}} className="form-control" value={typedLocation} onChange={(e)=>setTypedLocation(e.target.value)} />
        </div>
        <div className="col-1 g-0">
          <button className='btn btn-primary w-100' onClick={getCurrentLocation}>
            Auto ⌖
          </button>
        </div>
      </div>
      <div className="row">
        <div id='results' className='col-3'>Keresési találatok:{matchingLocations}</div>
        <div className="col-9">
          <h2>{selectedLocation?.name}</h2>
          {selectedLocation?.name &&
           <div>
            <h4>{selectedLocation?.admin1}, {selectedLocation?.country}</h4>
            <div className="row mx-0" style={{"height": "250px"}}>
              <CurrentWeatherComponent currentWeather={currentWeatherData}/>
              <HourlyWeatherComponent hourlyWeather={hourlyWeatherData} unit={hourlyWeatherData?.hourly_units.temperature_2m}/>
              <h5 className='g-0'>Heti előrejelzés</h5>
              <div className='dailyCardContainer col-12 g-0'>
              <DailyWeatherComponent dailyWeather={dailyWeatherData} unit={dailyWeatherData?.daily_units.temperature_2m_min}/>
              </div>
            </div>
           </div>
          }
        </div>
      </div>
    </>
  )
}

export default App
