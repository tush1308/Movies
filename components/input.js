import React from "react";
import { View, Button, Text, Animated, TextInput,StyleSheet,Image } from 'react-native';

const Input=(props)=>{
    return(
        // <View style={styles.container}>
            <View style={{
                flex:1,
                flexDirection:"row",
                width:"80%",
                justifyContent:'space-between',
                alignItems:"center",
            }}>
                <TextInput style={styles.textinp}
                    placeholder={props.placeholder}
                    name={props.name}
                    id={props.id}
                    value={props.value}
                    onChangeText={props.onChangeText}
                    onFocus={props.onFocus}
                    secureTextEntry={false}
                    keyboardType={props.keyboardType}
                />
            </View>
        // </View>
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

export default Input;