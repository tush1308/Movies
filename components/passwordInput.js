import React,{useState} from "react";
import { View, Text,TextInput,StyleSheet, TouchableOpacity,} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PasswordInput=(props)=>{
    const[visible,setVisible]=useState(true);
    return(
            <View style={{
                flex:1,
                flexDirection:"row",
                width:"80%",
                justifyContent:'space-between',
                alignItems:"center"
            }}>
                <TextInput  style={styles.textinp}
                    placeholder={props.placeholder}
                    name={props.name}
                    id={props.id}
                    value={props.value}
                    onChangeText={props.onChangeText}
                    onFocus={props.onFocus}
                    secureTextEntry={visible}
                    keyboardType={props.keyboardType}
                />
                <TouchableOpacity activeOpacity={0.5} onPress={()=>{
                    setVisible(!visible);
                }}>
                    <MaterialIcons name={visible ? "visibility" : "visibility-off"} size={28}/>
                </TouchableOpacity>
            </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginBottom: 12.0,
    },
    textinp:{
        height: 35,
        width: "100%",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        backgroundColor:"white"
      },
  })

export default PasswordInput;