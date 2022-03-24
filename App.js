import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import firebase, { database } from "./src/firebaseConnection";
// import { ref, onValue, set, remove, push } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')

  async function logar() {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert('Bem vindo: ' + userCredential.user.email)
        setUser(userCredential.user.email)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(errorCode)
        alert(errorMessage)
      });

    setEmail('')
    setPassword('')
  }

  async function logout() {
    const auth = getAuth()
    await signOut(auth)

    alert('Deslogado')
    setUser('')
  }

  return (
    <View style={styles.container}>
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
        title="Acessar"
        onPress={logar}
      />
      <Text style={{ marginTop: 20, marginBottom: 20, fontSize: 23, textAlign: 'center' }}>
        {user}
      </Text>

      {user.length > 0 ?
        (
          <Button
            title="Logout"
            onPress={logout}
          />) : <Text>Nenhum usuario logado</Text>}
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