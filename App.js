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
  const [markers, setMarkers] = useState([
    {key: 0, cords:{latitude: -15.8080374, longitude: -47.8750231}, pinColor: "#FF0000"},
    {key: 1, cords:{latitude: -15.8380374, longitude: -47.8850231}, pinColor: "#00FF00"},
  ])

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

  function newMarker(e){
    setMarkers([...markers, {key: markers.length, cords: e.nativeEvent.coordinate, pinColor: "#0000FF"}])
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Button title='Brasilia' onPress={()=>{ moverCidade(-15.8080354, -47.8750231) }}/>
        <Button title='São Paulo' onPress={()=>{ moverCidade(-23.5492243, -46.5813785) }}/>
      </View>
      <Text>{region.latitude} | {region.longitude}</Text>
      <MapView
        onPress={newMarker()}
        region={region}
        style={styles.map} 
        >
        {markers.map(marker => (
          <Marker
            key={marker.key}
            coordinate={marker.cords}
            pinColor={marker.pinColor}
          />
        ))}
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
