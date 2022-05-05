import React, { useState, useContext, useEffect } from 'react'
import { Platform } from 'react-native'
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, LinkText, Link } from '../SignIn/styles'
import {AuthContext} from '../../contexts/auth'

export default function SigIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nome, setNome] = useState('')
    const { signUp, loadingAuth} = useContext(AuthContext)
    
    function handleSignUp(){
        signUp(email, password, nome)
    }
    
    return (
        <Background>
            <Container
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                enabled
            >

                <AreaInput>
                    <Input
                        placeholder="Nome"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                    />
                </AreaInput>
                <AreaInput>
                    <Input
                        placeholder="Email"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </AreaInput>
                <AreaInput>
                    <Input
                        placeholder="Password"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                </AreaInput>

                <SubmitButton onPress={handleSignUp}>
                {loadingAuth ? (<ActivityIndicator size={20} color="#FFf" />) : (
                        <SubmitText>Acessar </SubmitText>
                    )}
                </SubmitButton>

            </Container>
        </Background>
    )
}