import * as React from 'react';
import { useEffect, useState } from 'react';
// import {View,Text} from 'react-native';
import { ActivityIndicator, Text, View, StyleSheet} from 'react-native';


//popular movies
export default function Latest(){
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
  
    const getMovies = async () => {
       try {
        const response = await fetch("https://api.themoviedb.org/3/movie/latest?api_key=2b0cc5d54404507eaa14749547d2c68b&language=en-US");
        const json = await response.json();
        setData(json);
        console.log(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      getMovies();
    }, []);
      return (
      <>
      <View style={styles.mainView}>

        <View style={styles.mainPostView}>
          {isLoading ? <ActivityIndicator/> : (
            <>
            <View style={styles.postView}>
            
            <View style={styles.postTitle}>
            <Text style={{fontSize:20}}>{data.title}</Text>
            </View>
            <Text style={{fontWeight:'bold'}}>Overview</Text>
            <Text>{data.overview}</Text>
            <Text style={{fontWeight:'bold'}}>Release Date</Text>
            <Text>{data.release_date}</Text>
            </View>
            
            </>
          )}
        </View>

      </View>
      <Text></Text>
      </>
      );
}

const styles= StyleSheet.create({ 
  mainView:{
    flex:1,
    alignItems:'center'
  },
  mainPostView:{
    width:'92%',
  },
  postView:{
    width:'100%',
    marginTop:20,
    borderRadius:10,
    backgroundColor:'#DEB887',
    paddingBottom:10,
    paddingVertical:10,
    elevation:10,
    shadowColor:'blue',
  },
  postTitle:{
    // width:'100%',
    display:'flex',
    flexDirection:'row',
    alignSelf:'center',
    // backgroundColor:'chocolate',
  },
  image:{
    width: 140,
    height:175,
    borderRadius:20,
    resizeMode:'contain',
    // backgroundColor:'black'
  },
})