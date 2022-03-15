import React, {Components} from 'react'
import { StyleSheet, Text, View } from 'react-native';
export default class App extends Components{
  
  constructor(props){
    super(props)
    this.state = {  }
  }

  render(){
    return (
      <View style={styles.container}>

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
