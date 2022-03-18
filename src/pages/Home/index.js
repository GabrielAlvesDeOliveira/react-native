import react from "react";
import { View, Text, StyleSheet, Button} from 'react-native'

import { useNavigation } from '@react-navigation/native'

export default function Home(){

  const navigation = useNavigation()

  function navegaSobre(){
    navigation.navigate('Sobre', { nome: 'Gabriel', email: 'alvesg2003@gmail.com'} )
  }

  return(
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title="Ir para sobre" onPress={ navegaSobre }/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})