import React, { Components } from 'react'
import { StyleSheet, Text, View, Platform, Button, Modal} from 'react-native';
import Entrar from './src/Entrar'
export default class App extends Components {

  constructor(props) {
    super(props)
    this.state = { 
      modalVisible: false
    }

    this.entrar = this.entrar.bind(this)
  }

  entrar(){
    this.setState({modalVisible: true})
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title='Entrar' onPress={ this.entrar }/>
      
        <Modal animationType='slide' visible={this.state.modalVisible}>
          <View style={{margin: 15, flex: 1,alignItems: 'center'}}>
            <Entrar fechar={ () => this.setState({modalVisible: false})} />
          </View>
        </Modal>

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
