import { Axios } from "axios";

export default class DataService{
    private axios = new Axios({baseURL: "https://api.open-meteo.com/v1"})
    async getCurrentWeatherByLocation(lat: number, lon: number){
        return (await this.axios.get<any>(`forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day&timezone=auto&`)).data
    }
    async getHourlyForecastByLocation(lat: number, lon: number){
        return (await this.axios.get<any>(`forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code,is_day&timezone=auto&forecast_days=2`)).data
    }
    async getWeatherIconSource(wmo: number, is_day: number){
        return (await fetch("https://gist.githubusercontent.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c/raw/76b0cb0ef0bfd8a2ec988aa54e30ecd1b483495d/descriptions.json").then(res=>res.json()))[wmo.toString()][is_day == 1 ? 'day' : 'night']
    }
    async getDailyForecastByLocation(lat: number, lon: number){
        return (await this.axios.get<any>(`forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_direction_10m_dominant&start_date=${new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}&end_date=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}`)).data
        //&start_date=2025-12-13$end_date
    }
}