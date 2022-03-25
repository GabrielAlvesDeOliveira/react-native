import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function TaskList({data, deleteItem, editItem}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{marginRight:10}} onPress={()=> deleteItem(data.key)}>
        <Feather name='trash' size={20} color='#FFF' />
      </TouchableOpacity>

      <View style={{paddingRight: 10}}>
        <TouchableWithoutFeedback onPress={() => editItem(data)}>
          <Text style={{color: '#fff', paddingRight: 10}}>{data.name}</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  }
})