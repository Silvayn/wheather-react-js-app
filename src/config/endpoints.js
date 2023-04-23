export const endpointWeather = (params) => 
`https://api.openweathermap.org/data/2.5/weather?${params}&units=metric&lang=fr&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;

export const endpointForecast = (params) => 
`https://api.openweathermap.org/data/2.5/forecast?${params}&units=metric&lang=fr&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;