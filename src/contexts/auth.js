import React, {useState, createContext} from 'react'
import firebase from './../services/firebaseConnection';

export const AuthContext = createContext({})

function AuthProvider({ children }){

    const [user, setUser] = useState(null)
     
    //cadastrando usuario
    async function signUp(email, passoword, nome){
        console.log(email, passoword, nome)
        await firebase.auth().createUserWithEmailAndPassword(email, passoword)
        .then(async (value) => {
            let uid = value.user.uid
            await firebase.database().ref('users').child(uid).set({
                saldo: 0,
                nome: nome
            })
            .then(() => {
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email
                }
                setUser(data)
            })
        })
    }

    return(
        <AuthContext.Provider value={{ signed: !!user, user, signUp }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;