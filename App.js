import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location'
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [region, setRegion] = useState({
    latitude: -23.5489,
    longitude: -46.6388,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const [markers, setMarkers] = useState([
    { key: 0, aviso: "pegiso", cords: { latitude: -15.8080374, longitude: -47.8750231 }, pinColor: 'red' },
    { key: 1, aviso: "tranquilo", cords: { latitude: -15.8380374, longitude: -47.8850231 }, pinColor: 'green' },
  ])

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true
      });
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
    })();
  }, []);


  function moverCidade(lat, long) {
    setRegion({
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
  }

  function mudouMapa(region) {
    setRegion(region)
  }

  function newMarker(e) {
    setMarkers([...markers, { key: markers.length, cords: e.nativeEvent.coordinate, pinColor: "#0000FF" }])
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Button title='Brasilia' onPress={() => { moverCidade(-15.8080354, -47.8750231) }} />
        <Button title='São Paulo' onPress={() => { moverCidade(-23.5492243, -46.5813785) }} />
      </View>
      <Text>{region.latitude} | {region.longitude}</Text>
      <MapView
        ref={(map) => { let mapa = map }}
        region={region}
        style={styles.map}
        showsUserLocation
        loadingEnabled
      >
        {markers.map((marker) => (
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: 550,
  },
});
