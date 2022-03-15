import React, {Components} from 'react'
import { StyleSheet, Text, View, Switch } from 'react-native';
export default class App extends Components{
  
  constructor(props){
    super(props)
    this.state = { status: false}
  }

  render(){
    return (
      <View style={styles.container}>

        <Switch
          value={this.state.status}
          onValueChange={(valorSwitch)=> this.setState({status: valorSwitch})}
          thumbColor="#FF0000"
          />
          <Text>
            {(this.state.status) ? "Ativo" : "Inativo"}
          </Text>
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
