import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

import Feed from './screens/Feed';
import AddPhoto from './screens/AddPhoto';
import Profile from './screens/Profile';
import Login from './screens/Login';
import Register from './screens/Register';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); 
const Stack2 = createStackNavigator();

class Navigator extends Component {
    render() {

        AuthRouter = () => {
            return(
                <Stack2.Navigator 
                  initialRouteName="Login"
                >
                  <Stack2.Screen name="Login" component={Login} />
                  <Stack2.Screen name="Register" component={Register} />
                </Stack2.Navigator>
              )
        }

        LoginOrProfile = () => {
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
        );
    }
}
export default Navigator;
