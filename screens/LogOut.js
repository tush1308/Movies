import React, { useContext } from "react";
import {View,Text,StyleSheet,Button, useColorScheme} from 'react-native';
import { AuthContext } from "../src/navigation/authProvider";
import AntDesign from "react-native-vector-icons";
//
const LogOutScreen=({navigation})=>{
    const {user,logout,googleSignOut}= useContext(AuthContext);
    console.log(user);

    return(
        <View>
            <Text>Welcome {user.uid}</Text>
            <Button color="black"
            title="Log Out"
            onPress={()=>
            {
                logout();
                console.log("User logged out")
            }
          }
          />
          <Text>For Google signOut</Text>
          <Button color="black"
            title="Log Out (Google)"
            onPress={()=>
            {
                googleSignOut();
                console.log("User logged out")
            }
          }
          />
        </View>
    )
}

export default LogOutScreen;