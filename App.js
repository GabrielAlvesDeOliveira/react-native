import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput, Button } from 'react-native'
import firebase, { database } from "./src/firebaseConnection";
import { ref, onValue, set, remove, push } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import Login from "./src/components/Login";

export default function App() {
  
  const [user, setUser] = useState(null)

  if(!user){
    return <Login/>
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>DENTRO DA TELA TAREFAS</Text>
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