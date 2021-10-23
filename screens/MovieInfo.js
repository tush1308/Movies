import React, {useEffect,useState} from 'react';
import {Text,View,Image,StyleSheet,ActivityIndicator,FlatList,ScrollView} from 'react-native';
import Video from '../components/video';


export default function MovieInfo({navigation,route}){
    const [credits, setCredits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [director, setDirector] = useState('');
    const { movie } = route.params;
    // console.log(movie);

    const getCredits = async (id) => {
        try {
         const response = await fetch("https://api.themoviedb.org/3/movie/"+id+"/credits?api_key=2b0cc5d54404507eaa14749547d2c68b");
         const json = await response.json();
        //  console.log(id);
        //  console.log(json);
         const director= json.crew.find(
             (dir)=> dir.job === 'Director'
         );
         const credits = json;
         setCredits(credits);
         setDirector(director.name);
        //  console.log(director);
       } catch (error) {
         console.error(error);
       } finally {
         setLoading(false)
       }
     };

     const InfoCard = ({ movie, director }) => {
      //  console.log("Hi")
        return (
          <>
          <View style={styles.infoCard}>
            <Image
              source={{
                uri: ("http://image.tmdb.org/t/p/w500"+movie.poster_path),
              }}
              style={styles.poster}
            />
            <View style={{marginLeft:10,width:'50%'}}>
              <Text style={{fontWeight:'bold',fontSize:22}}>{movie.original_title}</Text>
              <Text style={{fontWeight:'bold'}}>Plot:</Text>
              <Text>
                {movie.overview}
              </Text>
              
            </View>
          </View>
          <View style={styles.moreinfo}> 
          <Text style={{ fontWeight: 'bold',fontSize:16}}>Director: {director}</Text>
          <Text style={{fontWeight:'bold',fontSize:14}}>Popularity: {movie.popularity}</Text>
          <Text style={{fontWeight:'bold'}}>Release Date: {movie.release_date}</Text>
          </View> 
        </>
        );
      }; 

      const ProfileThumb = ({ item }) => {
        return (
          <View style={styles.profileThumb}>
            
             <Image
          source={{
            uri: ("http://image.tmdb.org/t/p/w342"+item.profile_path),
          }}
          style={styles.crewImages}
            />
            <View>
              <Text style={styles.title}>{item.name}{'\n'}({item.character})</Text>
            </View>
          </View>
        );
      };
      

    useEffect(()=>{
        getCredits(movie.id);
        // console.log("Helooooooo")
        // console.log(movie.id);
        setLoading(false);
        }, []);

    return(
        loading?(<ActivityIndicator/>):
        <ScrollView>
        <View style={{marginHorizontal:10}}>
          <View>
        {/* <Text onPress={()=>{navigation.goBack()}}>{'\n'}{movie.id} and {director}</Text> */}
        <InfoCard movie={movie} director={director} />
        </View>
        <View>
        <>
          <Text style={{fontWeight:'bold'}}>Cast:</Text>
          {credits && (
            <FlatList
              data={credits.cast}
              renderItem={({ item }) => 
              <ProfileThumb item={item}/>
            }
              horizontal
            />
          )}
        </>
        
      </View>
        </View>
        <Video id={movie.id}/>
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    infoCard: {
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
      borderWidth:0.5,
    },
    moreinfo:{
      width:'100%',
      alignItems:'flex-start',
      marginVertical:15,
      borderRadius:10,
      backgroundColor:'#DEB887',
      paddingVertical:10,
      paddingLeft:15,
      elevation:10,
      shadowColor:'blue',
      borderWidth:0.5,
    },
    poster: {
      width:140,
      height:180
    },
    title: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    textInfo: {
      left: 10,
      right: 10,
      flex: 1,
      justifyContent: 'space-evenly',
    },
    //ProfileThumb
    crewImages: {
        // width: 180,
        height: 180,
        borderColor: 'black',
        resizeMode:'contain',
        borderRadius:10,
      },
    
      profileThumb: {
        height: '100%',
        flexDirection: 'column',
        width: 200,
        backgroundColor: '#DEB887',
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
        paddingVertical:8,
      },
    
      title: {
        // color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft:10,
        alignSelf:'center',
        justifyContent:'center',
      },
  });