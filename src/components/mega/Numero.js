import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default ({num}) => {

  return(
    <View style={style.Container}>
      <Text style={style.Num}>
        {num}
      </Text>
    </View>
  )
}

const style = StyleSheet.create({

  Container: {
    height: 50,
    width: 50,
    backgroundColor: '#000',
    margin: 5,
    borderRadius: 25
  },
  Num:{
    color: '#FFF'
  }
})