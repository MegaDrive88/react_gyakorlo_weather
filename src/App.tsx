import './App.css'
import { useState, useEffect } from 'react'
import axios from "axios";
import type Location from './interfaces/location.interface';

function App() {
  const [location, setLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location>();
  const [matchingLocations, setMatchingLocations] = useState<React.JSX.Element[]>([]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      axios.get<any>(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=12&language=hu&format=json`).then(
        res=>{
          if(res.data.results){
            setMatchingLocations(res.data.results.map((x: Location)=>
              <div className="resultDiv" onClick={()=>{
                  setSelectedLocation(x)
                  //api call
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
  }, [location]);
  return (
    <>
      <input type="text" placeholder='Település neve' className="form-control" value={location} onChange={(e)=>setLocation(e.target.value)} />
      <div className="row">
        <div id='results' className='col-3'>{matchingLocations}</div>
        <div className="col-9">
          <h2>{selectedLocation?.name}</h2>
          <h4>{selectedLocation?.admin1}, {selectedLocation?.country}</h4>
        </div>
      </div>
    </>
  )
}

export default App
