import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Filmes from './src/Filmes';
import api from './src/services/api'
export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      filmes: []
    }
  }

  async componentDidMount(){
    const response = await api.get('r-api/?api=filmes')
    this.setState({
      filmes: response.data
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Gabriel </Text>
        <FlatList 
        data={this.state.filmes}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={ (item) => <Filmes data={item}/> }
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  }
});
