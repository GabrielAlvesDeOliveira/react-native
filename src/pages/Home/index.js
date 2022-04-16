import react, {useContext} from "react";
import { View, Text, StyleSheet, Button} from 'react-native'

import { AuthContext } from "../../contexts/auth";

export default function Home(){

  const { user, signOut } = useContext(AuthContext)
  return(
    <View>
      <Text> Home </Text>
      <Text>{ user && user.nome}</Text>
      <Button title="Sair da conta" onPress={()=> signOut()}/>
    </View>
  )
}
