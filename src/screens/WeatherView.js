import React, {useState} from 'react';
import {StyleSheet, Text, ScrollView} from 'react-native';
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
  const {localInfo} = usePermission(); //определяем местоположение пользователя

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
      .catch(err => console.error('Такого города не найдено!'));
  };

  return (
    <ScrollView>
      <Searcher fetchWeather={fetchWeather} recentSearch={recentSearch} />
      {info.name ? (
        <WeatherInfo info={info} title="Запрошенная погода" />
      ) : null}
      {localInfo.name ? (
        <WeatherInfo info={localInfo} title="Местная погода" />
      ) : (
        <Text style={style.loading}>Loading...</Text>
      )}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  loading: {textAlign: 'center', fontSize: 24, color: '#00aaff'},
});
