import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';

const AppDrawer = createDrawerNavigator();

function AppRoutes(){
    return(
        <AppDrawer.Navigator
        drawerStyle={{
            backgroundColor:'#171717'
        }}
        drawerContentOptions={{
            labelStyle: {
                fontWeight: 'bold',
            },
            activeTintColor:'#fff',
            activeBackgroundColor: '#00b94a',
            inactiveBackgroundColor: '#000',
            inactiveTintColor:'#DDD'
        }}
        >
            <AppDrawer.Screen name="Home" component={Home} />
        </AppDrawer.Navigator>
    )
}

export default AppRoutes