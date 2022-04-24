import react, {useContext} from "react";
import { View, Text, StyleSheet, Button} from 'react-native'

import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";

import { Background, Container, Nome, Saldo, Title } from './styles'

export default function Home(){

  const { user } = useContext(AuthContext)
  return(
    <Background>
      <Header/>
      <Container>
        <Nome>Gabriel</Nome>
        <Saldo> R$ 123,00</Saldo>
      </Container>

      <Title>Ultimas movimentações</Title>
    </Background>
  )
}
