import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput, Button, TouchableOpacity } from 'react-native'
import firebase, { database } from "./src/firebaseConnection";
import { ref, onValue, set, remove, push } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import Login from "./src/components/Login";

export default function App() {
  
  const [user, setUser] = useState(null)

  if(!user){
    return <Login changeStatus={(user)=> setUser(user)}/>
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <View>
        <TextInput 
          style={styles.input}
          placeholder="O que vai fazer hoje?"
        />
        <TouchableOpacity>
          <Text></Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: '#F2F6FC'
  }
})