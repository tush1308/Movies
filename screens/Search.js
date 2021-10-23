import * as React from 'react';
import { useEffect, useState } from 'react';
// import {View,Text} from 'react-native';
import { ActivityIndicator, FlatList, Text, View, StyleSheet,TextInput,Image,TouchableOpacity,Button } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Card } from 'react-native-paper';

export default function MovieSearch({navigation}){
    const [searchInput,setSearchInput]= useState('');
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [genre,setGenre]= useState([]);
    const [isTruncated,setIsTruncated]= useState(true);
    const [searchNow, setSearchNow] = useState(false);
  
    const searchMovies = async (name) => {
       try {
        const response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=2b0cc5d54404507eaa14749547d2c68b&language=en-US&page=1&include_adult=false&query="+name);
        const json = await response.json();
        setData(json.results);
        const gen_resp= await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=2b0cc5d54404507eaa14749547d2c68b&language=en-US");
        const gen_json= await gen_resp.json();
        setGenre(gen_json.genres);
        // console.log(gen_json.genres);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    const Gen_search=(props)=>{
      let Found='';
      // console.log(props.id1);
      for (let i=0;i<genre.length;i++){
        if(genre[i].id==props.id1){
          Found=genre[i].name;
          console.log(Found);
          return(
            <Text>{genre[i].name}</Text>
          );
        }
      }
      return(null);
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
      searchMovies(searchInput);
      setLoading(false);
    }, [searchNow]);
      return (
      
      <View style={styles.mainView}>
          <View style={styles.textInputView}>
            <View style={styles.TextInput}>
        <TextInput value={searchInput}
        onChangeText={(val)=>setSearchInput(val)}
        placeholder={"Enter a movie name"} 
        placeholderTextColor={'#000'} 
        // style={styles.TextInput}
        />
        <TouchableOpacity onPress={()=>{
          setSearchInput("");
        }}>
          <MaterialIcons
            name="clear"
            size={20}
            color="black"/>
            </TouchableOpacity>
            </View>
        <TouchableOpacity
            onPress={() => {
              console.log('pressed');
              setSearchNow(!searchNow);
            }}>
              <EvilIcons
              name={searchInput ? 'search' : 'refresh'}
              size={20}
              color="black"
              style={{ alignSelf: 'center', marginHorizontal: 10 }}
            />
            </TouchableOpacity>
        
        </View>
        <Card style={styles.mainPostView}>
          {isLoading ? <ActivityIndicator/> : (
            
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
                  {/* <Text>{item.genre_ids[0]}</Text> */}
                  <Text> {item.vote_average}/10</Text>
                  <Info desc={item.overview} />
                  <Button title="More info" onPress={()=>{
                    navigation.navigate('MovieInfo', {movie:item});
                  }}/>
                  </View>
                  
              </View>
            }
            />
            
          )}
        </Card>
      </View>
      
      );
}

const styles= StyleSheet.create({
  mainView:{
    flex:1,
    alignItems:"center"
  },
  TextInput:{
    height:39,
    width:'80%',
    backgroundColor:'#EBEBEB',
    borderRadius:20,
    margin:15,
    paddingLeft:15,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  textInputView:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row'
  },
  mainPostView:{
    width:'92%',
    marginBottom:80,
  },
  postView:{
    width:'100%',
    alignItems:'center',
    marginTop:15,
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
    alignItems:'flex-start',
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