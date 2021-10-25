import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Profile from './Profile';
import MovieSearch from './Search';
import Movie from './Movie'
import Favourite from './Favourite';
import LogOutScreen from './LogOut';
import MovieInfo from './MovieInfo';


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
  
const Tab = createBottomTabNavigator();

export default function MovieHome(){
    return (
        <>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
    
              if (route.name === 'Home') {
                iconName = focused
                  ? 'login'
                  : 'login';
              return (
              <AntDesign name={iconName} size={size} color={color} />
              );
              } else if (route.name === 'Profile') {
                iconName = focused ? 'profile' : 'profile';
                return (
                  <AntDesign name={iconName} size={size} color={color} />
                  );
              }
              else if (route.name === 'Movies') {
                iconName = focused ? 'movie' : 'movie-outline';
                return (
                  <MaterialCommunityIcons name={iconName} size={size} color={color} />
                  );
              }
              else if (route.name === 'Search') {
                iconName = focused ? 'movie-search' : 'movie-search-outline';
                return (
                  <MaterialCommunityIcons name={iconName} size={size} color={color} />
                  );
              }
              else if (route.name === 'Favourites') {
                iconName = focused ? 'movie-filter' : 'movie-filter-outline';
                return (
                  <MaterialCommunityIcons name={iconName} size={size} color={color} />
                  );
              }
              else if (route.name === "LogOut") {
                iconName = 'logout'
                return (
                  <MaterialCommunityIcons name={iconName} size={size} color={color} />
                  );
              }
    
              // You can return any component that you like here!
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          {/* <Tab.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Login Page' ,
              headerTintColor: 'white',
              headerStyle: { backgroundColor: 'black',},
            }}
          /> */}
          <Tab.Screen
            name="Movies"
            component={Movie}
            options={{
              headerTintColor: 'white',
              headerStyle: { backgroundColor: 'black',},
            }}
          />
          <Tab.Screen
            name="Search"
            component={MovieSearch} 
            options={{
              headerTintColor: 'white',
              headerStyle: { backgroundColor: 'black',},
            }} 
          />
          <Tab.Screen
            name="Favourites"
            component={Favourite}
            options={{
              headerTintColor: 'white',
              headerStyle: { backgroundColor: 'black',},
            }}  
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{ headerStyleInterpolator: forFade,
              title: "Profile Details",
              headerTintColor: 'white',
              headerStyle: { backgroundColor: 'black',},
             }}
          />
          <Tab.Screen
            name="LogOut"
            component={LogOutScreen}
            options={{ headerStyleInterpolator: forFade,
              headerTintColor: 'white',
              headerStyle: { backgroundColor: 'black',},
             }}
          />
          {/* <Tab.Screen
            name="MovieInfo" component={MovieInfo}
                    options={{
                      title:"",
                      // headerShown:false,   //will hide the header for that particular screen
                      
                    }}
            /> */}
        </Tab.Navigator>
             </>
    );
}

