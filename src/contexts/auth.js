import React, {useState, createContext, useEffect} from 'react'
import firebase from './../services/firebaseConnection';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
export const AuthContext = createContext({})

function AuthProvider({ children }){

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true) 

    useEffect(() => {
        async function loadStorage(){
            const storagedUser = await AsyncStorageLib.getItem('Auth_user')
            if(storagedUser){
                setUser(JSON.parse(storagedUser))
            }

            setLoading(false)
        }

        loadStorage()

    },[])

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
                storageUser(data)
            })
        })
    }

    async function storageUser(data){
        await AsyncStorageLib.setItem('Auth_user', JSON.stringify(data))
    }

    async function signIn(email, password){
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
            
            let uid = value.user.uid
            await firebase.database().ref('users').child(uid).once('value')
            .then((snapshot) => {
                let data = {
                    uid: uid,
                    nome: snapshot.val().nome,
                    email: value.user.email
                }
                setUser(data)
                storageUser(data)
            })
        }).catch(error => {
            alert(error.code)
        })
    }

    async function signOut(){
        await firebase.auth().signOut()

        await AsyncStorageLib.clear().then(() => {
            setUser(null)
        }).catch(error => {
            alert(error)
        }
        )
            
    }


    return(
        <AuthContext.Provider value={{ signed: !!user, user, loading, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;