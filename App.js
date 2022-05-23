import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {

  const [region, setRegion] = useState({
    latitude: -23.5489,
    longitude: -46.6388,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  function moverCidade(lat, long){
    setRegion({
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
  }

  function mudouMapa(region){
    setRegion(region)
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Button title='Brasilia' onPress={()=>{ moverCidade(-15.8080354, -47.8750231) }}/>
        <Button title='São Paulo' onPress={()=>{ moverCidade(-23.5492243, -46.5813785) }}/>
      </View>
      <Text>{region.latitude} | {region.longitude}</Text>
      <MapView
        region={region}
        style={styles.map} 
        >
        <Marker coordinate={{
          latitude: -23.5492243,
          longitude: -46.5813785
        }}
          title="Meu carro"
          description='Gol 1.6 - PLACA ONU2021'
          pinColor={'green'}
        />
        <Marker coordinate={{
          latitude: -24.5492243,
          longitude: -45.5813785
        }}
          title="Minha casa"
          description='Casa comercial'
          pinColor={'red'}
        />
        </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: 550,
  },
});
