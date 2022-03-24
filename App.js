import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, FlatList, ActivityIndicator } from 'react-native'
import firebase, { database } from "./src/firebaseConnection";
import { ref, onValue, set, remove, push } from "firebase/database";
import Listagem from "./src/Listagem";

export default function App() {
  const [nome, setNome] = useState('')
  const [cargo, setCargo] = useState('')
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function dados() {

      await onValue(ref(database, 'usuarios'), (snapshot) => {

        setUsuarios([])

        snapshot.forEach(element => {

          const data = {
            key: element.key,
            nome: element.val().nome,
            cargo: element.val().cargo
          }

          setUsuarios(oldArray => [...oldArray, data].reverse())

        });
        setLoading(false)
      })

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

      {loading ? (
        <ActivityIndicator color="#121212" size={45} />
      ):(
        <FlatList
          keyExtractor={item => item.key}
          data={usuarios}
          renderItem={({ item }) => (<Listagem data={item} />)}
        />
      )}


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