import { USER_LOGGED_IN, USER_LOGGED_OUT, LOADING_USER, USER_LOADED } from "./actionTypes";
import axios from 'axios'

const authBaseURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
const API_KEY = 'AIzaSyCB4S9-z2Tz6tg-JsawpVwroZLf6SiZuMo'

export const userLogged = user => {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export const logout = () => {
    return {
        type: USER_LOGGED_OUT
    }
}

export const createUser = (user) => {
    return dispatch => {
        axios.post(authBaseURL + API_KEY, {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        }).catch(err => console.log(err))
            .then(res => {
                console.warn('teste: ', res)
                if (res.data.localId) {
                    axios.put(`/users/${res.data.localId}.json`, {
                        name: user.name,
                    })
                        .catch(err => console.log(err))
                        .then(res => {
                            console.log('user created')
                        })
                }
            })
    }
}

export const loadingUser = () => {
    return {
        type: LOADING_USER
    }
}

export const userLoaded = () => {
    return {
        type: USER_LOADED
    }
}

export const login = user => {
    return dispatch => {
        dispatch(loadingUser())
        axios.post(authBaseURL + API_KEY, {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        }).catch(err => console.log(err))
            .then(res => {
                if (res.data.localId) {
                    axios.get(`/users/${res.data.localId}.json`)
                        .catch(err => console.log(err))
                        .then(res => {
                            user.password = null
                            user.name = res.data.name
                            dispatch(userLogged(user))
                            dispatch(userLoaded())
                        })
                }
            })
    }
}