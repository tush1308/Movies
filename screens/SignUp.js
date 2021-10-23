import React,{useState,useContext} from "react";
import {View,Text,TextInput,StyleSheet,Button} from 'react-native';
import { AuthContext } from "../src/navigation/authProvider";

export default function SignUp({navigation}){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const {register} = useContext(AuthContext);

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{'\t'}</Text>
        <TextInput
          style={styles.textinp}
          placeholder='E-mail'
          onChangeText={(text)=>setEmail(text)}
        />
        <Text>{"\t"}</Text>
        <TextInput
          style={styles.textinp}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(text)=>setPassword(text)}
        />
        <Text>{"\t"}</Text>
        <TextInput
          style={styles.textinp}
          placeholder='Confirm Password'
          secureTextEntry={true}
          onChangeText={(text)=>setConfirmPassword(text)}
        />
        <Text>{"\t"}</Text>
        <Button color="black"
         title="Submit"
         onPress={() => {
        //    validate();
        //    navigation.goBack();
        register(email,password)
          }
         } />
         <Text>{"\t"}</Text>
         <Button color="black"
          title="Exit"
          onPress={()=>
            navigation.goBack()
          }
          />
      </View>
    )
}

const styles = StyleSheet.create({
    textinp:{
      fontSize:15,
      height: 35,
      width: "80%",
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderColor: "rgba(0, 0, 0, 0.2)",
      borderWidth: 1,
      backgroundColor:"white"
    },
  })