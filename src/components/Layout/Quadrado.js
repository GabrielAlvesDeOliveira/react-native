import React from 'react'
import {View, StyleSheet } from 'react-native'

export default props => {
  const lado = 50
  return(
    <View style={{
      height: 20,
      width: 20,
      backgroundColor: props.cor || '#000'
    }}>

    </View>
  )
}
