import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function App() {

  const [region, setRegion] = useState({
    latitude: -23.5489,
    longitude: -46.6388,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  return (
    <View style={styles.container}>
      {/* <Text>Ola mundo</Text> */}
      <MapView
        region={region}
        style={styles.map} />
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
