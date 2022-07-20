import React from 'react'
import { Provider } from 'react-redux';

import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

import Feed from './src/screens/Feed';
import AddPhoto from './src/screens/AddPhoto';
import Profile from './src/screens/Profile';
import Login from './src/screens/Login';
import Register from './src/screens/Register';

import thunk from 'redux-thunk';
import reducers from './src/store/storeConfig';
import {compose, createStore, applyMiddleware} from 'redux'

import axios from 'axios';
axios.defaults.baseURL = 'https://instagram-45961-default-rtdb.firebaseio.com/'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); 
const Stack2 = createStackNavigator();
const store = createStore(reducers, compose(applyMiddleware(thunk)))


export default function App() {
  
  function AuthRouter(){
    return(
      <Stack2.Navigator 
        initialRouteName="Login"
      >
        <Stack2.Screen name="Login" component={Login} />
        <Stack2.Screen name="Register" component={Register} />
      </Stack2.Navigator>
    )
  }
  function LoginOrProfile(){
    return (
        <Stack.Navigator screenOptions={({ route }) => ({
            headerShown: false,
        })} initialRouteName='Profile'>
          <Stack.Screen name="Profile" component={Profile}/>
          <Stack.Screen name="AuthRouter" component={AuthRouter}/>
        </Stack.Navigator>
    )
  }

  return (
    <Provider store={store}>
      <StatusBar hidden />
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {

            switch (route.name) {
              case 'Feed':
                return <Icon name="home" color={color} size={25} />;
              case 'AddPhoto':
                return <Icon name="camera" color={color} size={25} />;
              case 'Profile':
                return <Icon name="user" color={color} size={25} />;
              default:
                return <Icon name="home" color={color} size={25} />;
            }
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarShowLabel: false
        })}>
          <Tab.Screen name="Feed" component={Feed} />
          <Tab.Screen name="AddPhoto" component={AddPhoto} />
          <Tab.Screen name="LoginOrProfile" component={LoginOrProfile} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
