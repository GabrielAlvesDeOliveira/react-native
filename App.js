import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet} from 'react-native'
import firebase from "./src/firebaseConnection";
import { AsyncStorage } from 'react-native'

export default function App(){
  const [nome,setNome] = useState('Carregando...')

  return(
    <View style={{marginTop: 25}}>
      <Text style={{fontSize: 25}}>Hello {nome}</Text>
    </View>
  )
}