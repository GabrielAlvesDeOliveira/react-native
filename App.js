import React, {Components} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider'
export default class App extends Components{
  
  constructor(props){
    super(props)
    this.state = {
      valor: 0
    }
  }

  render(){
    return (
      <View style={styles.container}>

        <Slider
          minimumValue={0}
          maximumValue={100}
          onValueChange={(valorSelecionado)=> this.setState({valor: valorSelecionado})}
          value={this.state.valor}
          minimumTrackTintColor="#00FF00"
          maximumTrackTintColor="#FF0000"
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  }
});
