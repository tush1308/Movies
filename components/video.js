import React, { useState,useEffect } from "react";
import { View, Button, Text, Animated, TextInput,StyleSheet,Image,ActivityIndicator} from 'react-native';
import { WebView } from 'react-native-webview';



const Video=(props)=>{
    const [trail,setTrail]=useState("");
    const [loading,setLoading]=useState(true);
    
    const getTrailer= async (id)=>{
        try{
            const response= await fetch("https://api.themoviedb.org/3/movie/"+id+"/videos?api_key=2b0cc5d54404507eaa14749547d2c68b&language=en-US");
            const json = await response.json();
            const trail= json.results[0].key;
            setTrail(trail);
            // console.log(trail);
        }catch (error) {
            console.error(error);
        }
        finally{
            setLoading(false);
        }
        
    }

    useEffect(()=>{
        getTrailer(props.id);
        setLoading(false);
        }, []);

    return(
        loading?(<ActivityIndicator/>):
        <>
            <View style={{
                flex:1,
                flexDirection:"row",
                width:"80%",
                justifyContent:'space-between',
                alignItems:"center",
                marginTop:8,
                marginLeft:10,
            }}>
                <Text style={{fontWeight:'bold'}}>Trailer:</Text>
                
            </View>
            <WebView
            source={{ uri: 'https://www.youtube.com/embed/'+trail}}
            style={{ height:300,margin:10}}
            onError={(event)=> alert('Webview error'+event.nativeEvent.description)}
      />
          </>  
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginBottom: 12.0,
    },
  })

export default Video;