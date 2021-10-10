import React, {useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import {TextInput, Button, Card} from 'react-native-paper';
import axios from 'axios';
import {global} from '../styles/global.style';
import {searcher} from '../styles/searcher.style';

export default function Searcher({fetchWeatherHandler, recentSearch}) {
  const [inputValue, setInputValue] = useState('');
  const [cities, setCities] = useState([]);

  //ищем совпадающие названия городов из значения InputValue
  const fetchCities = async text => {
    setInputValue(text);
    if (!text) return setCities([]);
    axios
      .get(
        `https://api.weather.com/v3/location/search?apiKey=6532d6454b8aa370768e63d6ba5a832e&language=en-US&query=${text}&locationType=city&format=json`,
      )
      .then(res => setCities(res.data.location.address.slice(0, 5)))
      .catch(err => {
        if (err.response) {
        } else if (err.request) console.error(err);
      });
  };

  //Обработчик нажатия на предложенный вариант города от апихи
  const autoCompleteHandler = item => {
    setInputValue(() => item);
    setCities(() => []);
  };

  return (
    <View>
      <View style={global.row}>
        <TextInput
          theme={{colors: {primary: '#00aaff', background: 'white'}}}
          style={global.input}
          label="City name"
          value={inputValue}
          onChangeText={text => fetchCities(text)}
        />
      </View>
      <View style={global.column}>
        {cities.map(city => {
          return (
            <Card
              key={city}
              style={searcher.card}
              onPress={() => autoCompleteHandler(city)}>
              <Text>{city}</Text>
            </Card>
          );
        })}
      </View>
      {recentSearch.length ? (
        <View>
          <Text style={{textAlign: 'center'}}>Recently you searched: </Text>
          {recentSearch.map(city => {
            return (
              <Card
                key={city}
                style={searcher.card}
                onPress={() => autoCompleteHandler(city)}>
                <Text>{city}</Text>
              </Card>
            );
          })}
        </View>
      ) : null}
      <View style={global.row}>
        <Button
          onPress={() => fetchWeatherHandler(inputValue)}
          icon="magnify"
          mode="contained"
          style={global.button}>
          Check weather
        </Button>
      </View>
    </View>
  );
}
