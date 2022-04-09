import React from "react";
import { Container, Titulo, Nome, BotaoSujeito, BotaoText} from './src/styles' 
export default function App() {

  return (
    <Container>
      <Titulo cor='#ff0000'> Sujeito Programador </Titulo>
      <Nome>Ola Gabriel</Nome>

      <BotaoSujeito onPress={ () => alert('CLICOU' )}>
        <BotaoText>Entrar</BotaoText>
      </BotaoSujeito>

    </Container>
  )
}
