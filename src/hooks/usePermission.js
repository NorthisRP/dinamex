import {useCallback, useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

export const usePermission = () => {
  const [location, setLocation] = useState({lat: 0, long: 0});
  const [error, setError] = useState('');
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
          setLocation({
            ...location,
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
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
  return {location, error};
};
