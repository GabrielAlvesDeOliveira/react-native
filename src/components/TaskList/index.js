import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function TaskList({data}) {
  return (
    <View style={styles.container}>
      <Text>{data.key} {data.name}</Text>
    </View>
  )
}