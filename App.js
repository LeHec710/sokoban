import { StatusBar } from 'expo-status-bar';
import Constants from "expo-constants";

import { Button, StyleSheet, Text, View } from 'react-native';
import Game from './game/Game';
import { Picker } from 'react-native-web';
import { useEffect, useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios'

export default function App() {
  const [selectedValue, setSelectedValue] = useState("java");
  const [success, setSuccess] = useState('');
  const {manifest} = Constants;
  const [maps, setMaps] = useState([])
  const [selectedMap, setSelectedMap] = useState(null)

  useEffect(() => {
    function getMaps() {
      try {
        const response = fetch("http://192.168.225.55:8000/api/maps?page=1")
        .then(res => res.json())
        .then(res => {
          console.log("ok")
          const _maps = res['hydra:member'].map(_map => {
            _map.loaded = false
            return _map
          })
          setMaps(_maps)
          setSelectedMap(_maps[0])
        })
        .catch(err => console.log(err))
      } catch (error) {
      }
    };
    getMaps();
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>SOKOBAN</Text>
      <Text style={[styles.description, { marginBottom: 20 }]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quaerat laudantium, temporibus adipisci ratione minus facere maiores explicabo. Odit, mollitia.</Text>

      <SelectDropdown
        data={maps}
        defaultValue={maps[0]}
        onSelect={(selectedItem, index) => {
          setSelectedMap(maps[index])
        }}
        defaultButtonText={"En attente"}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.name
        }}
        rowTextForSelection={(item, index) => {
          return item.name
        }}
      />
      <Game map={selectedMap} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#738b8d',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50
  },
  title: {
    fontSize: 32,
    fontWeight: "bold"
  }
});
