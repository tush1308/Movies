import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {View,Text} from 'react-native';

import Upcoming from './Upcoming';
import Trending from './Trending';
import Latest from './Latest';
const tTab = createMaterialTopTabNavigator();

export default function Movie(){
    return (
        <tTab.Navigator>
            <tTab.Screen name="Upcoming Movies" component={Upcoming}/>
            <tTab.Screen name="Trending Movies" component={Trending}/>
            <tTab.Screen name="Latest Movie" component={Latest}/>
        </tTab.Navigator>
    );
}