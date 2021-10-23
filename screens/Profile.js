import React,{useState,useContext} from "react";
import { View,ScrollView,Button, Text,TouchableHighlight,ToastAndroid, TextInput,StyleSheet,Image, Alert } from 'react-native';
import { Avatar} from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchImageLibrary} from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { AuthContext } from "../src/navigation/authProvider";


const Calender=()=>{
  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('DD/MM/YYYY');
  


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if (Platform.OS === 'android') {
      setShow(false);
    }
    setDate(currentDate);

    let tempDate= new Date(currentDate);
    let fDate=tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    setText(fDate)
    console.log(fDate)
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View>
      {/* <Text>{date.toLocaleString("en-Us",{timeZone:'Asia/Kolkata'})}</Text> */}
      <View>
        <Button onPress={showDatepicker} title="Select your BirthDate!" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <Text style={{
         fontSize:16,
         margin:10,
         backgroundColor:'pink',
         minWidth:250
         }}>Your BirthDay <Fontisto name="date" size={16}/> : {text}</Text>
    </View>
  );
};

const Photo=()=>{
  const [Pic, SetPic] = React.useState('');
  //For Show Toast Messages
  const setToastMessage = message => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    };
  
    const uploadImage = () => {
      let options = {
        mediaType: 'photo',
        quality: 1,
        includeBase64: true,
      };
  
      launchImageLibrary(options, response => {
        if (response.didCancel) {
          setToastMessage('Cancelled image selection');

        } else if (response.errorCode == 'permission') {
          setToastMessage('Permission not satisfied');
        } else if (response.errorCode == 'others') {
          setToastMessage(response.errorMessage);
        // } else if (response.assets[0].fileSize > 2097152) {
        //   Alert.alert(
        //     'Maximum image size exceeded',
        //     'Please choose a file under 2 MB',
        //     [{text: 'OK'}],
        //   );
        } else {
          SetPic(response.assets[0].base64);
        }
      });  
    };

  const removeImage = () => {
   SetPic('');
    setToastMessage('Image removed');
  };

  return (
    <View style={{paddingVertical:3}}>
      <View style={{
        alignItems:"center"
      }}>
        <TouchableHighlight
          onPress={() => uploadImage()}
          underlayColor="rgba(0,0,0,0)">
          <Avatar.Image
            size={200}
            source={{uri: 'data:image/png;base64,' + Pic}}
          />
        </TouchableHighlight>
      </View>
      <View
        style={{flexDirection: 'row',paddingVertical:12}}>
        <Button mode="contained" onPress={() => uploadImage()}
        title="Upload Image">
        </Button>
        <AntDesign name="picture" size={34}/>
        <Button
          mode="contained"
          onPress={() => removeImage()}
          style={{marginLeft: 20}}
          title="Remove Image">
        </Button>
      </View>
    </View>
  );
};

export default function Profile({ navigation }) {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [num,setNum]=useState("");
  const {user}= useContext(AuthContext);

  const validate=()=>{
    const reg=/^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    const regName=/^[a-zA-Z]{2,40} [a-zA-Z]{2,40} [a-zA-Z]{2,40}$/;
    if(email==""||num==""||name==""){
      Alert.alert("Please fill all Details")
    }
    else if(!regName.test(name)){
      Alert.alert("Name format is invalid")
    }
    else if(!reg.test(num)){
      Alert.alert("Number format is invalid")
    }
    else if(!re.test(email)){
      Alert.alert("Email format is invalid")
    }
    else{
      Alert.alert("Successfully Submitted")
      navigation.goBack();
    }
  }
    return (
      <ScrollView style={{paddingVertical:10}}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Photo/>
        <TextInput
          style={styles.textinp}
          placeholder='Enter your full name'
          onChangeText={(text)=>setName(text)}
        />
        <Text>{'\t'}</Text>
        <TextInput
          style={styles.textinp}
          placeholder='Enter your e-mail'
          defaultValue={user.email}
          onChangeText={(text)=>setEmail(text)}
        />
        <Text>{"\t"}</Text>
        <TextInput
          style={styles.textinp}
          placeholder='Enter your Phone no.'
          keyboardType="number-pad"
          onChangeText={(text)=>setNum(text)}
        />
        <View style={{
          flexDirection:'row',
          margin:10,
          alignItems:'center'
        }}>
        <Calender/>
        </View>
        <Button color="black"
         title="Submit"
         onPress={() => {
           validate();
          //  navigation.goBack();
          }
         } />
         <Text>{"\t"}</Text>
         <Button color="black"
          title="Exit"
          onPress={()=>
            navigation.goBack()
            // register(email,)
          }
          />
      </View>
    </ScrollView>
    );
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
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      padding: 50,
    },
  })