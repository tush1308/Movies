import React , {useContext,useState,useEffect}from "react";
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { AuthStack } from "./authStack";
import { AuthContext } from "./authProvider";
import MovieHome from "../../screens/MovieHome";
import AppStack from "./AppStack";

export default function RootNavigator(){
    const {user, setUser} = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);
  
    const onAuthStateChanged = (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    };
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  
    if (initializing) return null;
  
    return(
        <NavigationContainer>
           {user? <AppStack/>: <AuthStack/>}
        </NavigationContainer>
    )
}