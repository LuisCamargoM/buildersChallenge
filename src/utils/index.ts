import { WEATHER_API_TOKEN } from "./constants";

export const getTemperature = (farenheit: number): number => {
    if (farenheit >= 273.15) return farenheit - 273.15;
    return -1;
}
export const getWeatherURL = (lat: number, lon: number): string => {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_TOKEN}`;
}