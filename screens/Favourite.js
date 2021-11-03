import React, { useEffect, useState,useContext } from 'react';
import {View,Text,FlatList,StyleSheet,Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator } from 'react-native-paper';
import { AuthContext } from '../src/navigation/authProvider';

export default function Favourite(){

  const {user}= useContext(AuthContext);
  const [loading,setLoading]= useState(true);
  const [data,setData]= useState([]);
  const [info, setInfo] = useState([]);

  const FindMovie= (props)=>{

    return(<Text>{props.favid}</Text>)
  }

  const fetchLists= async ()=>{
    try{
      const list=[];
      await firestore()
      .collection('Favourites')
      .where('userId','==',user.uid)
      .get()
      .then((querySnapshot)=>{
        console.log('Total entries:',querySnapshot.size);

        querySnapshot.forEach((doc)=>{
          const{
            userId,
            favourite,
            title,
            img,
            date,
          }=doc.data();
          list.push({
            key: doc.id,
            userId,
            favourite,
            title,
            img,
            date,
          });
        });
      });
      setInfo(list);
      // if (loading) {
      //   setLoading(false);
      // }
      console.log(info)
    }
    catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    fetchLists();
    setLoading(false);
  }, []);

  return(
    
    <View style={styles.mainView}>
      <View style={styles.mainPostView}>
    {
      loading?<ActivityIndicator/>:
      <FlatList
      data={info}
      renderItem={({ item }) => (
        <View style={styles.postView}>
          <Image
              source={{
                uri: ("http://image.tmdb.org/t/p/w500"+item.img),
              }}
              style={styles.poster}
            />
          <View>
          <View style={styles.postTitle}>
          <Text style={{fontSize:20, width:181}}>{item.title}</Text>
          </View>
          <Text style={{fontSize:16,paddingLeft:5}}>Release date:</Text>
          <Text style={{fontSize:14,paddingLeft:5}}>{item.date}</Text>
          </View>
        </View>
      )}
    />
    }
    </View>
    </View>

  )
};

const styles=StyleSheet.create({
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
    display:'flex',
    flexDirection:'row',
    marginBottom:30,
  },
  image:{
    width: 140,
    height:175,
    borderRadius:20,
    resizeMode:'contain',
  },
  poster: {
    width:140,
    height:180
  },
})