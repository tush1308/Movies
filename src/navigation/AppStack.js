import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import MovieHome from "../../screens/MovieHome";
import MovieInfo from "../../screens/MovieInfo";
import Test from "../../screens/test";

const Stack= createStackNavigator();

export default function AppStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="MovieHome" component={MovieHome} 
            options={{
                headerShown:false,   //will hide the header for that particular screen
                
              }}
            />
            <Stack.Screen name ="MovieInfo" component={MovieInfo}
            options={{
                title:"",
              }}
            />
        </Stack.Navigator>
    )
}