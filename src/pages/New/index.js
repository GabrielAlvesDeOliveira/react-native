import React, {useState} from 'react';
import { SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert} from 'react-native';

import Header from '../../components/Header';
import { Background, Input, SubmitButton, SubmitText } from './styles';
import Picker from '../../components/Picker';

export default function New() {

    const [valor, setValor] = useState('')
    const [tipo, setTipo] = useState('receita')

    function handleSubmit(){
        Keyboard.dismiss()
        if(isNaN(parseFloat(valor)) || tipo === null){
            alert('Preencha todos os campos')
            return
        }

        Alert.alert(
            'Confirmando dados',
            `Tipo ${tipo} - Valor ${parseFloat(valor)}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => handleAdd()
                }
            ]
        )

    }

    function handleAdd(){
        alert("Adicionou")
    }

    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>      
        <Background>
            <Header />

            <SafeAreaView style={{alignItems: 'center'}}>
                <Input
                    placeholder="Valor desejado"
                    keyboardType="numeric"
                    returnKeyType="next"
                    onSubmitEditing={() => Keyboard.dismiss()}
                    value={valor}
                    onChangeText={(text) => setValor(text)}
                />

                <Picker onChange={setTipo} tipo={tipo}/>

                <SubmitButton onPress={handleSubmit}>
                    <SubmitText>Registrar</SubmitText>
                </SubmitButton>
            </SafeAreaView>
        </Background>
        </TouchableWithoutFeedback>
    )
}