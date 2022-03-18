import axios from 'axios';
import React, {useState, useRef} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView, KeyBoard} from 'react-native';
import api from './src/services/api'

function App(){

  const [cep, setCep] = useState('')
  const inputRef = useRef(null)
  const [cepUser, setCepUser] = (null)
  async function buscar(){
    if(cep == ''){
      alert('Digite um cep valido')
      setCep('')
      return;
    }

    try {
      const response = await axios.get(`/${cep}/json`)
      setCepUser(response.data)
      KeyBoard.dismiss()
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }

  function limpar(){
    setCep('')
    inputRef.current.focus()
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.text}> Digite o CEP desejado</Text>
        <TextInput 
        style={styles.input}
        placeholder="EX: 00000000"
        value={cep}
        onChangeText={(text) => setCep(text)}
        keyboardType="numeric"
        ref={inputRef}
        />
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity style={[styles.botao, {backgroundColor: '#1D75CD'}]} onPress={buscar}>
          <Text style={styles.botaoText}> Buscar </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, {backgroundColor: '#CD3E1D'}]} onPress={limpar}>
          <Text style={styles.botaoText}> Limpar </Text>
        </TouchableOpacity>
      </View>
      {cepUser &&
      <View style={styles.resultado}>
        <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
        <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
        <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
        <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
        <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
      </View>
      }
    </SafeAreaView>
  ) 
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text:{
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input:{
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18
  },
  areaBtn:{
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },
  botao:{
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  botaoText:{
    fontSize: 22,
    color: '#FFF'
  },
  resultado:{
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  itemText:{
    fontSize: 22,

  }
})
export default App;