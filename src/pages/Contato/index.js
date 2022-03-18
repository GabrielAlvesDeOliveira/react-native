import React from "react";
import { View, Text, Button } from 'react-native'

import { useNavigation, StackActions } from '@react-navigation/native'

export default function Contato(){
  const navigation = useNavigation()

  function handlehome(){
    navigation.dispatch(StackActions.popToTop())
  }

  return(
    <View>
      <Text> Pagina contato </Text>
      <Button title="Voltar Home" onPress={handlehome}/>
    </View>
  )
}