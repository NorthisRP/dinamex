import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Avatar, TextInput, RadioButton, Button} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {global} from './../styles/global.style';
import {account} from './../styles/account.style';

export default function Account() {
  const [data, setData] = useState({
    image: 'empty',
    name: '',
    birthday: new Date(),
    gender: '',
    address: '',
    id: '',
  });

  //обработка нажатия на картинку, предлагаем выбрать картинку из галереи телефона
  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, res => {
      try {
        setData({...data, image: res.assets[0].uri});
      } catch (error) {}
    });
  };

  //При первом рендере кидаем запрос к random user и устанаваливаем состояние data
  useEffect(() => {
    axios
      .get(
        'https://randomuser.me/api/?inc=gender,name,nat,dob,id,picture,location&noinfo',
      )
      .then(res => {
        const data = res.data.results[0];
        setData({
          image: data.picture.large,
          name: data.name.first + ' ' + data.name.last,
          birthday: new Date(data.dob.date),
          gender: data.gender,
          address: `City: ${data.location.city}; street: ${data.location.street.name}`,
          id: data.id.value,
        });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <View style={global.column}>
      <TouchableOpacity onPress={selectImage}>
        <Avatar.Image size={150} source={{uri: data.image}} />
      </TouchableOpacity>
      <TextInput
        style={global.input}
        theme={{colors: {primary: '#00aaff', background: 'white'}}}
        label="Name"
        value={data.name}
        onChangeText={text => setData({...data, name: text})}
      />
      <TextInput
        style={global.input}
        theme={{colors: {primary: '#00aaff', background: 'white'}}}
        label="Birthday"
        value={data.birthday.toLocaleDateString()}
        onChangeText={text => setData({...data, birthday: text})}
      />
      <RadioButton.Group
        onValueChange={gender => setData({...data, gender})}
        value={data.gender}>
        <View style={global.row}>
          <View style={account.radio}>
            <RadioButton value="male" />
            <Text>Male</Text>
          </View>
          <View style={account.radio}>
            <RadioButton value="female" />
            <Text>Female</Text>
          </View>
        </View>
      </RadioButton.Group>
      <TextInput
        style={global.input}
        theme={{colors: {primary: '#00aaff', background: 'white'}}}
        label="Address"
        value={data.address}
        onChangeText={text => setData({...data, address: text})}
      />
      <TextInput
        style={global.input}
        theme={{colors: {primary: '#00aaff', background: 'white'}}}
        label="Id"
        value={data.id}
        onChangeText={text => setData({...data, id: text})}
      />
      <TouchableOpacity>
        <Button icon="content-save" mode="contained" style={global.button}>
          Save
        </Button>
      </TouchableOpacity>
    </View>
  );
}
