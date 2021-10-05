import React, {useState} from 'react';
import {StyleSheet, Text, ScrollView} from 'react-native';
import Searcher from './../components/Searcher';
import WeatherInfo from './../components/WeatherInfo';
import {usePermission} from './../hooks/usePermission';
import {useFetchWeather} from './../hooks/useFetchWeather';

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
  const fetchWeatherAPI = useFetchWeather();

  //обработчик нажатия на кнопку в Searcher
  //обращаемся к апихе за погодой по названию города из TextInput в том же компоненте
  const fetchWeatherHandler = city => {
    if (!city) return;
    fetchWeatherAPI(city, setInfo);
    if (!recentSearch.includes(city)) {
      setRecentSearch([...recentSearch, city]);
    }
  };

  return (
    <ScrollView>
      <Searcher
        fetchWeatherHandler={fetchWeatherHandler}
        recentSearch={recentSearch}
      />
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
