import styled from 'styled-components/native'

export const Container = styled.View`
flex: 1;
background-color: #121212;
align-items: center;
justify-content: center;
`

export const Titulo = styled.Text`
color: ${props => props.cor};
font-size: 25px;
`

export const Nome = styled.Text`
color: #fff;
font-size: 20px;
`

export const BotaoSujeito = styled.TouchableOpacity`
background-color: #ddd;
padding: 5px;
width: 90%;
justify-content: center;
align-items: center;
border-radius: 5px;
`

export const BotaoText = styled.Text`
color: #000;
font-size: 20px;
`
