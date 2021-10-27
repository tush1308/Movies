import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Animated } from 'react-native';
import Home from '../../screens/Home';
import SignUp from '../../screens/SignUp';

const forFade = ({ current, next }) => {
    const opacity = Animated.add(
      current.progress,
      next ? next.progress : 0
    ).interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0],
    });
  
    return {
      leftButtonStyle: { opacity },
      rightButtonStyle: { opacity },
      titleStyle: { opacity },
      backgroundStyle: { opacity },
    };
  };

const Auth = createStackNavigator();


export function AuthStack(){

  useEffect(()=>{
    GoogleSignin.configure({
      webClientId: '471645389466-vcd427g0iqlqncdi5420fa3aanlqpaqo.apps.googleusercontent.com',
    });
  },[])
    return(
        <Auth.Navigator>
        <Auth.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Login Page' ,
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'black',},
          }}
        />
        <Auth.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerStyleInterpolator: forFade,
            title: "Sign Up",
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'black',},
           }}
        />
      </Auth.Navigator>
    )
}