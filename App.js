import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import firebase, { database } from "./src/firebaseConnection";
import { ref, onValue, set, remove, push } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  async function cadastrar() {
    const auth = getAuth()

    await createUserWithEmailAndPassword(auth, email, password)
    .then((value)=>{
      // alert(value.user.uid)
      set(ref(database, 'usuarios/' + value.user.uid), {
        nome: name
      });    

      alert('Usuario criado com sucesso')
      setName('')
      setEmail('')
      setPassword('')
    }).catch(error => {
      alert('algo deu errado')
    })
  }

  return (
    <View style={styles.container}>

      <Text style={styles.texto}>Nome</Text>
      <TextInput style={styles.input}
        underLineColorAndroid="transparent"
        onChangeText={(texto) => setName(texto)}
        value={name}
      />

      <Text style={styles.texto}>Email</Text>
      <TextInput style={styles.input}
        underLineColorAndroid="transparent"
        onChangeText={(texto) => setEmail(texto)}
        value={email}
      />
      <Text style={styles.texto}>Senha </Text>
      <TextInput style={styles.input}
        underLineColorAndroid="transparent"
        onChangeText={(texto) => setPassword(texto)}
        value={password}
      />

      <Button
        title="Cadastrar"
        onPress={cadastrar}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  texto: {
    fontSize: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#121212',
    height: 45,
    fontSize: 17
  }
})