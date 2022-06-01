import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import MegaNumero from './Numero';

export default class Mega extends Component {


  constructor(props) {
    super(props)

    state = {
      numeros: props.numeros,
      gerados: [],
    }

    this.alterarQtd = this.alterarQtd.bind(this)
  }

  alterarQtd(qtd) {
    this.setState({ numeros: +qtd })
  }

  gerarNumeroNaoContido(nums) {
    const aleatorio = parseInt(Math.random() * 60 + 1)
    return nums.include(aleatorio) ? this.gerarNumeroNaoContido(nums) : aleatorio
  }

  gerarNumeros() {
    const numerics = Array(this.state.qtdNumeros).fill().reduce(nums => [...nums, this.gerarNumeroNaoContido(nums)], [])
    this.setState({ gerarNumeros: numerics })
  }

  exibirNumeros() {
    const nums = this.state.numeros
    return nums.map(num => {
      return <MegaNumero num={num} />
    })
  }

  render() {
    return (
      <>

        <Text>
          Gerador de Mega sena
        </Text>
        <TextInput
          keyboardType={'numeric'}
          style={{ borderBottomWidth: 1 }}
          placeholder='Quantidade de números'
          value={`${this.state.numeros}`}
          onChangeText={qtd => this.alterarQtd(qtd)}
        />
        <Button
          title='Gerar'
          onPress={this.gerarNumeros}
        />
        <View style={{
          marginTop: 20,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {this.exibirNumeros}
        </View>

      </>
    )
  }
}