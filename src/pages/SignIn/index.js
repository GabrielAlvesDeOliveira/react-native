import React, { useState, useContext } from 'react'
import { Platform, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../contexts/auth'

import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, LinkText, Link } from './styles'

export default function SigIn() {

    const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signIn, loadingAuth } = useContext(AuthContext)

    function handleSigIn() {
        signIn(email, password)
    }

    return (
        <Background>
            <Container
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                enabled
            >

                <Logo source={require('../../assets/Logo.png')} />

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
                        secureTextEntry={true}
                    />
                </AreaInput>
                <SubmitButton onPress={handleSigIn}>
                    {loadingAuth ? (<ActivityIndicator size={20} color="#FFf" />) : (
                        <SubmitText>Acessar </SubmitText>
                    )}
                </SubmitButton>

                <Link onPress={() => navigation.navigate('SignUp')}>
                    <LinkText>Criar uma conta</LinkText>
                </Link>

            </Container>
        </Background>
    )
}