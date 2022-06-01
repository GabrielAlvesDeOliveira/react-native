import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';


export default class Mega extends Component {

  
  constructor(props){
    super(props)

    state = {
      numeros: props.numeros
    }

    this.alterarQtd = this.alterarQtd.bind(this)
  }

  alterarQtd(qtd){
    this.setState({numeros: qtd})
  }

  render() {
    return (
      <Text>
        {this.state.numeros}
        Gerador de Mega sena
        <TextInput 
          keyboardType={'numeric'}
          style={{borderBottomWidth: 1}}
          placeholder='Quantidade de números'
          value={this.state.numeros}
          onChangeText={qtd => this.alterarQtd(qtd)}
        />
      </Text>
    )
  }
}