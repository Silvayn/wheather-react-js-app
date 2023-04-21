import { useState } from 'react';
import axios from './Axios';

export function Forecast({lat, lon}) {
    const [forecast, setForecast] = useState({ lat: lat, lon: lon });

    return <div>Forecast</div>;
}