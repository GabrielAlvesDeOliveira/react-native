import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet} from 'react-native'
import firebase from "./src/firebaseConnection";

export default function App(){
  const [nome,setNome] = useState('Carregando...')

  useEffect(()=>{

    // async function Dados(){
    //   await firebase.database().ref('nome').on('value', (snapshot)=>{
    //     setNome(snapshot.val())
    //   })
    // }

    // Dados()
  },[])

  return(
    <View style={{marginTop: 25}}>
      <Text style={{fontSize: 25}}>Hello {nome}</Text>
    </View>
  )
}