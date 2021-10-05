import axios from 'axios';
import {useCallback} from 'react';

export const useFetchWeather = () => {
  return useCallback((location, setInfo) => {
    axios
      .get('https://community-open-weather-map.p.rapidapi.com/weather', {
        params: {q: location, lang: 'en', units: 'metric'},
        headers: {
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key':
            '31b64b0bf6mshb9c21d9f9f0b9b6p1a0815jsnd5726cca4915',
        },
      })
      .then(res =>
        setInfo({
          name: res.data?.name,
          temp: res.data?.main.temp,
          humidity: res.data?.main.humidity,
          desc: res.data?.weather[0].description,
          icon: res.data?.weather[0].icon,
        }),
      )
      .catch(err => console.error('Такого города не найдено!'));
  });
};
