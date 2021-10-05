import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Searcher from './../components/Searcher';
import WeatherInfo from './../components/WeatherInfo';
import axios from 'axios';
import {usePermission} from './../hooks/usePermission';

export default function WeatherView() {
  const [info, setInfo] = useState({
    name: '',
    temp: '',
    humidity: '',
    desc: '',
    icon: '',
  });
  const [recentSearch, setRecentSearch] = useState([]);
  const {location, error} = usePermission(); //определяем местоположение пользователя

  //обработчик нажатия на кнопку в Searcher
  //обращаемся к апихе за погодой по названию города из TextInput в том же компоненте
  const fetchWeather = city => {
    if (!city) return;
    axios
      .get('https://community-open-weather-map.p.rapidapi.com/weather', {
        params: {q: city, lang: 'en', units: 'metric'},
        headers: {
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key':
            '31b64b0bf6mshb9c21d9f9f0b9b6p1a0815jsnd5726cca4915',
        },
      })
      .then(res => {
        setInfo({
          name: res.data?.name,
          temp: res.data?.main.temp,
          humidity: res.data?.main.humidity,
          desc: res.data?.weather[0].description,
          icon: res.data?.weather[0].icon,
        });
        //Запоминаем город, который искал пользователь
        if (!recentSearch.includes(city)) {
          setRecentSearch([...recentSearch, city]);
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <View>
      <Searcher fetchWeather={fetchWeather} recentSearch={recentSearch} />
      {info.name ? <WeatherInfo info={info} /> : null}
      {error ? null : (
        <View>
          <Text>
            Координаты текущей позиции: lat: {location.lat} long:{' '}
            {location.long}
          </Text>
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({});
