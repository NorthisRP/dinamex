import React, {useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import {TextInput, Button, Card} from 'react-native-paper';
import axios from 'axios';
import {global} from './../styles/global';
import {searcher} from '../styles/searcher.style';

export default function Searcher({fetchWeather, recentSearch}) {
  const [inputValue, setInputValue] = useState('');
  const [cities, setCities] = useState([]);

  //ищем совпадающие названия городов из значения InputValue
  const fetchCities = async text => {
    setInputValue(text);
    axios
      .get(
        `https://api.weather.com/v3/location/search?apiKey=6532d6454b8aa370768e63d6ba5a832e&language=en-US&query=${text}&locationType=city&format=json`,
      )
      .then(res => setCities(res.data.location.address.slice(0, 7)));
  };

  //Обработчик нажатия на предложенный вариант города от апихи
  const autoCompleteHandler = item => {
    setInputValue(() => item);
    setCities(() => []);
  };

  return (
    <View>
      <TextInput
        theme={{colors: {primary: '#00aaff'}}}
        style={global.input}
        label="City name"
        value={inputValue}
        onChangeText={text => fetchCities(text)}
      />
      <View>
        <FlatList
          data={cities}
          renderItem={({item}) => {
            return (
              <Card
                style={searcher.card}
                onPress={() => autoCompleteHandler(item)}>
                <Text>{item}</Text>
              </Card>
            );
          }}
          keyExtractor={item => item}
        />
      </View>
      {recentSearch.length ? (
        <View>
          <Text>Recently you searched: </Text>
          <FlatList
            data={recentSearch}
            renderItem={({item}) => {
              return (
                <Card
                  style={searcher.card}
                  onPress={() => autoCompleteHandler(item)}>
                  <Text>{item}</Text>
                </Card>
              );
            }}
            keyExtractor={item => item}
          />
        </View>
      ) : null}
      <Button
        onPress={() => fetchWeather(inputValue)}
        icon="magnify"
        mode="contained"
        style={global.button}>
        Check weather
      </Button>
    </View>
  );
}
