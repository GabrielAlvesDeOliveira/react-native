import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import params from './src/params';
import Field from './src/components/Field'



export default class App extends Component {
  
  render(){

    return (
      <View style={styles.container}>
      <Text>Iniciando o mines</Text>
      <Text> Iniciando a grade: {params.getRowsAmount()}x{params.getColumnsAmount()}</Text>
      <Field/>
      <Field opened/>
      <Field opened nearMines={1}/>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});