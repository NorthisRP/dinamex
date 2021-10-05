import {useCallback, useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import axios from 'axios';

export const usePermission = () => {
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [localInfo, setLocalInfo] = useState({
    name: '',
    temp: '',
    humidity: '',
    desc: '',
    icon: '',
  });
  //получаем boolean разрешение на определение местоположения
  const getPermission = useCallback(async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  });

  //запрашиваем разрешение пользователя на обработку геолокации
  //устанавливаем координаты пользователя
  useEffect(() => {
    const hasLocationPermission = getPermission();
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          axios
            .get(
              `http://api.positionstack.com/v1/reverse?access_key=11bdb5294600e9d5c9e396734354b7a4&query=${position.coords.latitude},${position.coords.longitude}`,
            )
            .then(res => setLocation(res.data.data[0].region))
            .catch(err => console.error('Отсутствует подключение к тырнету'));
        },
        error => {
          if (error.code === 5)
            setError('Невозможно определить местоположение без разрешения');
          else console.error(error.code, error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 10000,
        },
      );
    }
  }, []);

  useEffect(() => {
    if (location)
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
          setLocalInfo({
            name: res.data?.name,
            temp: res.data?.main.temp,
            humidity: res.data?.main.humidity,
            desc: res.data?.weather[0].description,
            icon: res.data?.weather[0].icon,
          }),
        )
        .catch(err => console.error(err));
  }, [location]);

  return {location, localInfo, error};
};
