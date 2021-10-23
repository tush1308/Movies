import * as React from 'react';
import { View, Button, Text, Animated, TextInput,StyleSheet,Image, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState,useContext } from 'react/cjs/react.development';
import PasswordInput from '../components/passwordInput';
import Input from '../components/input';
import Toast from 'react-native-toast-message';
import { AuthContext } from '../src/navigation/authProvider';
import MovieHome from './MovieHome';
import { SocialIcon } from 'react-native-elements/dist/social/SocialIcon';

export default function Login({ navigation }) {
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");

  const {login, googleLogin}= useContext(AuthContext);
  
  const logval=()=>{
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    if(username==""||password==""){
      if(username==""&&password==""){
        // Alert.alert("Both fields are empty")
        Toast.show({
          type:"error",
          text1:"Both fields are empty",
        })
      }
      else if(username==""){
        Alert.alert("Please enter your username")
      }
      else{
        Alert.alert("Please enter your password")
      }
    }
    else if(!re.test(username)){
      Alert.alert("Enter a valid username")
    }
    else{
      // navigation.navigate('MovieHome')
      login(username,password);
    }
  }
    return (
      <ScrollView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',
       backgroundColor:"pink",
       marginHorizontal:15,
       marginVertical:20,paddingVertical:10 }}>
        <View style={{padding:10}}>
        <Image source={require('./login.png')} style={{ width: 185, height: 185,}}
        />
        </View>
        <Input
          placeholder={"Username"}
          name={"username"}
          id={"username"}
          value={username}
          onChangeText={(text)=>setUsername(text)}
          keyboardType="email-address"
        />
        <Text>{"\t"}</Text>
        <PasswordInput
          placeholder={"Password"}
          name={"password"}
          id={"password"}
          value={password}
          // value={props.values.passwd}
          onChangeText={(text)=>{
            setPassword(text);
          }}
        />
        <Text>{'\t'}</Text>
        <Button color="black"
          title="Login"
          onPress={() => {
            logval();
            // login(username,password);
            // navigation.navigate('Profile')
          }}
        />
      </View>
      <View style={{width:"95%",alignSelf:'center'}}>
        <SocialIcon
          title="Sign In With Google"
          button
          type="google"
          style={styles.socialIcon}
          onPress={()=>{googleLogin()}}
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"pink",
            marginHorizontal:15, paddingVertical:10
            }}>
          <Text>Do not have an Account? Sign Up Now{"\n"}</Text>
          <Button color="black"
          title="Sign Up"
          onPress={() => navigation.navigate('SignUp')}
        />
        
      </View>
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    textinp:{
      height: 35,
      width: "80%",
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderColor: "rgba(0, 0, 0, 0.2)",
      borderWidth: 1,
      backgroundColor:"white"
    },
    socialIcon:{
      borderRadius:12,
      height:50,
    }
  })