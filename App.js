import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import firebase, { database } from "./src/firebaseConnection";
import { ref, onValue, set, remove, push } from "firebase/database";

export default function App() {
  const [nome, setNome] = useState('')
  const [cargo, setCargo] = useState('')
  useEffect(() => {

    async function dados() {
      // await onValue(ref(database, 'usuarios/1'), (snapshot) => {
      //   console.log(snapshot.val())
      //   setNome(snapshot.val().nome)
      //   setIdade(snapshot.val().idade)
      // })

      // set(ref(database, 'tipo'),"clientela").then(()=>{
      //   console.log('ok')
      // }).catch(error=>{
      //   console.log(error)
      // })

      // remove(ref(database, 'tipo'),"clientela").then(()=>{
      //   console.log('ok')
      // }).catch(error=>{
      //   console.log(error)
      // })

      // await set(ref(database, `usuarios/3`), {
      //   nome: 'João',
      //   idade: 13
      // }).then(() => {
      //     console.log('ok');
      //   }).catch((error) => {
      //   console.error(error);
      // });


    }

    dados()
  }, [])

  async function cadastrar() {
    if (nome !== '' && cargo !== '') {

      const newPostKey = push(ref(database), 'usuarios').key;

      await set(ref(database, `usuarios/${newPostKey}`), {
        nome: nome,
        cargo: cargo
      })
      alert('cadastrado')
      setCargo('')
      setNome('')
      
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Nome </Text>
      <TextInput style={styles.input}
        underLineColorAndroid="transparent"
        onChangeText={(texto) => setNome(texto)}
        value={nome}
      />
      <Text style={styles.texto}>Cargo </Text>
      <TextInput style={styles.input}
        underLineColorAndroid="transparent"
        onChangeText={(texto) => setCargo(texto)}
        value={cargo}
      />

      <Button
        title="Novo funcionario"
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