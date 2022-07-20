import React from 'react'
import { Provider } from 'react-redux';

import { StatusBar } from 'expo-status-bar';

import thunk from 'redux-thunk';
import reducers from './src/store/storeConfig';
import {compose, createStore, applyMiddleware} from 'redux'

import App from './src/App';

import axios from 'axios';
axios.defaults.baseURL = 'https://instagram-45961-default-rtdb.firebaseio.com/'


const store = createStore(reducers, compose(applyMiddleware(thunk)))


export default function App() {
  

  return (
    <Provider store={store}>
      <StatusBar hidden />
      <App />
    </Provider>
  )
}
