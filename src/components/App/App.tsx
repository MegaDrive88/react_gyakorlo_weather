import './App.css'
import { useState, useEffect, useContext } from 'react'
import axios from "axios";
import type Location from '../../interfaces/location.interface';
import DataService from '../../data.service';
import type HourlyWeather from '../../interfaces/hourly.weather.interface';
import type CurrentWeather from '../../interfaces/current.weather.interface';
import CurrentWeatherComponent from '../CurrentWeather/CurrentWeatherComponent';
import HourlyWeatherComponent from '../HourlyWeather/HourlyWeatherComponent';
import DailyWeatherComponent from '../DailyWeather/DailyWeatherComponent';
import type DailyWeather from '../../interfaces/daily.weather.interface';
import type ReverseGeocode from '../../interfaces/reversegeocode.interface';
import LoadIndicatorComponent from '../LoadIndicator/LoadIndicatorComponent';
import { UnitContext } from '../../context';


function App() {
  const [typedLocation, setTypedLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | ReverseGeocode>();
  const [matchingLocations, setMatchingLocations] = useState<React.JSX.Element[]>([]);
  const dataService = new DataService()
  const [currentWeatherData, setCurrentWeatherData] = useState<CurrentWeather>()
  const [hourlyWeatherData, setHourlyWeatherData] = useState<HourlyWeather>()
  const [dailyWeatherData, setDailyWeatherData] = useState<DailyWeather>()
  const [loaderVisible, setLoaderVisible] = useState<boolean>(false)
  const {unit, setUnit} = useContext<any>(UnitContext)
  const setWeatherDataOnClick = async (x:any) =>{
    setLoaderVisible(true)
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
    setLoaderVisible(false)
  }
  useEffect(()=>{
    setLoaderVisible(false)
  })
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
  useEffect(()=>{
    if (selectedLocation?.latitude == undefined || selectedLocation.longitude == undefined) return
    setWeatherDataOnClick({latitude: selectedLocation?.latitude, longitude: selectedLocation?.longitude})    
  }, [unit])
  const getCurrentLocation = () =>{
    dataService.getMyLocation().then(
      async (data:any)=>{
        setSelectedLocation(JSON.parse((await dataService.getReverseGeocoding(data[0], data[1])).data) as ReverseGeocode)        
        setWeatherDataOnClick({latitude: data[0], longitude: data[1]})
      }
    )
  }
  const isLocation = (loc: Location | ReverseGeocode) :loc is Location => {
      try{
        return "name" in loc;
      } catch { return false }
  }
  return (
    <>
    <LoadIndicatorComponent visible={loaderVisible!}/>
      <div className="d-flex" style={{marginBottom:"10px"}}>
        <input name='location' type="text" placeholder='Település neve' className="form-control" value={typedLocation} onChange={(e)=>setTypedLocation(e.target.value)} />
        <button className='btn btn-primary ms-2' onClick={getCurrentLocation}>⌖</button>
      </div>
      <div className="row">
        <div id='results' className='col-3'>Keresési találatok:{matchingLocations}</div>
        <div className="col-9">
          <h2>{isLocation(selectedLocation!) ?  selectedLocation.name : selectedLocation?.city}</h2>
          {(isLocation(selectedLocation!) ?  selectedLocation.name : selectedLocation?.city) &&
           <div>   
            <h4>{isLocation(selectedLocation!) ? selectedLocation?.admin1 : selectedLocation?.principalSubdivision}, {isLocation(selectedLocation!) ? selectedLocation?.country : selectedLocation?.countryName}</h4>
            Mértékegység: <select name="" id="unit-selector" value={unit} onChange={(e)=>setUnit((e.target as any).value)} style={{outline:0}}>
              <option value="celsius">°C</option>
              <option value="fahrenheit">°F</option>
            </select>
            <div className="row mx-0" style={{"height": "320px"}}>
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
