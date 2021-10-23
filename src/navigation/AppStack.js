import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import MovieHome from "../../screens/MovieHome";
import MovieInfo from "../../screens/MovieInfo";

const Stack= createStackNavigator();

export default function AppStack(){
    return(
        <MovieHome/>
    )
}