import React, {useState, useEffect, useMemo, useRef} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

function App(){
  
  const [nome, setNome] = useState('')
  const [input, setInput] = useState('')
  const nomeInput = useRef(null)

  useEffect(()=>{
    
    async function getStorage(){
      const nomeStorage = await AsyncStorage.getItem('nomes')
      if(nomeStorage !== null){
        setNome(nomeStorage)
      }
    }

    getStorage()

  },[])

  useEffect(()=>{

    async function saveStorage(){
      await AsyncStorage.setItem('nomes', nome)
    }

    saveStorage()

  },[nome])
  
  function alteraNome(){
    setNome(input)
    setInput('')
  }

  function novoNome(){
    nomeInput.current.focus()
  }

  const letrasNome = useMemo(()=> nome.length, [nome])

  return(
    <View style={styles.container}>

      <TextInput placeholder='Seu nome' value={input} onChangeText={(text)=>setInput(text)} ref={nomeInput}/>

      <TouchableOpacity style={styles.btn} onPress={alteraNome}>
        <Text style={styles.btnText}> Altera nome </Text>
      </TouchableOpacity>

      <Text> {nome} </Text>
      <Text>  Tem {letrasNome} letras. </Text>

      <TouchableOpacity onPress={novoNome}>
        <Text>Novo nome</Text>
      </TouchableOpacity>

    </View>
  ) 
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 20
  },
  btn:{
    backgroundColor: '#222',
    alignItems: 'center'
  },
  btnText:{
    color: '#fff'
  }
})
export default App;