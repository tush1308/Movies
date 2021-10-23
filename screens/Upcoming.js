import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet,TextInput,Image,Button,Alert } from 'react-native';
//trending movies
export default function Upcoming({navigation}){
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [genre,setGenre]= useState([]);
    const [isTruncated,setIsTruncated]= useState(true);
  
    const getMovies = async () => {
       try {
        const response = await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=2b0cc5d54404507eaa14749547d2c68b&language=en-US&page=1");
        const json = await response.json();
        setData(json.results);
        const gen_resp= await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=2b0cc5d54404507eaa14749547d2c68b&language=en-US");
        const gen_json= await gen_resp.json();
        setGenre(gen_json.genres);
        // console.log(gen_json.genres);
        // console.log(genre.length);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    const Gen_search=(props)=>{
      let Found='';
      for (let i=0;i<genre.length;i++){
        if(genre[i].id==props.id1){
          Found=genre[i].name;
          // console.log(Found);
          return(
            <Text>{genre[i].name}</Text>
          );
        }
      }
    }

    const Info=(props)=>{
    
      const text=isTruncated?(props.desc).slice(0,15):(props.desc);
      const ReadMore="..Read More";
      const ReadLess="..Read Less";
      return(
        
        <Text style={{width:165,paddingVertical:7}}>{text}
        <Text style={{color:'brown'}} onPress={()=>ToggleIsTruncated()}>
          {isTruncated?ReadMore:ReadLess}
          </Text>
        </Text>
        
      );
    }

    function ToggleIsTruncated(){
      setIsTruncated(!isTruncated);
    }

    const Base_url="https://image.tmdb.org/t/p/w500";
  
    useEffect(() => {
      getMovies();
    }, []);
      return (
      <>
      <View style={styles.mainView}>
        <View style={styles.mainPostView}>
          {isLoading ? <ActivityIndicator/> : (
            <>
            <FlatList
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({item,index})=>
              <View style={styles.postView}>
                <Image style={styles.image} source={{uri:(Base_url+item.poster_path)}}/>
                  <View>
                  <View style={styles.postTitle}>
                  
                  <Text style={{fontSize:20, width:181}}>{item.title}
                  </Text>
                  </View>
                  <Gen_search id1={item.genre_ids[0]}/>
                  <Text> {item.vote_average}/10</Text>
                  <Info desc={item.overview} />
                  
                  <Button title="More info" onPress={()=>{
                    // navigation.navigate('MovieInfo', {movie:item});
                    navigation.navigate("MovieInfo",{movie:item});
                  }}/>
                  </View>
                  
              </View>
            }
            />
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
    alignItems:'flex-start',
    marginTop:20,
    borderRadius:10,
    backgroundColor:'#DEB887',
    paddingBottom:10,
    paddingVertical:10,
    flexDirection:'row',
    elevation:10,
    shadowColor:'blue',
  },
  postTitle:{
    // width:'100%',
    display:'flex',
    flexDirection:'row',
    // alignItems:'center',
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