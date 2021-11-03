import React,{useContext,useEffect} from "react";
import { createStackNavigator } from '@react-navigation/stack';

import MovieHome from "../../screens/MovieHome";
import MovieInfo from "../../screens/MovieInfo";
import Test from "../../screens/test";
// import { AuthContext } from "./authProvider";
// import firestore from '@react-native-firebase/firestore';

const Stack= createStackNavigator();

export default function AppStack(){

  // const {user}= useContext(AuthContext);

  // const submit= async()=>{
  //   firestore()
  //   .collection('Users')
  //   .doc(user.email)
  //   .set({
  //     userId:user.uid,
  //     time:firestore.Timestamp.fromDate(new Date()),
  //   })
  //   .then(()=>{
  //     console.log('User data added successfully');
  //   })
  //   .catch((error)=>{
  //     console.log("Error occurred",error);
  //   });
  // }
  
  //   useEffect(()=>{
  //     submit();
  //     }, []);
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